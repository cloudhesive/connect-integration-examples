## Sending Messages from AWS Connect to Whatsapp

#### This project presents a function designed to simplify the sending of WhatsApp messages through AWS Connect. The function accepts multiple input parameters to configure and send messages efficiently, and it is developed as generically as possible, allowing its use in various project contexts.

### Utilization of Input Parameters

The function requires the following **required parameters**:

- `toPhoneNumber`: The number to which the initial WhatsApp message will be sent.
- `template`: The name of the META template to be used for formatting the message.
- `channel`: The channel where the request is being made. Default is "Connect".
- `message`: The content of the message to be displayed on WhatsApp.
- `language`: The language of the template. Default is "es" (Spanish).
- `authorizationType`: Authorization method of the API to consume. The available authorization types are:
    - `Bearer`: Access token type used in the OAuth 2.0 protocol to authenticate HTTP requests.

### Error Messages

The function can return the following error messages:

- `BODY_PARSE_ERROR`: Occurs when there is a failure in attempting to format the event arriving at the Lambda function.
- `MISSING_EVENT_PARAMETER`:  Indicates that not all required fields were sent from AWS Connect to the Lambda Function.
- `MISSING_AWS_SECRET_PARAMETER`:  Indicates that there are some missing keys in the AWS Secret Manager secret.
- `TEMPLATE_NOT_FOUND`: Indicates that the specified template does not exist. It is recommended to check in AWS Secret Manager if the template is created in META. An error could also occur in Amazon Connect during the lambda invocation due to an incorrect value in the **template field**.
- `CUSTOM_API_ERROR`: Occurs when there is a failure in the API being consumed.

> To ensure the proper functioning of the function, it is essential that the META templates are properly configured in AWS Secret Manager. Additionally, thorough testing is recommended to verify the integrity of the messaging system.

It is also important to note that the communication channel used by the function is configurable, providing flexibility to adapt to different usage environments.

Finally, it is suggested to keep the documentation updated and available to facilitate understanding and management of the project by other developers and system administrators.

For more details on implementation and configuration, please refer to the source code and associated documentation.



