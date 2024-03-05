import { execute } from "../../../modules/rest"
import { parseBody } from "../../../layers/utils/api/formatters"
import { errors } from "../../../layers/utils/nodejs/errors"
import { authorizationHandler } from "../../../layers/utils/api/checkers"
import { getSecretValue } from "../../../layers/aws-resources/secretManager"

const SECRET_NAME = process.env.secretManagerName

exports.handler = async (event) => {
    const { body, method, authorizationType } = parseBody(event)

    if (!body || !method || !authorizationType) {
        return errors.MISSING_PARAMETER;
    }

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


