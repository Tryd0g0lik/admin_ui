/**
 * src\components\NavBar\tasks\stylesModalWindow.ts
 */
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

  /** CHNANGE OF THE STYLE */
  console.log(`TEST: CHNANGE OF THE STYLE`);
  (divHTml[0] as HTMLDivElement).style.display = "Flex";
  return true;
}

export default taskChangeStylesOfModalWindow;
