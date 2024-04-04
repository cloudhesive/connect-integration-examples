import { getSecretValue } from "../../../layers/aws-resources/secretManager.mjs"
import { channelTemplate } from "../../../layers/whatsapp/template.mjs"
import { execute } from "../../../modules/rest.mjs"
import { findElement } from "../../../layers/utils/nodejs/arrays.mjs"
import { parseBody } from "../../../layers/utils/api/formatters.mjs"
import { errors } from "../../../layers/utils/nodejs/errors.mjs"
import { success } from "../../../layers/utils/nodejs/success.mjs"
import { authorizationHandler } from "../../../layers/utils/api/checkers.mjs"

const SECRET_NAME = process.env.secretManagerName

export const handler = async (event) => {
    const body = parseBody(event)
    // Agregar validacion con JOI para que verifique que los parametros enviado EXISTAN - Opcional
    if (!body.toPhoneNumber || !body.template || !body.channel || !body.message || !body.authorizationType || !body.language) {
        throw new Error(JSON.stringify(errors.MISSING_EVENT_PARAMETER))
    }

    const { toPhoneNumber, template, channel, authorizationType, language } = body
    const { AccessToken, url, templates } = await getSecretValue(SECRET_NAME)

    // Agregar validacion con JOI para que verifique que los parametros enviado EXISTAN - Opcional
    if (!AccessToken || !url || !templates) {
        throw new Error(JSON.stringify(errors.MISSING_AWS_SECRET_PARAMETER));
    }

    const templateExists = findElement(templates, template)
    console.log("🚀 ~ exports.handler= ~ templateExists:", templateExists)

    if (!templateExists) {
        throw new Error(JSON.stringify(errors.TEMPLATE_NOT_FOUND));
    }

    const data = channelTemplate[channel]({ toPhoneNumber, template, message, language });
    console.log("🚀 ~ exports.handler= ~ data:", data)

    const headers = authorizationHandler[authorizationType]?.({ AccessToken });
    console.log("🚀 ~ exports.handler= ~ headers:", headers)

    const request = {
        method: 'POST',
        maxBodyLength: Infinity,
        url,
        headers,
        data
    }
    console.log("🚀 ~ exports.handler= ~ request:", request)
    await execute(request)

    const response = JSON.stringify(success.MESSAGE_SENT)
    console.log("🚀 ~ exports.handler= ~ response:", response)

    return response
};


