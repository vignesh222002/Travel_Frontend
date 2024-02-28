export interface AllTripApiData {
    trip_data: AllTripData[];
    total_trips: number;
    total_amount_spent: number;
    total_days_spent: number;
    total_places_visited: number;
    places_visited: string[];
    total_oneday_trips: number;
    total_multiday_trips: number;
}

export interface AllTripData {
    id: number,
    description: string,
    amount_spend: number;
    members: string;
    trip_name: string;
    dates: string[],
    places: string[],
    places_visited: PlacesVisited[],
    place_image_link: string
}

export interface PlacesVisited {
    place_id: number;
    count: number;
}