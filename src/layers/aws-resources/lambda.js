import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
const client = new LambdaClient(config);

const invoke = async (functionName, data, invocationType = "Event") => {
    try {
        const params = {
            FunctionName: functionName,
            InvocationType: invocationType,
            Payload: JSON.stringify(data)
        };

        const command = new InvokeCommand(params);
        return await client.send(command);
    } catch (error) {
        console.log("🚀 ~ invoke ~ error:", error.message)
        throw error
    }

}

export { invoke };