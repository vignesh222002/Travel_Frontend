export interface CreateEditPlaceComponentProps {
    purpose: 'create' | 'edit',
    id?: number
}

export interface PlaceData {
    place: string,
    state_id: number,
    landscape: string,
    is_visited: boolean,
    is_oneday_trip: boolean,
    stay_option: string,
    best_time_to_visit: string,
    nearest_place: string,
    description: string,
    image_link: string
}

export interface Options {
    value: number | string,
    label: string,
}

export interface SelectedOption {
    state: Options;
    landscape: Options;
    bestTimeToVisit: Options;
}