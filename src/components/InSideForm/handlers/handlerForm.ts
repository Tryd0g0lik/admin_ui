import React from "react";

import { User } from "src/interfesaces";

export function handlerInputFileds(e: React.KeyboardEvent, setuserdata: CallableFunction, usestate: User): boolean | User {
  /**
   * This is the handler for the input fields.
   * @param e : React.KeyboardEvent
   * @param setuserdata : CallableFunction. It is callback from the useState of React.
   * @return boolean.
   */
  // const storeuserstate = useSelector((state: RootState) => state.userstate);
  const user: User = Object.assign({}, usestate);
    if (!e.type || (
      (e.type && e.type.toLowerCase() !== 'keydown') || (
        e.type.toLowerCase() === 'keydown' && !(
          e.key
        ) || (e.type.toLowerCase() === 'keydown' && (
          e.key.toLowerCase() !== 'enter'
        )
        )
      ))) {
      console.warn("[newHahandlerInputFiledsndler]: The 'keydown' event has incorrect type!");
      return false;
    }
  try {
    /** GET THE INPUT FIELD AND GET THE DATA FROM INPUT FIELD */
    const inputDataEmail = ((document.getElementsByClassName("form-input_email__inser") as HTMLCollectionOf<HTMLInputElement>)[0]);
    const inputDataPassword = ((document.getElementsByClassName("form__input_password__inser") as HTMLCollectionOf<HTMLInputElement>)[0]);
    if ((inputDataEmail.value as string).length === 0 || (inputDataPassword.value as string).length === 0) {
      console.error("[handlerInputFileds]: The input field is empty!");
      return false;
    }
    /* VALIDATE FOR INPUT FIELDS */
    const validatorEmailMaessagehtml = document.querySelector("div.validator-hint.hidden");
    if (!validatorEmailMaessagehtml) {
      console.error("[handlerInputFileds]: The validator message HTML element was not founded!");
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
    user['email'] = inputDataEmail.value;
    user['password'] = inputDataPassword.value;
    if (setuserdata && typeof setuserdata === 'function') {
      (setuserdata as (user: User) => void)(user);
      return user;
    } else {
      console.error("[handlerInputFileds]: The callback from useState is not defined!");
      return false;
    }
  } catch (error) {
    console.error("[handlerInputFileds]: ", error);
    return false;
  }
  };
