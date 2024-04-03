"use client"
import axios from "./axios";

export async function createReview(Review){
    try{
        console.log("Entrando al servicio")
        const response = axios.post("/Reviews", Review)
        return response.data
    }catch{
        console.log("error")
    }
}