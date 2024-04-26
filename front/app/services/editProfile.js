"use client"
import axios from "./axios";

export async function editProfile(Profile){
    try{
        console.log("Entrando al servicio profile")
        const response = axios.post("/Profile", Profile)
        console.log("servicio" + Profile)
        return response.data
    }catch{
        console.log("error")
    }
}