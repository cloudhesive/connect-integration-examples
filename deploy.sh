#!/bin/bash

# Function to display correct script usage
usage() {
    echo "Usage: $0 --aws-profile <aws_profile> --stage <stage> --region <region>"
}

# Parse command-line arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --aws-profile) aws_profile="$2"; shift ;;
        --stage) stage="$2"; shift ;;
        --region) region="$2"; shift ;;
        *) echo "Unknown option: $1"; usage; exit 1 ;;
    esac
    shift
done

# Check if all required arguments are provided
if [ -z "$aws_profile" ] || [ -z "$stage" ] || [ -z "$region" ]; then
    echo "All arguments are required."
    usage
    exit 1
fi

# Define menu options
options=("CallAPIFunction" "SendWhatsappMessageFunction")
selected=("" "")
runtime=nodejs20.x
service=connect-integration-$aws_profile
has_selected_option=false

# Function to print colorful menu
print_menu() {
    clear
    echo "-------------------------------------------------"
    echo -e "\e[1m                  Lambda Operations Menu\e[0m"
    echo "-------------------------------------------------"
    for ((i=0; i<${#options[@]}; i++)); do
        if [[ "${selected[i]}" == "X" ]]; then
            echo -e "\e[1;32m   $((i+1)) - [X] ${options[i]}\e[0m"
            has_selected_option=true
        else
            echo -e "   $((i+1)) - [ ] ${options[i]}"
            has_selected_option=false
        fi
    done
    echo "-------------------------------------------------"
}

# Loop for selecting options
while true; do
    print_menu

    read -p "Select an option (1-${#options[@]}) to toggle. Type 'next' to continue the execution: " choice

    if [[ "$choice" == "next" ]]; then
        if [ "$has_selected_option" = false ]; then
            echo -e "\e[31m\e[1m\xE2\x9C\x98\e[0m You must select at least one option before proceeding."
            sleep 1
        else
            break
        fi
    elif (( choice >= 1 && choice <= ${#options[@]} )); then
        index=$((choice-1))
        if [[ "${selected[index]}" == "X" ]]; then
            selected[index]=""
        else
            selected[index]="X"
        fi
    else
        echo -e "\e[31m\e[1m\xE2\x9C\x98\e[0m Invalid option. Please select a number from 1 to ${#options[@]}"
        sleep 1
    fi
done

# Create Serverless configuration file
config_file="serverless.yml"

echo "service: $service" > "$config_file"
echo "provider:" >> "$config_file"
echo "  name: aws" >> "$config_file"
echo "  runtime: $runtime" >> "$config_file"
echo "  stage: $stage" >> "$config_file"
echo "  region: $region" >> "$config_file"
echo "functions:" >> "$config_file"

for ((i=0; i<${#options[@]}; i++)); do
    if [[ "${selected[i]}" == "X" ]]; then
        echo " - \${file(src/functions/connect/${options[i]}/function.yml)}" >> "$config_file"
    fi
done

# Deploy with Serverless
echo "Deploying with Serverless..."
serverless deploy --aws-profile "$aws_profile" --stage "$stage"

echo -e "\e[32m\e[1m\xE2\x9C\x93\e[0m Deployment completed \e[32m\e[1m\xE2\x9C\x94\e[0m"

