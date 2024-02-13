import { Options } from "@/components/pageComponents/createEditPlaceComponent/interfaces";
import { PlaceDetails } from "@/components/pageComponents/placeDetails/interfaces";

export interface AddEditSpotPopupProps {
    purpose: 'create' | 'edit',
    placeId: number,
    spotId?: number,
    setPopup: React.Dispatch<React.SetStateAction<boolean>>,
    setPlace: React.Dispatch<React.SetStateAction<PlaceDetails>>
}

export interface SpotSelectedOption {
    category: Options;
    timing: Options;
    season: Options;
}

export interface AddSpotServiceBody {
    place_id: number,
    spot: string,
    category: string,
    description: string,
    timing: string,
    season: string,
    google_location: string,
    must_visit: boolean,
    image_link: string
}