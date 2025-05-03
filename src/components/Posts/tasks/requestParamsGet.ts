/**
 * src\components\Posts\tasks\requestPostGet.ts
 *This is the async function. Requst method GET.
 * Here we make request when we have only one url.
 * @param url 
 * @returns Promise<object>.
 */
const requestParamsGet = async (url: string): Promise<object> => {
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      return {};
    }
    const data = await response.json() as object;
    return data as object;
  } catch (error) {
    console.error(new Error(`[requestGetPosts]: Error ${error}`));
    return {};
  } 
};

export default requestParamsGet;
