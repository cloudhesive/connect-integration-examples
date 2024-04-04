const errors = {
    TEMPLATE_NOT_FOUND: {
        code: 1,
        error: 'Template does not exist',
        details: 'Review it on AWS Secret Manager or AWS Connect parameters.'
    },
    MISSING_EVENT_PARAMETER: {
        code: 2,
        error: 'Missing parameter on Lambda Function event',
        details: 'One or more required parameters are missing.'
    },
    CUSTOM_API_ERROR: {
        code: 3,
        error: 'Error calling this API',
        details: 'There was an error calling the endpoint.'
    },
    GET_SECRET_VALUE_ERROR: {
        code: 4,
        error: 'Error retrieving the secret value',
        details: 'There was an error calling the AWS Secret Manager API.'
    },
    BODY_PARSE_ERROR: {
        code: 5,
        error: 'Error formatting the body request',
        details: 'There was an error formatting the body request (API or AWS Connect).'
    },
    INVOKE_LAMBDA_FUNCTION_ERROR: {
        code: 6,
        error: 'Error invoking a Lambda Function',
        details: 'There was an error calling the Lambda Function API.'
    },
    MISSING_AWS_SECRET_PARAMETER: {
        code: 7,
        error: 'Missing parameter on AWS Secret Manager Parameters',
        details: 'One or more required parameters are missing.'
    },
};

export { errors };
