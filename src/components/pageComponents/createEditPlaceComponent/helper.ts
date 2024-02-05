import { States } from "../manageState/interfaces";
import { fetchAllStates } from "../manageState/services";
import { PlaceDetails } from "../placeDetails/interfaces";
import { fetchPlaceDetails } from "../placeDetails/services";
import { PlaceData, Options, SelectedOption } from "./interfaces";

export const landscapeOptions: Options[] = [
    { label: 'Hill Station', value: 'hill_station' },
    { label: 'Coastal', value: 'coastal' },
    { label: 'Road Trip', value: 'road_trip' },
    { label: 'Other', value: 'other' },
]

export const best_time_to_visit_Options: Options[] = [
    { label: 'Monsoon', value: 'monsoon' },
    { label: 'Summer', value: 'summer' },
    { label: 'Winter', value: 'winter' },
    { label: 'Any Time', value: 'any_time' },
]

export const placeFieldsChangeHandler = (setState: React.Dispatch<React.SetStateAction<PlaceData>>, key: string, value: string | number | boolean) => {
    setState(prev => ({
        ...prev,
        [key]: value
    }))
}

export const fetchStateOptions = async (setState: React.Dispatch<React.SetStateAction<Options[]>>) => {
    const result: States[] = await fetchAllStates()
    const options: Options[] = result?.map(item => {
        return {
            label: item.state,
            value: item.id
        }
    })

    setState(options)
}

export const getPlaceDetailsForEdit = async (
    id: number,
    setState: React.Dispatch<React.SetStateAction<PlaceData>>,
    setSelectedOption: React.Dispatch<React.SetStateAction<SelectedOption>>,
    Options: Options[]
) => {
    try {
        const response: PlaceDetails = await fetchPlaceDetails(id)

        setState({
            best_time_to_visit: response.best_time_to_visit,
            description: response.description,
            image_link: response.image_link,
            is_oneday_trip: response.is_oneday_trip,
            is_visited: response.is_visited,
            landscape: response.landscape,
            nearest_place: response.nearest_place_ref.nearest_place,
            place: response.place,
            state_id: response.state_id,
            stay_option: response.stay_option
        })

        console.log("landscape", landscapeOptions, response.landscape)
        console.log("visit", best_time_to_visit_Options, response.best_time_to_visit)

        setSelectedOption({
            state: Options.find(item => item.value === response.state_id) ?? { label: '', value: 0 },
            landscape: landscapeOptions.find(item => item.value === response.landscape) ?? { label: '', value: '' },
            bestTimeToVisit: best_time_to_visit_Options.find(item => item.value === response.best_time_to_visit) ?? { label: '', value: '' }
        })
    }
    catch (error) {
        console.log("Error", error)
    }
}