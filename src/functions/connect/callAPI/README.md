## Consumir una API desde AWS Connect

#### Esta función proporciona una funcionalidad genérica para consumir una API desde Amazon Connect. Permite enviar solicitudes HTTP a una API externa con parámetros configurables, como el cuerpo de la solicitud, el método HTTP y el método de autorización.

### Utilización de los parametros de entrada

La función requiere los siguientes parámetros **requeridos**:

- `body`: El cuerpo de la solicitud a enviar.
- `method`: Método HTTP a utilizar en la llamada a la API.
- `authorizationType`: Método de autorización de la API a consumir. Los tipos de autorización disponibles son:
    - `Bearer`: Tipo de token de acceso utilizado en el protocolo OAuth 2.0 para autenticar solicitudes HTTP.

### Mensajes de error

La función puede devolver los siguientes mensajes de error:

- `BODY_PARSE_ERROR`: Ocurre cuando hay un fallo al intentar formatear el evento que llega a la función lambda.
- `GET_SECRET_VALUE_ERROR`: Indica un fallo al intentar llamar a la función **GetSecretValueCommand** para obtener los secretos desde AWS Secret Manager.
- `CUSTOM_API_ERROR`: Se produce cuando hay un fallo en la API que se está consumiendo.

> Para garantizar el correcto funcionamiento de la función, es fundamental configurar adecuadamente los secretos en AWS Secret Manager. De lo contrario, el funcionamiento de la función se verá comprometido.

Por último, se recomienda mantener la documentación actualizada y disponible para facilitar la comprensión y gestión del proyecto por parte de otros desarrolladores y administradores del sistema.

Para obtener más detalles sobre la implementación y configuración, consulte el código fuente y la documentación asociada.