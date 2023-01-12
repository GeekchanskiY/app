import store from "../app/store";

import { set } from "../app/userslice";

import { server_url } from "../app/constants";

import { set_result } from "../app/searchSlice";

import check_login from "./check_login";

export async function restaurant_data_request(name){


    const url = server_url + "/api/restaurants/" + name
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
    },
        
    };
    const response = await fetch(url, requestOptions)
    const data = await response.json()
    if (response.ok){
        console.log("GET REQUEST SUCCESS")
        console.log(data)
        
        return data
    } else {
        console.error("GET REQUEST ERROR")
        console.error(data)
        return {error: data}   
    }
}

export async function restaurant_search_request(name, country, category){

    const url = server_url + "/api/restaurants/search/"
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: name,
        country: country,
        category: category       
    })
    };
    const response = await fetch(url, requestOptions)
    const data = await response.json()
    if (response.ok){
        console.log("GET REQUEST SUCCESS")
        console.log(data)
        store.dispatch(set_result(data))
        console.log(store.getState('search'))
       
        return data
    } else {
        console.error("GET REQUEST ERROR")
        console.error(data)
        return {error: data}   
    }
}