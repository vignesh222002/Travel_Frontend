import fetch from "@/utils/api";
import { AddSpotServiceBody } from "./interfaces";

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