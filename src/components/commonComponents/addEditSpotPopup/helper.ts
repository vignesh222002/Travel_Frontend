
import { Options } from "@/components/pageComponents/createEditPlaceComponent/interfaces"
import { PlaceDetails, SpotDetails } from "@/components/pageComponents/placeDetails/interfaces"
import { addSpot } from "./services"
import { SpotSelectedOption } from "./interfaces"
import { getPlaceDetailsHandler } from "@/components/pageComponents/placeDetails/helper"

export const categoryOptions: Options[] = [
    { label: 'Boating', value: 'boating' },
    { label: 'Treking', value: 'treking' },
    { label: 'Garden', value: 'garden' },
    { label: 'View Point', value: 'view_point' },
    { label: 'Water Falls', value: 'water_falls' },
]

export const seasonOptions: Options[] = [
    { label: 'Monsoon', value: 'monsoon' },
    { label: 'Summer', value: 'summer' },
    { label: 'Winter', value: 'winter' },
    { label: 'Any Time', value: 'any_time' },
]

export const timingOptions: Options[] = [
    { label: 'Restricted Timing', value: 'restricted_timing' },
    { label: 'Flexible Timing', value: 'flexible_timing' },
]

export const spotFieldsChangeHandler = (setState: React.Dispatch<React.SetStateAction<SpotDetails>>, key: string, value: string | number | boolean) => {
    setState(prev => ({
        ...prev,
        [key]: value
    }))
}

export const addSpotHandler = async (
    data: SpotDetails,
    setPopup: React.Dispatch<React.SetStateAction<boolean>>,
    setState: React.Dispatch<React.SetStateAction<SpotDetails>>,
    setSelectedOption: React.Dispatch<React.SetStateAction<SpotSelectedOption>>,
    placeId: number,
    setPlace: React.Dispatch<React.SetStateAction<PlaceDetails>>,
) => {
    try {
        const response = await addSpot(data)

        if (response) {
            setPopup(false)
            setSelectedOption({
                category: { label: '', value: '' },
                timing: { label: '', value: '' },
                season: { label: '', value: '' },
            })
            setState({
                category: '',
                description: '',
                google_location: '',
                image_link: '',
                must_visit: false,
                place_id: placeId,
                season: '',
                spot: '',
                timing: '',
            })
            getPlaceDetailsHandler(placeId, setPlace)
        }
    }
    catch (error) {
        console.log("Error", error)
    }
}

// export const getPlaceDetailsForEdit = async (
//     id: number,
//     setState: React.Dispatch<React.SetStateAction<PlaceData>>,
//     setSelectedOption: React.Dispatch<React.SetStateAction<SelectedOption>>,
//     Options: Options[]
// ) => {
//     try {
//         const response: PlaceDetails = await fetchPlaceDetails(id)

//         setState({
//             best_time_to_visit: response.best_time_to_visit,
//             description: response.description,
//             image_link: response.image_link,
//             is_oneday_trip: response.is_oneday_trip,
//             is_visited: response.is_visited,
//             landscape: response.landscape,
//             nearest_place: response.nearest_place_ref.nearest_place,
//             place: response.place,
//             state_id: response.state_id,
//             stay_option: response.stay_option
//         })

//         setSelectedOption({
//             state: Options.find(item => item.value === response.state_id) ?? { label: '', value: 0 },
//             landscape: landscapeOptions.find(item => item.value === response.landscape) ?? { label: '', value: '' },
//             bestTimeToVisit: best_time_to_visit_Options.find(item => item.value === response.best_time_to_visit) ?? { label: '', value: '' }
//         })
//     }
//     catch (error) {
//         console.log("Error", error)
//     }
// }