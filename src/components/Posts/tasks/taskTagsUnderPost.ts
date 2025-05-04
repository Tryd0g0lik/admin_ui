/***
 * src\components\Posts\tasks\taskTagsUnderPost.ts
 */
import React from "react";
import { handlerfilterPostTags } from "src/components/Posts/handlers/handlerPostTags";
/** GET TYPE FRON  new Map()  */
type TypeMap = Map<number, HTMLElement[]>;

const taskHandlerClickByTag = (e: React.MouseEvent, 
  htmlelements: HTMLElement[], map: TypeMap, statusposts: unknown[]): boolean => {
  /** CLICK BY TAG FROM POST */
  /** BUTTON */
  const buttonHtml = document.querySelector("button.posts_button");

  if (buttonHtml && buttonHtml.textContent
    && buttonHtml.textContent.length > 0) {
    const result = handlerfilterPostTags(e);
    if (!result) {
      return false;
    }
    /** SAVE INITIAL HTML OF POSTS */
    htmlelements = [...result as HTMLElement[]];
    if (statusposts.length === htmlelements.length) {
      map.set(0, htmlelements);

    }

    /** RENAME BUTTON */
    if (!buttonHtml) {
      return false;
    }
    if (buttonHtml.textContent && buttonHtml.textContent.toLowerCase() === "загрузить") {
      buttonHtml.textContent = "Сбросить";
    };
    return true;
  }
  return false;
};

export default taskHandlerClickByTag;
