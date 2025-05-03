/**
 * src\services\handler\handlerButtonExit.ts
 */
import React from "react";

export function buttonExitF(): boolean {
  /**
    * The modal window has the 'display: none' property by default value.
    * Here we remove the style attribute  from modal window.\
    */
  const divHTml = document.getElementsByClassName("modal-window");
  /** GET THE HTML ELEMENT */
  if (divHTml.length === 0) {

    console.error("[handlerButtonExitFC]: The 'modal-window' class was not founded!");
    return false;
  }
  /** REMOVE THE STYLE */
  (divHTml[0] as HTMLDivElement).removeAttribute('style');
  return true;
}

export function handlerButtonExitFC(e: React.MouseEvent): boolean {
  if ((!e.type) || (
    (e.type && e.type.toLowerCase() !== 'click') ||
    (e.type.toLowerCase() === 'click' && !(
      (e.target as HTMLElement).className.toLowerCase().includes("modal-window_button__exit btn"))
    ))) {
    return false;
  }
  e.preventDefault();
  e.stopPropagation();
  const answerBool = buttonExitF();
  return answerBool;
}
