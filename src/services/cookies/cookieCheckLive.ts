/**
 * src\services\cookies\cookieCheckLive.ts
   * This function look the 'access_token=' substring in to the cookie.\
   * If return true - this means that we have an 'access_token=' in to the cookie.\
   * If return false - this means than we don not have the 'access_token=' and 'refresh_token=' in cookie.
   * If return string - this means that we have only 'refresh_token=' in cookie and returned the value.
   */
export function checkLiveOfCoockie() {
  
  const cookies: string[] = document.cookie.split(';');
  let accessToken;
  /* Checking the 'access_token=' substring. */
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].trim() && (cookies[i].trim()).startsWith("access_token=")) {
      /** If we received the 'access_token=' It is mean that break the cycle */
      return true;
    }
  }
  /** If we not received the 'access_token=' This means that we need to start to searching \
   *  the 'refresh_token=' substring */
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("refresh_token=")) {
      accessToken = cookie.substring("refresh_token=".length - 1);
      return accessToken;
    }
  }
  /** If we reding code at the this stage, it \
   * mean these "access_token=", "refresh_token=" keys we not found.  */
  localStorage.removeItem("user");
  return false;
}
