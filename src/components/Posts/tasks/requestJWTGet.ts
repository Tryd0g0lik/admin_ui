/**
 * src\components\Posts\tasks\requestJWTGet.ts
 * */
/* 
This is async function for fetch the api request with 'Bearer token'.
 * @param url : string | URL.
 * @param token : string.
 * @returns object
 */
const requestJWTGet = async (url: string | URL, token: string): Promise<object>=> {
  try{
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` },
  };
  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    console.error(new Error(`[requestJWTGet]: Error-statusText: ${response.statusText}`));
    return {};
  }
    const data = await response.json() as object;
    return data as object;
  } catch (error) {
    console.error(new Error(`[requestJWTGet]: Error ${error}`));
    return {};
  }
};
export default requestJWTGet;
