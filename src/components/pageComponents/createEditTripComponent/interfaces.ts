export interface CreateTripPageComponentProps {
    purpose: 'create' | 'edit',
    id?: number,
}

export interface CreateEditTripData {
    trip_name: string,
    members: string,
    amount_spend: number,
    description: string,
    places_visited: number[],
    data: CreateEditTripSpotData[]
}

export interface CreateEditTripSpotData {
    date: string,
    spot_id: number,
    place_id: number,
    order: number,
    description: string
}

export interface SpotOptions {
    [key: number]: Options[]
}

export interface Options {
    label: string;
    value: number;
}

export interface fetchAllPlaces {
    id: number,
    place: string
}

export interface fetchAllSpots {
    id: number,
    spot: string
}