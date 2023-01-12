import { server_url } from "../app/constants";

export default async function login_request(login, password){
    const url = server_url + "/api/auth/token/"
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: login,
            password: password
        })
      };
      const response = await fetch(url, requestOptions)
      
     
      if (response.status === 200){
        const data = await response.json()
        return data
      } else {
        console.error("Login failed")
        const data = await response.json()
        return data
      }
    
}