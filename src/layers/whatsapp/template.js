const generate = (request, components = []) => {
    return {
        messaging_product: "whatsapp",
        to: request.toPhoneNumber,
        type: "template",
        template: {
            name: request.template,
            language: {
                code: request.language
            },
            components: components
        }
    };
};

const channelTemplate = {
    Connect: {
        [template]: (request) => generate(request),
    }
};

export {
    channelTemplate
};