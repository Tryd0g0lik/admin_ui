import { User, TokenGenerate } from "src/interfesaces";
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

/**
 * Token Generate\
 * Here, data of form - sending to the server and some tokens are received\
 * for user;\
 * After returning the responce from  this function, we need checkout the responce.\
 * If you key of response the "`refresh_expired_at`" or "`access_expired_at`" equals zero "`0`"\
 * this means that you have tokens is incorrect.\
 * Repeat the request and send the data of the form to the server again.
 * @param props - Proporties of user;
 * @returns ```json
 * {
  "access_token": "",
  "refresh_token": "",
  "access_expired_at": 0,
  "refresh_expired_at": 0
}
  ```
 */
export async function handlerRequstTokenGenerate(props: User): Promise<TokenGenerate> {

  const {email, password} = {...props};
  /** CREATES DATA OF FORM */
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  try {
    const response = await fetch("https://rest-test.machineheads.ru/auth/token-generate", {
      method: "POST",
      body: formData
    });
    /** RESPONSE IS NOT VALID */
    if (response.status !== 200) {
      return resultEmty;

    }
    /** RESPONSE IS VALID */
    const result: TokenGenerate = await response.json() as TokenGenerate;
    return result;

  } catch (e) {
    console.log(`[handlerRequstTokenGenerate]: Error of REQUEST: ${e}`);
  }
  return resultEmty;
}
