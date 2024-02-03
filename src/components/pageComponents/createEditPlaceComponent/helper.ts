import { States } from "../manageState/interfaces";
import { fetchAllStates } from "../manageState/services";
import { PlaceData, Options } from "./interfaces";

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
    const options: Options[] = result.map(item => {
        return {
            label: item.state,
            value: item.id
        }
    })

    setState(options)
}