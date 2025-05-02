## Пользователь 
**Note**: *В силу ограниченных действий и событий образ пользователя собирается через* \
*"`Object`". ООП не используется.*

<<<<<<< HEAD
Любой пользователь попадая на страниу арр получает статус "`ANONYMOUSUSER`" и привелегии "`NoN`".\
```ts
import { UserPrivaleges, UserStatus, User } from "src/interfesaces";
{ // базовый user state.
  "email": "",
  "password": "",
  "status": UserStatus.STATUS_ANONYMOUSUSER,
  "privaleges": [UserPrivaleges.PRIVALEGES_ANONYMOUS],
  "token": ""
}
```
В данный момент, логика приложения основывается на таких свойствах как:\
- "`email`";
- "`password`";
- "`status`";
- "`privaleges`".

**Note**: *"`password`", "`email`" для передачи данных при событии GENERATE-запроса на сервер*.\
*Затем - пустая строка*.

"`status`" и "`privaleges`" регулируют уровень доступа и отобращаемого контента на странице.

**Например**, *если статут не является "`ANONYMOUSUSER`" , то открывается дополнительный раздел в верхнем меню, с его подразделами*.

**Подробнее** *о статусах и привелегиях пользователя "`src\interfesaces.ts`".*

### CACH
1. Состояние образа пользователя сохраняется в "`localStorage`" с ключем "`user`".\
Данный  cach - востанавливает REDUX при событиях - перезагрузка и прочие перезагрузки страниц. \
"`src\reduxes\features\userstate\userSlice.ts`"

2. Токены сохраняем в "`Cookie`".

На этапе загрузки страницы , проверяем "`cookie`" и "`LS`". \
"`src\reduxes\features\userstate\userSlice.ts`"\
В приоритете проверки "`cookie`" и если токен не находим, удаляем "`LS`". Пользователь получает \
статус "`ANONYMOUSUSER`", дополнительно чистим REDUX.

## UI
Клик по кнопке "`Вход`" открывает модальное окно с формой.\
"`src\components\InSideForm\index.tsx`"

1. Форма имеет свои регулярные выражения, в качестве шаблона для проверки контента формы.\
Заполняем поля, событие с клавишей "`Enter`" из поля ("`<input>`') вызывает проверку и публикует/удаляет ообщения об ошибке.

Всплываюшее описание  \
[Сообщение об ошибках в форме](./img//error_message_of_form.png)

Если форма заполнена корректно то отправляем запросы на сервер.\
"`src\components\NavBar\hamdlers`".

2. Текст кнопки "`Вход`", при изменении статуса "`ANONYMOUSUSER`" на любой другой статус, \
меняет на "`Выход`".

3. Наличие, на кнопке теста "`Выход`" не позволяет повторно вызывать форму активации. 
4. Клик по кнопке с текстом "`Выход`" чистит "`cookie`" и "`localStorage`", затем перекидывает пользователя на главную.\
Пользователь вновь получает статус "`ANONYMOUSUSER`". 


## Комментарии
"Auth", исходя из описания - просто авторизация, а "Profile" вероятно переходим на страницу пользователя.\
Ошибку "`CORS`" исправило удаление "`headers`" из настройки запроса (что оказалось не тепичным для меня совершая POST запрос).
=======
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
>>>>>>> aa07fb5eed66283cc5b0806cb36c7c170ea3be73
