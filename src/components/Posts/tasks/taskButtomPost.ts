/**
 * src\components\Posts\tasks\taskButtomPost.ts
 */
import React from "react";
import { handlerButtonRequest } from "src/components/Posts/handlers/handlerRequest";
/** GET TYPE FRON  new Map()  */
type TypeMap = Map<number, HTMLElement[]>;

/* TASK FOR BUTTMON CLICKED */
const taskHandlerButton = (e: React.MouseEvent, 
  calback: CallableFunction,
  map: TypeMap) => {
  handlerButtonRequest(e, calback);
  /*** CLICK BY BUTTON "Загрузить", "Сбросить" */
  /** TARGET */
  const target = e.target as HTMLButtonElement;
  if (target.textContent && target.textContent.length > 0 && target.textContent.toLowerCase() === "сбросить") {
    // document.location.pathname = "/posts/";
    /** FILTER POST BY TEXT OF TAG */
    const divPostsHtmlArr = document.getElementsByClassName("posts_post");
    if (divPostsHtmlArr.length === 0) {
      return false;
    } else {
      divPostsHtmlArr[0].innerHTML = "";
    }
    /*** RESETTING INITIAL POSTS */
    Array.from(map.get(0) as HTMLElement[]).forEach((item) => {

      // for (let ind = 0; ind < divPostsHtmlArr.length; ind++) {
      divPostsHtmlArr[0].insertAdjacentElement("beforeend", (item as HTMLElement));
      // }
    });
    map.clear();
    /** RENAME BUTTON */
    if (target.textContent && target.textContent.toLowerCase() === "сбросить") {
      target.textContent = "Загрузить";
    };
    return true;
  }
  return false;
};
export default taskHandlerButton;
