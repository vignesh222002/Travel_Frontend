import { AllTripApiData } from "./interfaces"
import { fetchAllTrip } from "./services"

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