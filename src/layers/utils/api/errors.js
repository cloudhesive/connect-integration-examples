const errors = {
    TEMPLATE_NOT_FOUND: {
        statusCode: 400,
        body: JSON.stringify({
            code: 1,
            error: 'Template does not exist',
            details: 'Review it on AWS Secret Manager or AWS Connect parameters.'
        })
    },
    MISSING_PARAMETER: {
        statusCode: 400,
        body: JSON.stringify({
            code: 2,
            error: 'Missing parameter',
            details: 'One or more required parameters are missing.'
        })
    },
    MESSAGE_SEND_ERROR: {
        statusCode: 400,
        body: JSON.stringify({
            code: 3,
            error: 'Error sending a message',
            details: 'There was an error sending the message.'
        })
    }
};

export { errors };
