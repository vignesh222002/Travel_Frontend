import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { fetchPlaces } from "../place/services";
import { CreateEditTripData, CreateEditTripSpotData, Options, SpotOptions, fetchAllPlaces, fetchAllSpots } from "./interfaces";
import { createEditTripData, fetchSpotsByPlace } from "./services";

export const populateCreateTripData = async (
    tripData: CreateEditTripData,
    setTripData: React.Dispatch<React.SetStateAction<CreateEditTripData>>,
    addNewSpot: boolean,
    removeSpot: number | null,
    index?: number,
    key?: keyof CreateEditTripSpotData,
    value?: string | number,
) => {
    const data = { ...tripData };
    // Add New Spot
    if (addNewSpot) {
        data?.data?.push({
            date: '',
            order: data?.data?.length,
            description: '',
            place_id: data.data[data.data.length - 1].place_id || data.places_visited[data.places_visited.length - 1] || 0,
            spot_id: 0,
        })
    }
    // Remove Existing Spot
    else if (removeSpot != null && removeSpot >= 0 && removeSpot < data?.data?.length) {
        data?.data?.splice(removeSpot, 1)
    }
    // Update Values
    else {
        if (index != null && key != null && value != null) {

            // Push Place Id in Places Visited
            if (key === 'place_id' && typeof value === 'number' && !data?.places_visited.find(item => value === item)) {
                data?.places_visited.push(value)
            }

            // @ts-ignore
            data.data[index][key] = value
        }
    }

    // Populate Order
    data.data = data?.data?.map((item: CreateEditTripSpotData, index: number) => ({
        ...item,
        order: index,
    }))

    setTripData(data);
}

export const fetchAllPlaceOptions = async (setPlaceOptions: React.Dispatch<React.SetStateAction<Options[]>>) => {
    try {
        const response: fetchAllPlaces[] = await fetchPlaces()

        const options: Options[] = response?.map(item => ({
            label: item.place,
            value: item.id
        }))

        setPlaceOptions(options);
    }
    catch (error) {
        console.log("Error", error)
    }
}

export const fetchAllSpotsOptions = async (
    place_id: number,
    spotOptions: SpotOptions,
    setSpotOptions: React.Dispatch<React.SetStateAction<SpotOptions>>
) => {
    if (!spotOptions[place_id]) {
        // Fetch Spot Options for this Place Id
        const response: fetchAllSpots[] = await fetchSpotsByPlace(place_id)

        const options: Options[] = response?.map(item => ({
            label: item.spot,
            value: item.id
        }))

        setSpotOptions(prev => ({
            ...prev,
            [place_id]: [...options]
        }))
    }
}

export const findPlaceSelectedOption = (place_id: number, options: Options[]) => {
    return options?.find(item => item.value === place_id) ?? { label: '', value: 0 }
}

export const findSpotSelectedOption = (place_id: number, spot_id: number, spotOptions: SpotOptions) => {
    return spotOptions[place_id]?.find(item => item.value === spot_id) ?? { label: '', value: 0 }
}

export const createEditTripDataHandler = async (data: CreateEditTripData, router: AppRouterInstance) => {
    try {
        const response = await createEditTripData(data)

        if (response) {
            router.push('/trips')
        }
    }
    catch (error) {
        console.log("Error", error)
    }
}