import { AllTripApiData, AllTripData } from "./interfaces"
import { fetchAllTrip } from "./services"

export const getAllTripsHandler = async (setTripData: React.Dispatch<React.SetStateAction<AllTripApiData>>) => {
    try {
        const data: AllTripData[] = await fetchAllTrip()

        setTripData({
            data: data.reverse()
        })
    }
    catch (error) {
        console.log("Error", error)
    }
}