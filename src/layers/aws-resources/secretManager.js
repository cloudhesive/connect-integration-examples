import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient(config);

const getSecretValue = async (secretName) => {
    const secret = GetSecretValueCommand({ SecretId: secretName });
    const response = await client.send(secret);
    return JSON.parse(response.SecretString);
}

export { getSecretValue };
