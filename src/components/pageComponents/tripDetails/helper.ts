import { TripDetails } from "./interfaces"
import { fetchTripById } from "./services"

export const getTripByIdHandler = async (id: number, setTripData: React.Dispatch<React.SetStateAction<TripDetails>>) => {
    try {
        const response: TripDetails = await fetchTripById(id)

        setTripData(response);
    }
    catch (error) {
        console.log("Error", error)
    }
}