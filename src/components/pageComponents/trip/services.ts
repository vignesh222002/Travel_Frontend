import fetch from "@/utils/api"
import { places_visited } from "../createEditTripComponent/interfaces"

export const fetchAllTrip = async () => {
    try {
        const response = await fetch({
            endPoint: 'trip/all',
            method: 'GET'
        })

        return response?.data?.data
    }
    catch (error) {
        console.log("Error", error)
    }
}

export const deleteTrip = async (trip_id: number, places_visited: places_visited[]) => {
    try {
        const response = await fetch({
            endPoint: `trip/delete/${trip_id}`,
            method: 'DELETE',
            body: {
                places_visited
            }
        })
    }
    catch (error) {
        console.log("Error", error)
    }
}