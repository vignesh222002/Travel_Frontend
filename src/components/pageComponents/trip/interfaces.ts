export interface AllTripApiData {
    data: AllTripData[]
}

export interface AllTripData {
    id: number,
    description: string,
    amount_spend: number;
    members: string;
    trip_name: string;
    dates: string[],
    places: string[],
    place_image_link: string
}