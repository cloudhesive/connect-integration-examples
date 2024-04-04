import { execute } from "../../../modules/rest.mjs"
import { parseBody } from "../../../layers/utils/api/formatters.mjs"
import { errors } from "../../../layers/utils/nodejs/errors.mjs"
import { authorizationHandler } from "../../../layers/utils/api/checkers.mjs"
import { getSecretValue } from "../../../layers/aws-resources/secretManager.mjs"

const SECRET_NAME = process.env.secretManagerName

export const handler = async (event) => {
    const req = parseBody(event)

    if (!req.body || !req.method || !req.authorizationType) {
        return errors.MISSING_PARAMETER;
    }

    const { body, method, authorizationType } = req
    const { AccessToken, url } = await getSecretValue(SECRET_NAME)

    const headers = authorizationHandler[authorizationType]?.({ AccessToken });
    console.log("🚀 ~ exports.handler= ~ headers:", headers)

    const request = {
        method,
        url,
        headers,
        body
    }
    console.log("🚀 ~ exports.handler= ~ request:", request)

    const response = await execute(request)
    console.log("🚀 ~ exports.handler= ~ response:", response)

    return response
};


