import { PlaceDetails } from "@/components/pageComponents/placeDetails/interfaces"
import { deleteSpot } from "./services"
import { getPlaceDetailsHandler } from "@/components/pageComponents/placeDetails/helper"

export const deleteSpotHandler = async (
    spotId: number | undefined,
    placeId: number,
    setPlace: React.Dispatch<React.SetStateAction<PlaceDetails>>
) => {
    try {
        if (spotId) {
            const response = await deleteSpot(spotId, placeId)
            getPlaceDetailsHandler(placeId, setPlace)
        }
        else throw new Error("Spot Id is undefined")
    }
    catch (error) {
        console.log("Error", error)
    }
}