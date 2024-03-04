import { getSecretValue } from "../../../../layers/aws-resources/secretManager"
import { channelTemplate } from "../../../../layers/whatsapp/template"
import { execute } from "../../../../modules/rest"
import { findElement } from "../../../../layers/utils/nodejs/arrays"
import { parseBody } from "../../../../layers/utils/api/formatters"
import { errors } from "../../../../layers/utils/api/errors"
import { success } from "../../../../layers/utils/api/success"

const SECRET_NAME = process.env.secretManagerName

exports.handler = async (event) => {
    try {
        const { toPhoneNumber, template, channel, message, language } = parseBody(event)
        // Agregar validacion con JOI para que verifique que los parametros enviado EXISTAN - Opcional
        if (!toPhoneNumber || !template || !channel || !message || !language) {
            return errors.MISSING_PARAMETER;
        }

        const { AccessToken, url, templates } = await getSecretValue(SECRET_NAME)

        const templateExists = findElement(templates, template)

        if (!templateExists) {
            return errors.TEMPLATE_NOT_FOUND;
        }

        const data = channelTemplate[channel][template]({ toPhoneNumber, template, message, language });

        console.log("🚀 ~ file: message.js:16 ~ exports.handler= ~ data:", data)

        const request = {
            method: 'POST',
            url,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${AccessToken}`
            },
            data
        }
        await execute(request)
        return success.MESSAGE_SENT
    } catch (error) {
        console.log("🚀 ~ exports.handler= ~ error:", error)
        return errors.MESSAGE_SEND_ERROR
    }


};


