import fetch from "@/utils/api";
import { AddSpotServiceBody, EditSpotServiceBody } from "./interfaces";

export const addSpot = async (body: AddSpotServiceBody) => {
    try {
        const response = await fetch({
            endPoint: 'spot/add',
            method: "POST",
            body
        })

        return response?.data
    }
    catch (error: any) {
        throw new Error(error?.message)
    }
}

export const editSpot = async (body: EditSpotServiceBody) => {
    try {
        const response = await fetch({
            endPoint: 'spot/update',
            method: "PUT",
            body
        })

        return response?.data
    }
    catch (error: any) {
        throw new Error(error?.message)
    }
}