export interface PlaceDetailsPageComponentProps {
    id: number
}

export interface PlaceDetails {
    id: number;
    place: string;
    state_id: number;
    best_time_to_visit: string;
    description: string;
    image_link: string;
    is_oneday_trip: boolean;
    is_visited: boolean;
    landscape: string;
    spots: SpotDetails[];
    stay_option: string;
    nearest_place_ref: {
        nearest_place: string
    }
    state: {
        state: string
    }
}

export interface SpotDetails {
    category: string;
    description: string;
    google_location: string;
    id: number;
    must_visit: boolean;
    image_link: string;
    place_id: number;
    season: string;
    spot: string;
    timing: string;
}