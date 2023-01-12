import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { restaurant_data_request } from "../requests/get_restaurant"
import "../styles/restaurant.scss"
import StarRatings from 'react-star-ratings';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import comment_request from "../requests/send_review";

import check_like_request from "../requests/check_like";
import like_request from "../requests/like";
import dislike_request from "../requests/dislike";

import like_img from "../img/like.png"
import dislike_img from "../img/not_like.png"


export default function Restaurant(){
    const { name } = useParams()
    const jwt_state = useSelector((state) => state.jwt)
    const [liked, setLiked] = useState(false)
    const [restaurant, setRestaurant] = useState(null)
    const load_data = async () => {
        let data = await restaurant_data_request(name)
        if (data.error == undefined){
            setRestaurant(data)
        } else {
            console.log(data)
        }

        if (jwt_state.authentificated === true){
            let data = await check_like_request(name)
            
            setLiked(data)
        }
        
    }
    const [user_rating, changeUserRating] = useState(5)

    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [error, setError] = useState("")


    const sendReview = async () => {
        if (title == ""){
            setError("Заголовок не может быть пустым!")
            return
        }
        if (text == ""){
            setError("Расскижите нам подробнее о ваших впечатлениях!")
            return
        }

        let data = comment_request(restaurant.id, title, text, user_rating)
        console.log(data)

    }

    useEffect(()=>{
        load_data()
    },[])

    if (restaurant == null){
        return <div>{name} loading...</div>
    }

    const like = async () => {
        let like_res = await like_request(name)
        setLiked(!liked)
    }
    const dislike = async () => {
        let like_res = await dislike_request(name)
        setLiked(!liked)
    }
      

    return <div className="restaurant">
        <h1 className="name">{name}</h1> <br />
        {jwt_state.authentificated === true ? <div>
            {liked !== true ? <button className="Likebtn" onClick={(e)=>{like()}}> <img src={dislike_img} alt="" /> </button> : <button className="Likebtn" onClick={(e)=>{dislike()}}><img src={like_img} alt="" /></button>}
            
        </div> : <Link to={'/login'}>Вы должны войти чтобы добавить в понравившееся!</Link>}
        <br />
        <br />
        <img src={restaurant.main_picture} alt="" /> <br />
        <h3>Описание</h3>
        <span>{restaurant.country.name} кухня в {restaurant.place}</span>
        <p>{restaurant.description}</p>

        <h3>Отзывы</h3>
        <div className="reviews">
            {restaurant.reviews.map((review, index) => {
                return <div className="review" key={"review"+index}>
                    <div className="reviewintro">
                        <span className="username">{review.user.username}</span> <br />
                        <img src={review.user.avatar} alt="" />
                    </div>
                    <div className="reviewotro">
                    <h3>{review.title}</h3>
                    <p>{review.text}</p>
                    <StarRatings starDimension="3vh" starSpacing="1px" starRatedColor="red" rating={review.rating/2} numberOfStars={5}></StarRatings>
               
                    </div>
                    
                    </div>
            })}
        </div>
        <div className="sendreview">
        <h3>Оставить отзыв</h3>
        {jwt_state.authentificated === true ? <div>
            <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}} /><br />
            <input type="text" value={text} onChange={(e) => {setText(e.target.value)}} /><br />
            <StarRatings starRatedColor="red" starDimension="3vh" starSpacing="1px" changeRating={changeUserRating} rating={user_rating} numberOfStars={5}></StarRatings><br />
            <input type="button" value="Отправить отзыв!" onClick={(e) => {sendReview()}}/>
        </div> : <Link to={'/login'}>Вы должны войти чтобы оставить отзыв!</Link>}
         </div>
        
    </div>
}