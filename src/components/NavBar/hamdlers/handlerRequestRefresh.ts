/*
src\components\NavBar\hamdlers\handlerRequestRefresh.ts
*/
type RefreshTokenProps = { refresh_token: string };
import { resultEmty } from "./handlerRequest";
import { TokenGenerate } from "src/interfesaces";

export async function handlerRequestTokenRefresh(props: RefreshTokenProps): Promise<TokenGenerate> {
  /**
   * Token Refresh \
   * Here, data of formt - sending to the serverand some tokens are recived back.
   */
  const { refresh_token } = props;
  /** CREATE DATA OF FORM */
  const formData = new FormData();
  formData.append('refresh_token', refresh_token);
  try{
    const response = await fetch("https://rest-test.machineheads.ru/auth/token-refresh", {
      method: 'POST',
      body: formData
    });
    if (response.status !== 200){
      return resultEmty;
    }
    const result = response.json();
    return result;
  }catch (error){
    console.log(`[handlerRequestTokenRefresh]: Error of REQUEST: ${error}`);
  }
  return resultEmty;
}
