/**
 * src\services\some.ts
 */
import { TokenGenerate } from "src/interfesaces";
/**
* The 'resultEmty' is empty object/object for response.\
* If we have unsuccessful to the server's request,\
* we create an empty object for recponse
*/
export const resultEmty: TokenGenerate = Object.create({
  "access_token": "",
  "refresh_token": "",
  "access_expired_at": 0,
  "refresh_expired_at": 0
}) as TokenGenerate;
export type ResultTokenType = typeof resultEmty;
