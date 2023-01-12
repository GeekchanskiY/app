import { server_url } from "../app/constants";
import store from "../app/store";
import check_login from "./check_login";

export default async function dislike_request(restaurant){
    if (await check_login()){
        const jwt_state = store.getState().jwt
        const url = server_url + "/api/users/dislike/"
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+jwt_state.token
            },
            body: JSON.stringify({
                name: restaurant
            })
        };
        
        const response = await fetch(url, requestOptions)
        const data = await response.json()
            
        if (response.status == 200) {
            console.log("REQUEST SUCCESS")
            return true
            
        } else {
            console.error("REQUEST ERROR")
            console.error(data)
            return false
        }
    } else {
        return false
    }
}