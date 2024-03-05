## Consuming an API from AWS Connect

#### This function provides a generic functionality for consuming an API from Amazon Connect. It allows sending HTTP requests to an external API with configurable parameters, such as the request body, HTTP method, and authorization method.

### Usage of Input Parameters

The function requires the following **required parameters**:

- `body`: The body of the request to send.
- `method`: HTTP method to use in the API call.
- `authorizationType`: Authorization method of the API to consume. The available authorization types are:
    - `Bearer`: Access token type used in the OAuth 2.0 protocol to authenticate HTTP requests.

### Error Messages

The function can return the following error messages:

- `BODY_PARSE_ERROR`: Occurs when there is a failure in attempting to format the event arriving at the Lambda function.
- `GET_SECRET_VALUE_ERROR`: Indicates a failure in attempting to call the **GetSecretValueCommand** function to retrieve secrets from AWS Secret Manager.
- `CUSTOM_API_ERROR`: Occurs when there is a failure in the API being consumed.

> To ensure the proper functioning of the function, it is crucial to configure the secrets in AWS Secret Manager adequately. Otherwise, the function's operation will be compromised.

Finally, it is recommended to keep the documentation updated and available to facilitate understanding and management of the project by other developers and system administrators.

For more details on implementation and configuration, please refer to the source code and associated documentation.