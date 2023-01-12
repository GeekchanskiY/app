import store from "../app/store";

import { set } from "../app/userslice";

import { server_url } from "../app/constants";

import check_login from "./check_login";


export default async function user_data_request(){
    if (await check_login() !== true){
        return {"error": "login failed"}
    }
    const jwt_state = store.getState().jwt

    const url = server_url + "/api/users/me/"
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+jwt_state.token
    },
        
    };
    const response = await fetch(url, requestOptions)
    const data = await response.json()
    if (response.ok){
        console.log("USER DATA REQUEST SUCCESS")
        console.log(data)
        store.dispatch(set({
            userid: data.id,
            username: data.username,
            img: server_url+data.avatar
        }))
        return data
    } else {
        console.error("USER DATA REQUEST ERROR")
        console.error(data)
        return {error: data}   
    }
}