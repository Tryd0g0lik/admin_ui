/**
 * src\components\Posts\handlers\handlerPostTags.ts
 */
import React from "react";
let divArrCopy = [];
export function handlerfilterPostTags(e: React.MouseEvent): HTMLElement[] |boolean {
  if ((!e.type) || (
    e.type && e.type.toLowerCase() !== "mousedown"
  ) || (
    e.type.toLowerCase() === "mousedown" && (
      !(e.target as HTMLElement).className.includes("tag-name")    
  ))) {
    return false;
  }
  e.stopPropagation();
  /* GET TEXT OF TAG */
  const targetText = typeof ((e.target as HTMLElement).textContent) === "string" ? (e.target as HTMLElement).textContent?.toLowerCase() : "";
  /** GET ALL POSTS */
  const divArr = document.getElementsByClassName("chat-start") as HTMLCollectionOf<HTMLDivElement>;
  if (divArr.length === 0) {
    return false;
  }
  divArrCopy = [...divArr as HTMLCollection];
  /** FILTER POST BY TEXT OF TAG */
  const divPostsHtmlArr = document.getElementsByClassName("posts_post");
  if (divPostsHtmlArr.length === 0) {
    return false;
  } else{
    divPostsHtmlArr[0].innerHTML = "";
  }
  const oldInnerHTML = divPostsHtmlArr[0];
  Array.from(divArrCopy).forEach((item): void | boolean => {
    const spanHtmlArr = item.querySelectorAll("div.tag-names span");
    if (spanHtmlArr.length === 0) {
      return false;
    }
    for (let ind = 0; ind < spanHtmlArr.length; ind++) {
      if ((spanHtmlArr[ind] as HTMLElement).textContent?.toLowerCase().includes(targetText as string)) {
        oldInnerHTML.insertAdjacentElement("beforeend", item);
        
      }
      
    }
    return true;
  } );
  return divArrCopy as HTMLElement[];
}
