import React from "react";
import { initialState } from "src/reduxes/features/userstate/userSlice";
export function handlerInputFileds(setuserdata: CallableFunction){
  return (e: React.KeyboardEvent): boolean => {
    if (!e.type || (
      (e.type?.toLowerCase() !== 'keydown') || (
        e.type.toLowerCase() === 'keydown' && !(
          e.key
        ) || (e.type.toLowerCase() === 'keydown' && (
          e.key.toLowerCase() !== 'enter'
        )
        )
      ))) {
      console.error("[newHandler]: The 'keydown' event has incorrect type!");
      return false;
    }
    /** GET THE INPUT FIELD AND GET THE DATA FROM INPUT FIELD */
    const inputDataEmail = ((document.getElementsByClassName("form-input_email__inser") as HTMLCollectionOf<HTMLInputElement>)[0]);
    const inputDataPassword = ((document.getElementsByClassName("form__input_password__inser") as HTMLCollectionOf<HTMLInputElement>)[0]);
    if ((inputDataEmail.value as string).length === 0 || (inputDataPassword.value as string).length === 0) {
      console.error("[newHandler]: The input field is empty!");
      return false;
    }
    /* VALIDATE FOR INPUT FIELDS */
    const validatorEmailMaessagehtml = document.querySelector("div.validator-hint.hidden");
    if (!validatorEmailMaessagehtml) {
      console.error("[newHandler]: The validator message HTML element was not founded!");
      return false;
    } else {
      /** SET DEFAULT STYLE FOR THE VALIDATOR MESSAGE HTML ELEMENT */
      (validatorEmailMaessagehtml as HTMLDivElement).style.display = "none";
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))[\w\d]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(inputDataEmail.value).toLowerCase())) {
      /** SET NEW STYLE FOR THE VALIDATOR MESSAGE HTML ELEMENT */
      (validatorEmailMaessagehtml as HTMLDivElement).style.display = "block";
      return false;
    }
    /** CHANGE THE setUserData FROM MainFC COMPONENT */
    initialState['email'] = inputDataEmail.value;
    initialState['password'] = inputDataPassword.value;
    setuserdata(initialState);
    return true;
  };
}
