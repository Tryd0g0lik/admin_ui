/**
 * src\services\cookies\cookieCheckLive.ts
 */
import { getCoockie } from "./getCookies";

/* This function look the 'access_token=' substring in to the cookie.\
* If return true - this means that we have an 'access_token=' in to the cookie.\
* If return false - this means than we don not have the 'access_token=' and 'refresh_token=' in cookie.
* If return string - this means that we have only 'refresh_token=' in cookie and returned the value.
*/
export function checkLiveOfCoockie() {
  const result = getCoockie();
  if (typeof result === "boolean") {
    return false;
  } else if (typeof result === "object" && Object.keys(result).length > 0 &&
    Object.keys(result)[0] === "access_token") {
    return true;
  } else if (typeof result === "object" && Object.keys(result).length > 0 &&
    Object.keys(result)[0] === "refresh_token") {
    return (result as { refresh_token: string })["refresh_token"];
  }

  /** If we reding code at the this stage, it \
   * mean these "access_token=", "refresh_token=" keys we not found.  */
  localStorage.removeItem("user");
  return false;
}
