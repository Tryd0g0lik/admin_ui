В файле "`src\components\NavBar\hamdlers\handlerRequest.ts`" делаю запрос на сервер для данных от "`Token Generate`".

Ошибок, в настройке запроса на серве не вижу.

Но сервер меня не провпускает\
```console
127.0.0.1/:1 Access to fetch at 'http://rest-test.machineheads.ru/auth/token-generate' from origin 'http://127.0.0.1:8080' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```
Postman сегодня вовсе отвечает
```json
{
    "name": "Method Not Allowed",
    "message": "Method Not Allowed. This URL can only handle the following request methods: POST.",
    "code": 0,
    "status": 405
}
```