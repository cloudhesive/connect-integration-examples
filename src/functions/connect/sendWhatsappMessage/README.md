## Envios de mensajes desde AWS Connect hacía Whatsapp

#### Este proyecto presenta una función diseñada para simplificar el envío de mensajes de WhatsApp a través de AWS Connect. La función acepta múltiples parámetros de entrada para configurar y enviar mensajes de manera eficiente, además está desarrollada lo mas generica posible, permitiendo su utilización en diversos contextos de un proyecto.

### Utilización de los parametros de entrada

La función requiere los siguientes parámetros **requeridos**:

- `toPhoneNumber`: El número al que se enviará el mensaje de WhatsApp de inicio.
- `template`: El nombre del template de META que se utilizará para formatear el mensaje.
- `channel`: El canal donde se está realizando la solicitud. Por defecto es "Connect".
- `message`: El contenido del mensaje que se mostrará en WhatsApp.
- `language`: El idioma del template. Por defecto será "es" (Español).

### Mensajes de error

La función puede devolver los siguientes mensajes de error:

- `TEMPLATE_NOT_FOUND`: Indica que el template especificado no existe. Se recomienda verificar en AWS Secret Manager si el template está creado en META. También podría surgir un error en Amazon Connect durante la invocación de la lambda debido a un valor incorrecto en el campo **template**.
- `MESSAGE_SEND_ERROR`: Se produce cuando hay un fallo al enviar el mensaje de WhatsApp.

> Para garantizar el correcto funcionamiento de la función, es fundamental que los templates de META estén configurados adecuadamente en AWS Secret Manager. Además, se recomienda realizar pruebas exhaustivas para verificar la integridad del sistema de mensajería.

Asimismo, es importante tener en cuenta que el canal de comunicación utilizado por la función es configurable, lo que brinda flexibilidad para adaptarse a diferentes entornos de uso.

Por último, se sugiere mantener la documentación actualizada y disponible para facilitar el entendimiento y la gestión del proyecto por parte de otros desarrolladores y administradores del sistema.

Para obtener más detalles sobre la implementación y configuración, consulte el código fuente y la documentación asociada.



