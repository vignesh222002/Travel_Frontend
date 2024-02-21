export interface AllTripApiData {
    data: AllTripData[]
}

export interface AllTripData {
    id: number,
    description: string,
    dates: string[],
    places: string[],
    place_image_link: string
}