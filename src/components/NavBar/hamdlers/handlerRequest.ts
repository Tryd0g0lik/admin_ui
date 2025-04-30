import {User} from "src/interfesaces";

export async function handlerRequstTokenGenerate(props: User): Promise<void>{
  const {email, password} = {...props};
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  const response = await fetch("https://rest-test.machineheads.ru/auth/token-generate", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
 const result = await response.json();
 console.log(`RESULT REQUEST: ${result}`);
}
