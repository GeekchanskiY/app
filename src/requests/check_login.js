import { useSelector } from "react-redux"
import store from "../app/store"
import { server_url } from "../app/constants"
import { refresh } from "../app/jwtslice"
import login_request from "./login"
import { auth } from "../app/jwtslice"

export default async function check_login(){
    const jwt_state = store.getState().jwt
    let now = new Date()
    
    if (jwt_state.authentificated !== true){
        const auths = localStorage.getItem('auth')
        if (auths != undefined){
            const data = JSON.parse(auths)
            store.dispatch(auth(data))
            return check_login()
        } else {
            return false;
        }
    } 

    let expires = new Date(jwt_state.expires_in)
    if (now.getTime() > expires.getTime()){
        const url = server_url + "/api/auth/token/refresh/"
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                refresh: jwt_state.refresh_token,
            })
        };
        const response = await fetch(url, requestOptions)
        const data = await response.json()
        if (data.access != undefined) { 
            console.log("TOKEN REFRESHED")
            store.dispatch(refresh({
                token: data.access,
                expires_in: new Date(now.getTime() + (5 * 60 * 1000)).toString()
            }))
            return true
        } else {
            console.error("TOKEN REFRESH ERROR")
            console.error(data)
            return false
        }
        
    } else {
        return true
    }
}