import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import { errors } from "../utils/nodejs/errors.mjs"

const client = new SecretsManagerClient();

const getSecretValue = async (secretName) => {
    try {
        const secret = GetSecretValueCommand({ SecretId: secretName });
        const response = await client.send(secret);
        return JSON.parse(response.SecretString);
    } catch (error) {
        console.log("🚀 ~ getSecretValue ~ error:", error)
        throw new Error(JSON.stringify(errors.GET_SECRET_VALUE_ERROR))
    }

}

export { getSecretValue };
