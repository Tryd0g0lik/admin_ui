import React from "react";

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
  // const target = (e.target as HTMLAnchorElement);
  // /** THE AUTO CHANGE BUTTON IS BELOW BY CLICK EVENT */
  // if (target.outerText.toLowerCase() === 'вход') {
  //   target.innerText = "Выход";
  // } else if (target.outerText.toLowerCase() === 'выход') {
  //   target.innerHTML = "Вход";
  // }

return true;
}
