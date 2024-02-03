export default interface PlacesCardProps {
    id: number,
    place: string,
    state_id: number,
    landscape: string,
    is_visited: boolean,
    is_oneday_trip: boolean,
    stay_option: string,
    description: string | null,
    best_time_to_visit: string,
    image_link: string | null,
    nearest_place_ref: {
        nearest_place: string,
    },
    state: {
        state: string
    }
}