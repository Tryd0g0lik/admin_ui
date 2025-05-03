/**
 * src\components\Posts\handlers\handlerRequest.ts
 * */
import { getCoockie } from "src/services/cookies/getCookies";
import requestJWTGet from "src/components/Posts/tasks/requestJWTGet";
import { handlerRequestTokenRefresh } from "src/services/handler/handlerRequestRefresh";
import { taskCookieUpdate } from "src/services/cookies/cookieUpdate";
import { TokenGenerate } from "src/interfesaces";
let index = 0;
export async function handlerButtonRequest(): Promise<boolean> {
  /** ASYNC SUB FUNCTION */
  async function subFuncRefreshTokens() {
    const refreshToken = getCoockie("refresh_token");
    let result = await handlerRequestTokenRefresh(refreshToken as { "refresh_token": string });
    if (result && typeof result !== "object" || (Object.keys(result)).length < 2) {
      console.log(`[handlerButtonRequest]: Token is not valid or Token has been expired`);
      return false;
    }
    // Updats of cookie from data of Token - Refresh.
    const respBool = await taskCookieUpdate(result as TokenGenerate);
    return respBool;
  }
  while (index < 3) {
    /** GET SECRET KEY */
    const getToken = getCoockie();
    const getTokenArr = Object.keys(getToken);
    if (getTokenArr.length === 0) {
      /** THE TOKENS WAS NOT FOUND  */
      console.error(new Error("[handlerButtonRequest]: No token"));
      index = +3;
      return false;
    }
    /** GET URL */
    const url = new URL("https://rest-test.machineheads.ru/manage/posts");
    if (getToken && getTokenArr.length > 0 && getTokenArr.includes("access_token")) {

      /** REQUEST */
      const result = await requestJWTGet(url, Object.values(getToken)[0]);
      /** RESULT IS FALSE. THE NEED UPDATES TOKENS/COOKIE  */
      if (Object.keys(result).length === 0) {
        await subFuncRefreshTokens();
        if (index < 3) {
          // await handlerButtonRequest();
          index++;
          /** REPEAP REQUEST */
          continue;
        }
        index = +3;
        console.error("[handlerButtonRequest]: Error. Somethins what wrong to the update's cookie!");
        continue;
      }
      console.log(result);
      index = + 3;
      return true;
    } else if (getTokenArr.length > 0 && getTokenArr.includes("refresh_token")) {

      const respBool = await subFuncRefreshTokens();
      if (!respBool) {
        console.error("[handlerButtonRequest]: Error. Somethins what wrong to the update's cookie! Tokens was not found.");
        index = +3;
        continue;
      }
      index++;
      continue;
    }
    return false;
  }

  return false;
}
