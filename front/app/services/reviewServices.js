"use client"
import axios from "./axios";

export async function createReview(Review){
    try{
        console.log("Entrando al servicio")
        const response = axios.post("/Reviews", Review)
        console.log("servicio" + Review)
        return response.data
    }catch{
        console.log("error")
    }
}

export async function createCampaign(Campaign){
    try{
        console.log("Entrando al servicio")
        const response = axios.post("/CreateCampaigns", Campaign)
        console.log("servicio" + Campaign)
        return response.data
    }catch{
        console.log("error")
    }
}


export async function createFilter(Filter){
    try{
        console.log("Entrando al servicio filtros")
        const response = axios.post("/SearchCampaign", Filter)
        console.log("servicio" + Filter)
        return response.data
    }catch{
        console.log("error")
    }
}
