import React from "react";
import { clearCoockie } from "src/services/cookies/clearCoockie";
/**
 * This handler is  listenning the click event by button \
 * from the <header> tag.\
 * Here is only chacnge thr text of button by click event.\
 * @param e : React.MouseClick- event object
 * @returns boolean
 */
export function handlerButtonLoginOut(e: React.MouseEvent): boolean {
  /* CHECK THE PALCE OF TARGET*/
  if ((!e.type) || (
    (e.type && e.type.toLowerCase() !== 'click') ||
    (e.type.toLowerCase() === 'click' && !(
      (e.target as HTMLElement).className.toLowerCase().includes("button__click"))
    ))) {
    return false;
  }
  e.stopPropagation();
  if ((e.target as HTMLElement).outerText.toLowerCase() === 'выход') {
    localStorage.removeItem('user');
    clearCoockie("access_token");
    clearCoockie("refresh_token");
    window.location.pathname = "/admin_ui/";
    return false;
  }
return true;
}
