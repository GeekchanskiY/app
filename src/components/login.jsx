import "../styles/login.scss"

import login_request from "../requests/login"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { auth } from "../app/jwtslice"
import { useSelector } from "react-redux"

import check_login from "../requests/check_login"

export default function LoginForm(){
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const jwt_state = useSelector((state) => state.jwt)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const try_login =  async () => {
        let now = new Date()
        let response = await login_request(login, password)
        console.log(response)
        if (response.detail !== undefined){
            document.getElementById("error").innerText = "Такого вкуснокушателя не существует!"
            return
        }
        let data = {
            authentificated: true,
            token: response.access,
            expires_in: new Date(now.getTime() + (5 * 60 * 1000)).toString(),
            refresh: response.refresh 
        }
        dispatch(auth(data))
        navigate('/user')
    }
    const init = async () => {
        if (await check_login() == true){
            navigate('/user')
        }
    }
    useEffect(() => {
        init()
    }, [])

    return <div className="logregform">
        <h3>Войти</h3>
        <span id="error"></span><br />
        <input type="text" value={login} onChange={(e) => {setLogin(e.target.value)}} name="" id="" /><br />
        <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} /><br />
        <input type="button" value="Войти" onClick={(e) => {try_login()}}/>
    </div>
}