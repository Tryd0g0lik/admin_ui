/**
 * src/interfesaces.ts
 */

/* NEW TYPE REDUX */
/**
 * This is intarface for User.status
 */
export enum UserStatus {
  STATUS_ADMIN = "ADMIN",
  STATUS_USER = "USER",
  STATUS_SUPER_ADMIN = "SUPER_ADMIN",
  STATUS_ANONYMOUSUSER = "ANONYMOUSUSER"
}

/**
 * This is intarface for User.privaleges
 */
export enum UserPrivaleges {
  PRIVALEGES_ADMIN = "COMMENT",
  PRIVALEGES_SUPER_ADMIN = "ALL",
  PRIVALEGES_USER = "READING",
  PRIVALEGES_ANONYMOUS = "NoN",

}

/**
 * email: string  of user
 * password: string  of user
 */
interface UserSecretData {
  email: string,
  password: string
}

export interface TokenGenerate {
  "access_token": string,
  "refresh_token": string,
  "access_expired_at": number,
  "refresh_expired_at": number
}
/** * 
 * status: ADMIN, USER, SUPER_ADMIN, ANONYMOUSUSER of UserStatus
 * privaleges: COMMENT, ALL, READING, NoN of UserPrivaleges
 * token: string  is secret key of server
 */
export interface User extends UserSecretData {
  status: string, // of UserRole
  privaleges: string[], // NoN, All, Reading, Comment
  token?: string
}

/** Type for HeaderFC's props */
export type HendlerPropType = { userstatus: string, head: string | undefined };
/**
 * [
    {
        "id": 148,
        "title": "Какой-то пост2asdasd",
        "code": "kakoj-to-post2",
        "authorName": "1 1",
        "previewPicture": {
            "id": 208,
            "name": "krutaia_ava.jpg",
            "url": "http://static-test.machineheads.ru/upload/post-preview/191/krutaiaava.jpg"
        },
        "tagNames": [
            "Стихи",
            "Проза"
        ],
        "updatedAt": "2025-04-29T15:42:23+03:00",
        "createdAt": "2025-04-27T18:13:11+03:00"
    },
    {
        "id": 147,
        "title": "qeqwe",
        "code": "qweqweqwe",
        "authorName": null,
        "previewPicture": {
            "id": 199,
            "name": "26.png",
            "url": "http://static-test.machineheads.ru/upload/post-preview/2dd/26.png"
        },
        "tagNames": [],
        "updatedAt": "2025-02-28T12:09:22+03:00",
        "createdAt": "2025-02-27T20:39:41+03:00"
    },
    {
        "id": 144,
        "title": "йцуйцу2222111",
        "code": "asdasd122",
        "authorName": null,
        "previewPicture": {
            "id": 196,
            "name": "Снимок экрана 2025-02-20 135745.png",
            "url": "http://static-test.machineheads.ru/upload/post-preview/9f4/snimok-ekrana-2025-02-20-135745.png"
        },
        "tagNames": [
            "Проза"
        ],
        "updatedAt": "2025-02-27T10:41:57+03:00",
        "createdAt": "2025-02-27T10:04:21+03:00"
    },
    {
        "id": 134,
        "title": "1123123",
        "code": "asdasd22222",
        "authorName": null,
        "previewPicture": {
            "id": 178,
            "name": "Снимок экрана 2025-02-19 221641.png",
            "url": "http://static-test.machineheads.ru/upload/post-preview/d02/snimok-ekrana-2025-02-19-221641.png"
        },
        "tagNames": [
            "Проза"
        ],
        "updatedAt": "2025-02-26T22:31:50+03:00",
        "createdAt": "2025-02-26T22:31:50+03:00"
    },
    {
        "id": 133,
        "title": "1123123",
        "code": "asdasd22",
        "authorName": null,
        "previewPicture": {
            "id": 177,
            "name": "Снимок экрана 2025-02-19 221641.png",
            "url": "http://static-test.machineheads.ru/upload/post-preview/9fc/snimok-ekrana-2025-02-19-221641.png"
        },
        "tagNames": [
            "Проза"
        ],
        "updatedAt": "2025-02-26T22:31:42+03:00",
        "createdAt": "2025-02-26T22:31:42+03:00"
    },
    {
        "id": 131,
        "title": "12313",
        "code": "1212",
        "authorName": null,
        "previewPicture": {
            "id": 175,
            "name": "Снимок экрана 2025-02-20 190234.png",
            "url": "http://static-test.machineheads.ru/upload/post-preview/049/snimok-ekrana-2025-02-20-190234.png"
        },
        "tagNames": [
            "Стихи",
            "Проза"
        ],
        "updatedAt": "2025-02-26T21:41:10+03:00",
        "createdAt": "2025-02-26T21:41:10+03:00"
    },
    {
        "id": 130,
        "title": "555555",
        "code": "454545",
        "authorName": null,
        "previewPicture": {
            "id": 174,
            "name": "26.png",
            "url": "http://static-test.machineheads.ru/upload/post-preview/d75/26.png"
        },
        "tagNames": [],
        "updatedAt": "2025-02-26T21:17:31+03:00",
        "createdAt": "2025-02-26T21:17:31+03:00"
    },
    {
        "id": 129,
        "title": "12312312",
        "code": "1211111",
        "authorName": null,
        "previewPicture": {
            "id": 173,
            "name": "26.png",
            "url": "http://static-test.machineheads.ru/upload/post-preview/27c/26.png"
        },
        "tagNames": [],
        "updatedAt": "2025-02-26T19:53:26+03:00",
        "createdAt": "2025-02-26T19:53:26+03:00"
    },
    {
        "id": 127,
        "title": "qwe",
        "code": "123",
        "authorName": null,
        "previewPicture": {
            "id": 171,
            "name": "26.png",
            "url": "http://static-test.machineheads.ru/upload/post-preview/be4/26.png"
        },
        "tagNames": [],
        "updatedAt": "2025-02-26T16:48:48+03:00",
        "createdAt": "2025-02-26T16:48:48+03:00"
    }
]
 * 
 */
