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
    data: createTripSpotData[]
}

export interface createTripSpotData {
    date: string,
    spot_id: number,
    place_id: number,
    order: number,
    description: string
}

export interface editTripSpotData {
    id: number,
    date: string,
    spot_id: number,
    place_id: number,
    order: number,
    description: string
}

export interface getTripByIdResponseRawData {
    id: number;
    description: string;
    amount_spend: number;
    members: string;
    trip_name: string;
    old_places: places_visited[];
    data: editTripSpotData[]
}

export interface getTripByIdEditData {
    id: number;
    description: string;
    amount_spend: number;
    members: string;
    trip_name: string;
    new_places_visited: places_visited[];
    old_places_visited: places_visited[];
    data: editTripSpotData[]
}

export interface SpotOptions {
    [key: number]: Options[]
}

export interface Options {
    label: string;
    value: number;
}

export interface PlaceCountDetails {
    place_id: number;
    count: number;
}

export interface fetchAllPlaces {
    id: number,
    place: string,
    count: number
}

export interface fetchAllSpots {
    id: number,
    spot: string
}

export interface places_visited {
    place_id: number,
    count: number
}