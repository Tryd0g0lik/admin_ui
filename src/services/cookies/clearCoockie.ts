/**
 * src\services\cookies\clearCoockie.ts
 * This is a function that removes a cookie from the browser.
 * @param key_name 
 * @returns 
 */
export function clearCoockie(key_name: string){
  const cookies: string[] = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${key_name}`)) {
      document.cookie = `${key_name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      return true;
    }

  }
  return false;
}
