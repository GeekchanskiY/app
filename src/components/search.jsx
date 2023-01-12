import { useSelector } from "react-redux"
import { server_url } from "../app/constants"
import { Link } from "react-router-dom";
import "../styles/search.scss"
import StarRatings from 'react-star-ratings';

function SearchItem(props){
    return <div className="searchitem">
        <span className="country">{props.data.country.name} кухня</span>
        <hr />
        <img src={server_url+props.data.main_picture} alt="" />
        <div className="detail">
            <Link to={'/restaurant/'+props.data.name}>{props.data.name}</Link><br />
            <span className="data">Время работы: {props.data.work_time}</span><br />
            <span className="data">Место: {props.data.place}</span><br />
            <span className="data">Контакты: {props.data.contacts}</span><br />
            <StarRatings starDimension="3vh" starSpacing="1px" starRatedColor="red" rating={props.data.rating/2} numberOfStars={5}></StarRatings>
        </div>
    </div>
}

export default function Search(){
    const search_state = useSelector((state) => state.search)

    if (search_state.data == null){
        return <div>Соответствующих запросу результатов не найдено</div>
    }
    return <div className="SearchList">
        {search_state.data.length == 0 ? <span>результатов не найдено</span> : ""}
        {search_state.data.map((el, index) => {return <SearchItem data={el} key={"search"+index} />})}
        
    </div>
}