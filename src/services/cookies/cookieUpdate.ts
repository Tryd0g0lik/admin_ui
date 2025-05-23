/**
 * src\services\cookies\cookieUpdate.ts
 */
import { TokenGenerate } from "src/interfesaces";

/**
 * 
 * This is async functuion.
 * Gets the result of the request and saves the data to the cookie. This result is from \
 *  the 'Token Refresh' and 'Token Generate'.
 * @returns Promise<void>
 */
export async function taskCookieUpdate(result: TokenGenerate): Promise<boolean> {

  if (result && typeof result === 'object') {
    if (!(result as TokenGenerate).access_expired_at || (result as TokenGenerate).access_expired_at && (result as TokenGenerate).access_expired_at === 0) {
      console.log(new Error("[taskCookieUpdate]: Token Generate has incorrect type."));
      return false;
    }

    /* SAVE DATA TO THE COOKIE (GENERATE TOKEN)*/
    // access_token
    const expirationDate = new Date();
    expirationDate.setHours(0, 0, 0, 0);
    
    // refresh_token
    const expirationDaterefresh = new Date();
    expirationDaterefresh.setHours(0, 0, 0, 0);
    expirationDate.setTime(expirationDate.getTime() + (result as TokenGenerate).access_expired_at);
    expirationDaterefresh.setTime(expirationDaterefresh.getTime() + (result as TokenGenerate).refresh_expired_at - 60000);
    document.cookie = `access_token=${(result as TokenGenerate).access_token}; path=/; expires=${expirationDate.toUTCString()}`;
    document.cookie = `refresh_token=${(result as TokenGenerate).refresh_token}; path=/; expires=${expirationDaterefresh.toUTCString()}`;
    return true;
  }
  return false;
}

export default taskCookieUpdate;
