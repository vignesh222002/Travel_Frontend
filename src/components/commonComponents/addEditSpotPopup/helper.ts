
import { Options } from "@/components/pageComponents/createEditPlaceComponent/interfaces"
import { PlaceDetails, SpotDetails, SpotPopupState } from "@/components/pageComponents/placeDetails/interfaces"
import { addSpot, editSpot } from "./services"
import { EditSpotServiceBody, SpotSelectedOption } from "./interfaces"
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
    setPopup: React.Dispatch<React.SetStateAction<SpotPopupState>>,
    setState: React.Dispatch<React.SetStateAction<SpotDetails>>,
    setSelectedOption: React.Dispatch<React.SetStateAction<SpotSelectedOption>>,
    placeId: number,
    setPlace: React.Dispatch<React.SetStateAction<PlaceDetails>>,
) => {
    try {
        const response = await addSpot(data)

        if (response) {
            setPopup(prev => ({ ...prev, add: false }))
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

export const editSpotHandler = async (
    data: EditSpotServiceBody,
    setPopup: React.Dispatch<React.SetStateAction<SpotPopupState>>,
    setState: React.Dispatch<React.SetStateAction<SpotDetails>>,
    setSelectedOption: React.Dispatch<React.SetStateAction<SpotSelectedOption>>,
    placeId: number,
    setPlace: React.Dispatch<React.SetStateAction<PlaceDetails>>,
) => {
    try {
        const response = await editSpot(data)

        if (response) {
            setPopup(prev => ({ ...prev, edit: false }))
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