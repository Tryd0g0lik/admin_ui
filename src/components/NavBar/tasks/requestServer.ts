import { handlerRequstTokenGenerate } from "src/components/NavBar/hamdlers/handlerRequest";
import { handlerRequestTokenRefresh } from "src/components/NavBar/hamdlers/handlerRequestRefresh";
import { User, TokenGenerate } from "src/interfesaces";
import taskCookieUpdate from "./cookieUpdate";
import { UserStatus, UserPrivaleges } from "src/interfesaces";

// let LiveInterval: NodeJS.Timeout;
// async function handlerRequstTokenRefresh() {
//   const result = await handlerRequstTokenGenerate({ ...userstate });
// };

/**
   * This function look the 'access_token=' substring in to the cookie.\
   * If return true - this means that we have an 'access_token=' in to the cookie.\
   * If return false - this means than we don not have the 'access_token=' and 'refresh_token=' in cookie.
   * If return string - this means that we have only 'refresh_token=' in cookie and returned the value.
   */
function checkLiveOfCoockie() {
  
  const cookies: string[] = document.cookie.split(';');
  let accessToken;
  /* Checking the 'access_token=' substring. */
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].trim() && (cookies[i].trim()).startsWith("access_token=")) {
      /** If we received the 'access_token=' It is mean that break the cycle */
      return true;
    }
  }
  /** If we not received the 'access_token=' This means that we need to start to searching  the 'refresh_token=' substring */
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("refresh_token=")) {
      accessToken = cookie.substring("refresh_token=".length - 1);
      return accessToken;
    }
  }
  return false;
}

/**
 * 
 * @param userstate - This is the object with user's data. It must have all properties of single user.
 * Properties of template is ```json
 * {
  "email": string,
  "password": string,
  "status": number,
  "privaleges": number,
  "token": string
}
  ```
 * @returns false if we the userstate not updated. or new_userstate.;
 */
async function taskRequestToServer(userstate: User): Promise<User | boolean> {
  const new_userstate = Object.assign({}, userstate);
  // if (userstate["email"].length > 0 && userstate["email"].length > 0) {
  /** SEARCH THE TOKENS IN COOKIE. */
    let result: boolean | TokenGenerate | string = checkLiveOfCoockie();
  if (userstate["email"].length > 0 && userstate["email"].length > 0 &&
    typeof result === 'boolean' && !result) {
    /** The 'access_token' and 'refresh_token' are not founded in the cookie. 
     * Now we neew to send the email and password to the server and receive the data ```json
   **/
    /** Clearing the LS */
    localStorage.removeItem("user");
  /** Sending the request (by generate token ) to the server and receiving the tokens. */
      result = await handlerRequstTokenGenerate({ ...userstate }) as TokenGenerate;
      // Updats of cookie from data of Token - Generate.
      if ((result as TokenGenerate).access_expired_at > 0) {
        taskCookieUpdate(result as TokenGenerate);
        /** Update the user properties */
        new_userstate.email = "";
        new_userstate.password = "";
        new_userstate.privaleges = [UserPrivaleges.PRIVALEGES_SUPER_ADMIN];
        new_userstate.status = UserStatus.STATUS_SUPER_ADMIN;
        console.log('Вы вошли в систему', new_userstate["status"]);
        return new_userstate;
      } else {
        /* These are incorrect tokens. Repeat the request. */
        console.error("[taskRequestToServer]: Error. Somethins what wrong to the generate's tokens!");
        setTimeout(() => taskRequestToServer(userstate), 600000);
        new_userstate.email = "";
        new_userstate.password = "";
        new_userstate.privaleges = [UserPrivaleges.PRIVALEGES_ANONYMOUS];
        new_userstate.status = UserStatus.STATUS_ANONYMOUSUSER;
        console.log('Вы не вошли в систему', new_userstate["status"]);
        return new_userstate;
      }

    } else if (typeof result === 'string') {
      /** The 'refresh_token' toke we founded in the cookie.\
       *  Now we neew to send the 'refresh_token'  token to the server and upgrade
       * the data ```json
        {
          "access_token": string,
          "refresh_token": string,
          "access_expired_at": number,
          "refresh_expired_at": number
        }
        ```
       */
      result = await handlerRequestTokenRefresh({ refresh_token: result }) as TokenGenerate;
      if ((result as TokenGenerate).access_expired_at > 0) {
        // Updats of cookie from data of Token - Refresh.
        taskCookieUpdate(result as TokenGenerate);
        /** Update the user properties */
        new_userstate.email = "";
        new_userstate.password = "";
        new_userstate.privaleges = [UserPrivaleges.PRIVALEGES_SUPER_ADMIN];
        new_userstate.status = UserStatus.STATUS_SUPER_ADMIN;
        console.log('Вы вошли в систему', new_userstate["status"]);

        return new_userstate;
      } else {
        /* These are incorrect tokens. Repeat the request. */
        console.error("[taskRequestToServer]: Error. Somethins what wrong to the refresh tokens!");
        setTimeout(() => taskRequestToServer(userstate), 60000);
        new_userstate.email = "";
        new_userstate.password = "";
        new_userstate.privaleges = [UserPrivaleges.PRIVALEGES_ANONYMOUS];
        new_userstate.status = UserStatus.STATUS_ANONYMOUSUSER;
        console.log('Вы не вошли в систему', new_userstate["status"]);
        return new_userstate;
      }
  } else {
    console.log('Вы не вошли в систему');
  }
  return false;
}

export default taskRequestToServer;
