import restaurants_img from "../img/restaurants.png";
import other_img from "../img/other.png";
import cafe_img from "../img/cafe.png"

import { Link } from "react-router-dom";
import "../styles/index.scss"
import { useNavigate } from "react-router-dom";
import { set_result } from "../app/searchSlice";
import { useDispatch } from "react-redux";
import { restaurant_search_request } from "../requests/get_restaurant";


export default function IndexPage(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const search_cafe = async () => {
        let data = await restaurant_search_request(null, null, "Cafe")
        dispatch(set_result(data))
        navigate('/search')
    }
    const search_restaurant = async () => {
        let data = await restaurant_search_request(null, null, "Restaurant")
        dispatch(set_result(data))
        navigate('/search')
        
    }
    const search_other = async () => {
        let data = await restaurant_search_request(null, null, null)
        dispatch(set_result(data))
        navigate('/search')
    }


    return <div className="indexchoices">
        <div className="choice indexchoice1" onClick={() => {search_cafe()}}>
            <img src={cafe_img} alt="" /><br />
            <span>Кафе</span>
        </div>
        <div className="choice indexchoice2" onClick={() => {search_restaurant()}}>
            <span>Рестораны</span> <br />
            <img src={restaurants_img} alt="" />
            
        </div>
        <div className="choice indexchoice3" onClick={() => {search_other()}}>
            <img src={other_img} alt="" /><br />
            <span>Другие места</span>
        </div>
    </div>
}