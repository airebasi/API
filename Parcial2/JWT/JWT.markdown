# JSON Web Token (JWT)

Los JSON Web Tokens (JWT) son un estándar abierto, que se define en la Especificación RFC 7519 del token web JSON (JWT). Representan de forma segura reclamos entre dos partes. Los reclamos pueden estar relacionados con cualquier proceso comercial, pero generalmente se usan para representar una identidad y sus asociaciones. Por ejemplo, un usuario cuya identidad representa el JWT pertenece a una función o grupo de administrador.

Este es un estándar muy conocido que forma parte de una gran familia, la cual tiene a JOSE (JSON Object Signing and Encryption) como su “padre”.

## Especificaciones de JOSE

El JOSE está formado por las siguientes especificaciones:

**-  JWT (JSON Web Token)**: Que es el propio Token.  
**- JWS (JSON Web Signature)**: Que representa la firma del Token.  
**- JWE (JSON Web Encryption)**: Consistente en la encriptación para la firma del Token.  
**- JWK (JSON Web Keys)**: Que son las claves para la firma.  
**- JWA (JSON Web Algorithms)**: Que representa los algoritmos para la firma del Token.

El JWT es más famoso entre estas especificaciones, porque es por medio de él que se utilizan las demás.

Este estándar se describe como una forma compacta y segura de representar las Claims, que son las reivindicaciones entre las partes. JWT las codifica como objetos JSON, que pueden ser firmados digitalmente o encriptados.

## ¿Por qué utilizar JWT?

Las ventajas de utilizar JWT incluyen las siguientes:

- Son livianos y fáciles de usar para aplicaciones cliente: por ejemplo, aplicaciones móviles.
- Son autónomos, lo que significa que el servidor Liberty JVM puede consumir el token directamente y utilizar una reclamación del token como identidad para ejecutar la solicitud.
- Pueden estar firmados simétricamente mediante un secreto compartido mediante el algoritmo HMAC o asimétricamente mediante una clave privada.
- Tienen un mecanismo de caducidad incorporado.
- Se pueden ampliar para que contengan declaraciones personalizadas.
- Son ampliamente adoptados por diferentes soluciones de inicio de sesión único y estándares bien conocidos, como OpenID Connect.

## Anatomía de un JWT

### Cabecera

El encabezado normalmente consta de dos partes: el tipo de token, que es JWT, y el algoritmo que se utiliza, como HMAC.SHA256 o RSASHA256. Está Base64Url codificado para formar la primera parte del JWT.

### Carga útil

La carga útil contiene las reclamaciones. Hay un conjunto de reclamaciones registradas, por ejemplo:

- `iss` Editor
- `exp` Tiempo de expiración
- `sub` Sujeto
- `aud` Audiencia

Estos reclamos no son obligatorios, pero se recomiendan para proporcionar un conjunto de reclamos útiles e interoperables. La carga útil también puede incluir atributos adicionales que definen reclamos personalizados, como el rol del empleado. Normalmente, la declaración de sujeto se utiliza para crear el sujeto de usuario de OpenID Connect. Sin embargo, el servidor Liberty JVM se puede configurar para utilizar una notificación alternativa. La carga útil está Base64Url codificada para formar la segunda parte del JWT.

### Firma

Para crear la parte de la firma, el encabezado codificado y la carga útil codificada se firman utilizando el algoritmo de firma del encabezado. La firma se utiliza para verificar que el emisor del JWT es quien dice ser y para garantizar que el mensaje no haya cambiado en el camino.


**_Figura 1_** JWT consta de tres partes: un encabezado, una carga útil y una firma.
![Ejemplo Anatomía JWT](https://www.ibm.com/docs/es/SSJL4D_6.x/security/graphics/jwt-anatomy.png)

## Flujo de Uso de JWT

1. El usuario inicia sesión con credenciales.
2. Cuando el usuario se autentica, se crea un JWT y se devuelve al usuario.
3. Cuando el usuario desea acceder a un recurso protegido, la aplicación cliente envía el JWT, normalmente en el encabezado de Autorización HTTP.
4. Luego, el servidor de aplicaciones utiliza el JWT, como por ejemplo CICS, para identificar al usuario y permitir el acceso al recurso.

**_Figura 2_** Ejemplo de Flujo de JWT
![Ejemplo de Flujo de JWT](https://www.ibm.com/docs/es/SSJL4D_6.x/security/graphics/jwt1.svg)

## ¿Dónde se usa el JWT?

Hay tres momentos en los que se destaca:

**1. Autenticación**: Principalmente por la facilidad de uso entre los diferentes dominios.
**2. Autorización**: Una vez que el usuario se conecta, cada solicitud realizada al servidor incluirá un JWT, permitiendo su acceso a las rutas, servicios y recursos que fueron liberados a través del Token.
**3. Intercambio de información**: El JWT es una forma segura de realizar este proceso entre las partes.
