import store from "../app/store";
import { set } from "../app/userslice";
import { server_url } from "../app/constants";
import check_login from "./check_login";

export default async function change_avatar_request(file){
    
    if (await check_login()){
        const jwt_state = store.getState().jwt
        const url = server_url + "/api/users/change_avatar/"
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Disposition': 'attachment; filename="'+ file.name +'"',
                'Authorization': 'Bearer '+jwt_state.token
        },
            body: file
            
        };
        const response = await fetch(url, requestOptions)
        const data = await response.json()
        if (response.ok){
            console.log("USER AVATAR REQUEST SUCCESS")
            
            return data
        } else {
            console.error("USER AVATAR REQUEST ERROR")
            console.error(data)
            return false 
        }
    } else {
        return false
    }

}