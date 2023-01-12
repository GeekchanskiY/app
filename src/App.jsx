import { Provider } from 'react-redux'
import store from './app/store'
import React, { useState } from 'react';
import {Routes, Route, Link, useNavigate} from "react-router-dom";


import "./styles/main.scss"
import logo from './img/logo.png'
import search from './img/search.png'


import LoginForm from './components/login';
import UserData from './components/user';
import PageNotFound from './components/notfound';
import IndexPage from './components';
import Restaurant from './components/restaurant';
import Search from './components/search';
import Register from './components/register';



import { restaurant_search_request } from './requests/get_restaurant';



function App() {
  const [search_text, setSearch] = useState('')
  const navigate = useNavigate()

  const search_func = async () => {
    console.log("searching")
    let data = await restaurant_search_request(search_text, null, null)
    navigate("/search")
  }

  return (
    <Provider store={store}>
      <div className="App">
        <header>
          <div className="headermain">
            <div className="headername" onClick={() => {navigate("/")}}>
                <span className="vkusno">Вкусно</span>
                <span className="kushat">Кушать</span>
            </div>
            <div className="headersearch">
              <input type="text" placeholder="search" value={search_text} onChange={(e) => {setSearch(e.target.value)}}/>
              <img src={search} alt="search" onClick={()=> {search_func()}}/>
            </div>
          </div>
          <div className="headergrey">
            <Link to={"/"}>
              <img src={logo} alt="Vkusnokushat" />
            </Link>
              
          </div>
        </header>
        <div className="body">
          <Routes>
            <Route path='/' element={<IndexPage/>}/>
            <Route path='/login' element={<LoginForm/>}/>
            <Route path='/user' element={<UserData/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/restaurant/:name' element={<Restaurant/>}/>
            <Route path='*' element={<PageNotFound/>}/>
          </Routes>
        </div>
        <footer>
          <Link to={'/register'}>Регистрация</Link>
          <Link>Соц.Сети</Link>
          <Link>О Нас</Link>
          <Link to={"/login"}>Вход</Link>
        </footer>
      </div>
    </Provider>
  );
}

export default App;
