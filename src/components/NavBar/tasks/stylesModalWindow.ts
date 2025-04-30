

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
const newHandler = (e: KeyboardEvent): void => {
  if (!e.type || (
    (e.type?.toLowerCase() !== 'keydown') || (
      e.type.toLowerCase() === 'keydown' && (
        null
      )
    )
  )){
    null;
  }
};

export default taskChangeStylesOfModalWindow;
