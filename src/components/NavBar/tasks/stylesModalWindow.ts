

async function taskChangeStylesOfModalWindow(): Promise<boolean> {
  /**
   * The modal window has the 'display: none' property by default value.
   * Here we get style of modal window and checnge style for public.
   * Plus, we adds the event listener the 'keydown' to the 'Enter' from an input field.
   * It is for returning the default style of modal window.
   */
  const divHTml = document.getElementsByClassName("modal-window");
  /** GET THE HTML ELEMENT */
  if (divHTml.length === 0 ) {
    console.error("[taskChangeStylesOfModalWindow]: The 'modal-window' class was not founded!");
    return false;
  }

  /** NEW HANDLER WILL ADD FOR THE EVENT CLICK ON THE BUTTON FROM THE FORM MODAL WINDOW */
  (divHTml[0] as HTMLDivElement).removeEventListener("keydown", newHandler);
  (divHTml[0] as HTMLDivElement).addEventListener("keydown", newHandler);
  /** CHNANGE OF THE STYLE */
  console.log(`TEST: CHNANGE OF THE STYLE`);
  (divHTml[0] as HTMLDivElement).style.display = "Flex";
  return true;
}
const newHandler = (e: KeyboardEvent): boolean => {
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
  /** SEND DATA TO THE BACK0END0 */


  return true;
};



export default taskChangeStylesOfModalWindow;
