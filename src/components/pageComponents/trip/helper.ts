import { places_visited } from "../createEditTripComponent/interfaces";
import { AllTripApiData } from "./interfaces"
import { deleteTrip, fetchAllTrip } from "./services"

export const getAllTripsHandler = async (setTripData: React.Dispatch<React.SetStateAction<AllTripApiData>>) => {
    try {
        const data: AllTripApiData = await fetchAllTrip()

        data.trip_data.reverse();

        setTripData(data)
    }
    catch (error) {
        console.log("Error", error)
    }
}

export const deleteTripHandler = async (
    trip_id: number,
    places_visited: places_visited[],
    setTripData: React.Dispatch<React.SetStateAction<AllTripApiData>>
) => {
    try {
        const response = await deleteTrip(trip_id, places_visited)

        getAllTripsHandler(setTripData)
    }
    catch (error) {
        console.log("Error", error)
    }
}