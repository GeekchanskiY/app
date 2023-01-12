import { useEffect, useState } from "react"
import register_request from "../requests/register"
import login_request from "../requests/login"
import { auth } from "../app/jwtslice"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import "../styles/register.scss"

export default function Register(){
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [confirm_password, setConfirmPassoword] = useState("")
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const reg = async () => {
        let now = new Date()
        if (password !== confirm_password){
            setError("Пароли не совпадают!")
            return
        }

        let r1 = await register_request(username, password)
        if (r1.error !== undefined){
            setError(r1.error)
            return
        }
        let r2 = await login_request(username, password)
        if (r2.error !== undefined){
            setError(r2.error)
        }
        let data = {
            authentificated: true,
            token: r2.access,
            expires_in: new Date(now.getTime() + (5 * 60 * 1000)).toString(),
            refresh: r2.refresh 
        }
        dispatch(auth(data))
        navigate('/user')
    }

    useEffect(()=>{
    }, [])
    return <div className="register">
        <h3>Регистрация</h3>
        <span className="error">{error}</span> <br />
        <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder="Ваше имя на сайте"/> <br />
        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Пароль"/> <br />
        <input type="password" value={confirm_password} onChange={(e)=>{setConfirmPassoword(e.target.value)}} name="" id="" placeholder="Подтвердите пароль"/> <br />
        <input type="button" value="Зарегистрироваться" onClick={()=>{reg()}}/>
    </div>
}