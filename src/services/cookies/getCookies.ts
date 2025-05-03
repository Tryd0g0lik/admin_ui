/*
src\services\cookies\getCookies.ts
*/
type GetCookieRespone = boolean | { "access_token": string } | { "refresh_token": string };

/**
 * This function get the cookies and check if exists the 'access_token' or 'refresh_token='.\
 * @param {string | undefined } token_name is the cookie name. This is if you waht to get a specific \
 * token (you have a your single target of 'access_token' or 'refresh_token'). This parameter has default value undefined.
 * @returns {object} if the cookies exists it will return the cookies value (from object type ), else will return false\
 * If exists  the 'access_token' "`{ "access_token": (cookies[i].trim().substring("access_token=".length, ) ) }`"\
 * If exists the 'refresh_token=' "`{ "refresh_token": (cookies[i].trim().substring("refresh_token=".length, ) ) }`"
 */
export function getCoockie(token_name: undefined | string = undefined): GetCookieRespone {

  const cookies: string[] = document.cookie.split(';');
  let accessToken;
  // if (!token_name){

  // }
  /* Checking the 'access_token=' substring. */
  for (let i = 0; i < cookies.length; i++) {
    // token_name = !token_name ? "access_token=" : "refresh_token";
    if ((
      cookies[i].trim() && !token_name && (cookies[i].trim()).startsWith(`access_token=`)
    ) || (
        cookies[i].trim() && token_name
        && `access_token=`.includes(token_name)
        && (cookies[i].trim()).startsWith(`access_token=`)
      )) {
      /** If exists the 'access_token=' return the object */
      
      return { "access_token": (cookies[i].trim().substring("access_token=".length, ) ) };
    }
  }
  /** If exists the 'refresh_token=' return the object */
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if ((!token_name && cookie.startsWith("refresh_token=")) || (
      token_name && `refresh_token=`.includes(token_name) && cookie.startsWith("refresh_token=")
    )) {
      accessToken = cookie.substring("refresh_token=".length);
      return { "refresh_token": accessToken};
    }
  }
  /** If not found return false */
  return false;
}
