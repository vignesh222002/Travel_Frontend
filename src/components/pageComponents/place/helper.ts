import PlacesCardProps from "../../commonComponents/placesCard/interfaces";
import { fetchPlaces } from "./services";

export async function getAllPlacesHandler(
    setState: React.Dispatch<React.SetStateAction<PlacesCardProps[]>>
) {
    const result = await fetchPlaces()

    if (result) setState(result)
}