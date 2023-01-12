import { server_url } from "../app/constants";
import store from "../app/store";
import check_login from "./check_login";

export default async function change_password_request(password){
    if (await check_login()){
        const jwt_state = store.getState().jwt
        const url = server_url + "/api/users/change_password/"
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+jwt_state.token
            },
            body: JSON.stringify({
                password: password,
            })
        };
        
        const response = await fetch(url, requestOptions)
        const data = await response.json()
            
        if (response.status == 200) {
            console.log("CHANGE PASSWORD REQUEST SUCCESS")
            return true
            
        } else {
            console.error("CHANGE PASSWORD REQUEST ERROR")
            console.error(data)
            return false
        }
    } else {
        return false
    }
}