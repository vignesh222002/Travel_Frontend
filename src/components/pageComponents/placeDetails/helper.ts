import { PlaceDetails } from "./interfaces"
import { fetchPlaceDetails } from "./services"

export const getPlaceDetailsHandler = async (
    id: number,
    setPlace: React.Dispatch<React.SetStateAction<PlaceDetails>>
) => {
    try {
        const data: PlaceDetails = await fetchPlaceDetails(id)
        setPlace(data)
    }
    catch (error) {
        console.log("Error", error)
    }
}