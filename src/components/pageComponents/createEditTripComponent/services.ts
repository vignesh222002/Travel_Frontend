import fetch from "@/utils/api"
import { CreateEditTripData, getTripByIdEditData } from "./interfaces"

export const fetchSpotsByPlace = async (place_id: number) => {
    try {
        const response = await fetch({
            endPoint: `spot/all/${place_id}`,
            method: 'GET'
        })

        return response?.data?.data
    }
    catch (error) {
        console.log("Error", error)
    }
}

export const createTripData = async (body: CreateEditTripData) => {
    try {
        const response = await fetch({
            endPoint: `trip/create`,
            method: 'POST',
            body
        })

        return response?.data?.data
    }
    catch (error) {
        console.log("Error", error)
    }
}

export const editTripData = async (body: getTripByIdEditData) => {
    try {
        const response = await fetch({
            endPoint: `trip/update/${body.id}`,
            method: 'PUT',
            body
        })

        return response?.data?.data
    }
    catch (error) {
        console.log("Error", error)
    }
}