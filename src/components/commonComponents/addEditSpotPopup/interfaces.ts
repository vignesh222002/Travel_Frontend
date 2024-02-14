import { Options } from "@/components/pageComponents/createEditPlaceComponent/interfaces";
import { PlaceDetails, SpotDetails, SpotPopupState } from "@/components/pageComponents/placeDetails/interfaces";

export interface AddEditSpotPopupProps {
    purpose: 'create' | 'edit',
    placeId: number,
    editSpotData: SpotDetails,
    setPopup: React.Dispatch<React.SetStateAction<SpotPopupState>>,
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

export interface EditSpotServiceBody {
    id: number,
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