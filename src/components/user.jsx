import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { refresh, auth } from "../app/jwtslice"
import { set } from "../app/userslice"
import { useNavigate } from "react-router-dom"
import check_login from "../requests/check_login"
import user_data_request from "../requests/user_data"
import change_avatar_request from "../requests/upload_avatar"
import "../styles/user.scss"
import change_password_request from "../requests/change_password"
import { Link } from "react-router-dom"
import { server_url } from "../app/constants"
import store from "../app/store"
import { logout } from "../app/jwtslice"



export function logout_action(){
    localStorage.removeItem('auth')
    store.dispatch(set({
        username: null,
        userid: null,
        userimg: null
    }))
    store.dispatch(logout())

}

export default function UserData(){
    const jwt_state = useSelector((state) => state.jwt)
    const user_state = useSelector((state) => state.user)
    const navigate = useNavigate()

    const [old_password, setOldPass] = useState('')
    const [new_password, setNewPass] = useState('')
    const [confirm_password, setConfirmPass] = useState('')
    const [avatar, changeAvatar] = useState(null)
    const [udata, setUData] = useState({likes: []})

    const init = async () => {
        check_login();
        if (jwt_state.authentificated === false){
            navigate('/login')
            return
        }
        get_data()
    }

    useEffect(() => {
        init()
    }, [])

    const get_data = async () => {
        let data = await user_data_request()
        setUData(data)
    }

    const change_avatar = async () => {
        await change_avatar_request(avatar[0])
        await user_data_request()
    }
    const change_password = async () => {
        let status_span = document.getElementById("password_error")
        if (old_password == new_password){
            status_span.innerText = "Old and new passwords must be different"
            return
        }
        if (new_password != confirm_password){
            status_span.innerText = "Confirm password does not match"
            return
        }

        await change_password_request(new_password)
        
        status_span.innerText = "Пароль успешно изменен!"

    }

    if (user_state.username === null){
        return <h3>Data is loading</h3>
    }
    return <div className="user">
         <h3>Добро пожаловать, {user_state.username}</h3>
         <img src={user_state.userimg} alt="" /> <br />
         <input type="file" onChange={(e) => {changeAvatar(e.target.files)}}/> <input type="button" value="Обновить аватар" onClick={(e) => {change_avatar()}}/>
          <br /> <hr />
         
         <h4>Измените пароль</h4>
         <span id="password_error"></span> <br />
         <span className="password_hint">Старый пароль</span> <br />
         <input type="password" name="" id="" value={old_password} onChange={(e) => {setOldPass(e.target.value)}}/> <br /> <br />
         <span className="password_hint">Новый пароль</span> <br />
         <input type="password" name="" id="" value={new_password} onChange={(e) => {setNewPass(e.target.value)}}/> <br />
         <span className="password_hint">Подтвердите пароль</span> <br />
         <input type="password" name="" id="" value={confirm_password} onChange={(e) => {setConfirmPass(e.target.value)}}/> <br />
         <input type="button" value="Изменить пароль" onClick={(e)=> {change_password()}}/> <br />
         <h4>Вам понравилось:</h4>
        {udata !== null ? udata.likes.map((like, index) => {
            return <div className="like" key={"like"+index}>
                <img src={server_url+like.main_picture} alt="" /> <br />
                <Link to={"/restaurant/"+like.name}>{like.name}</Link>
            </div>
        }) : "Данные загружаются..."}

        <br /><br /><br />
        <button onClick={(e) => {logout_action(); navigate("/")}}>Выйти</button>
    </div>
}