/*
src\services\cookies\getCookies.ts
*/
type GetCookieRespone = boolean | { "access_token": string } | { "refresh_token": string };

/**
 * 
 * @returns {object} if the cookies exists it will return the cookies value (from object type ), else will return false\
 * If exists  the 'access_token' "`{ "access_token": (cookies[i].trim().substring("access_token=".length, ) ) }`"\
 * If exists the 'refresh_token=' "`{ "refresh_token": (cookies[i].trim().substring("refresh_token=".length, ) ) }`"
 */
export function getCoockie(): GetCookieRespone {

  const cookies: string[] = document.cookie.split(';');
  let accessToken;
  /* Checking the 'access_token=' substring. */
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].trim() && (cookies[i].trim()).startsWith("access_token=")) {
      /** If exists the 'access_token=' return the object */
      
      return { "access_token": (cookies[i].trim().substring("access_token=".length, ) ) };
    }
  }
  /** If exists the 'refresh_token=' return the object */
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("refresh_token=")) {
      accessToken = cookie.substring("refresh_token=".length - 1);
      return { "refresh_token": accessToken};
    }
  }
  /** If not found return false */
  return false;
}
