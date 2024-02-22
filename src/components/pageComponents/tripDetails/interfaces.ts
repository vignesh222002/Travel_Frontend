export interface TripDetailsComponentProps {
    id: number
}

export interface TripDetails {
    id: number;
    description: string;
    amount_spend: number;
    members: string;
    trip_name: string;
    places_visited: {
        place: string;
        place_id: number;
        count: number;
    }[];
    trip_data: {
        [key: string]: {
            [key: string]: {
                date: string;
                order: number;
                description: string;
                place: string;
                spot: {
                    id: number;
                    spot: string;
                    category: string;
                    image_link: string;
                    google_location: string;
                    must_visit: boolean;
                };
            }[];
        }
    };
}