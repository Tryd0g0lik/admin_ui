import { handlerRequstTokenGenerate } from "src/components/NavBar/hamdlers/handlerRequest";
import { handlerRequestTokenRefresh } from "src/components/NavBar/hamdlers/handlerRequestRefresh";
import { User, TokenGenerate } from "src/interfesaces";
import taskCookieUpdate from "./cookieUpdate";

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
  const count = 0;
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

async function taskRequestToServer(userstate: User) {
  if (userstate["email"].length > 0 && userstate["email"].length > 0) {
    /**
     * Получаем userstate - состояние пользователя
     * Если аноним то часть менб скрыто
     * Если админ то все меню открыто
     * остальных не трогаем пока
     * 
     * ++ Обработчик нажатия кнопки входа
     */
    /**
     * Search the tokens in cookie.
     */
    let result: boolean | TokenGenerate | string = checkLiveOfCoockie();
    if (typeof result === 'boolean' && !result) {
      result = await handlerRequstTokenGenerate({ ...userstate }) as TokenGenerate;
      // Updats of cookie from data of Token - Generate.
      if ((result as TokenGenerate).access_expired_at > 0) {
        taskCookieUpdate(result as TokenGenerate);
        console.log('Вы вошли в систему', userstate["status"]);
      } else {
        /* These are incorrect tokens. Repeat the request. */
        console.error("[taskRequestToServer]: Error. Somethins what wrong to the generate's tokens!");
        setTimeout(() => taskRequestToServer(userstate), 600000);
      }

    } else if (typeof result === 'string') {
      /** The 'refresh_token' we is founded in the cookie. Now we neew to send the 'refresh_token' to the server and upgrade
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
        console.log('Вы вошли в систему', userstate["status"]);
      } else {
        /* These are incorrect tokens. Repeat the request. */
        console.error("[taskRequestToServer]: Error. Somethins what wrong to the refresh tokens!");
        setTimeout(() => taskRequestToServer(userstate), 60000);
      }
    }
  } else {
    console.log('Вы не вошли в систему');
  }
}

export default taskRequestToServer;
