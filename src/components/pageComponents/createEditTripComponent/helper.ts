import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { fetchPlaces } from "../place/services";
import { CreateEditTripData, Options, PlaceCountDetails, SpotOptions, createTripSpotData, editTripSpotData, fetchAllPlaces, fetchAllSpots, getTripByIdEditData, getTripByIdResponseRawData, places_visited } from "./interfaces";
import { createTripData, editTripData, fetchSpotsByPlace } from "./services";
import { fetchTripById } from "../tripDetails/services";

export const populateCreateTripData = async (
    tripData: CreateEditTripData,
    setTripData: React.Dispatch<React.SetStateAction<CreateEditTripData>>,
    addNewSpot: number | null,
    removeSpot: number | null,
    index?: number,
    key?: keyof createTripSpotData,
    value?: string | number,
) => {
    const data = { ...tripData };
    // Add New Spot
    if (addNewSpot) {
        data?.data?.splice(
            addNewSpot,
            0,
            {
                date: '',
                order: data?.data?.length,
                description: '',
                place_id: data.data[addNewSpot - 1].place_id,
                spot_id: 0,
            }
        )
    }
    // Remove Existing Spot
    else if (removeSpot != null && removeSpot >= 0 && removeSpot <= data?.data?.length) {
        data?.data?.splice(removeSpot, 1)
    }
    // Update Values
    else {
        if (index != null && key != null && value != null) {
            // @ts-ignore
            data.data[index][key] = value
        }
    }

    // Empty Places Visited
    data.places_visited = []

    // Populate Order
    data.data = data?.data?.map((item: createTripSpotData, index: number) => {
        // Refer all the place_id and push it to the places_visited
        if (!data.places_visited.find((place_id) => item.place_id === place_id) && item.place_id) {
            data.places_visited.push(item.place_id)
        }

        return {
            ...item,
            order: index,
        }
    })

    setTripData(data);
}

export const populateEditTripData = async (
    editTripData: getTripByIdEditData,
    setEditTripData: React.Dispatch<React.SetStateAction<getTripByIdEditData>>,
    editPlaceCountDetails: PlaceCountDetails[],
    addNewSpot: number | null,
    removeSpot: number | null,
    index?: number,
    key?: keyof editTripSpotData,
    value?: string | number,
) => {
    const data = { ...editTripData };

    // Add New Spot
    if (addNewSpot != null && addNewSpot >= 0 && addNewSpot <= data?.data?.length) {
        data?.data?.splice(
            addNewSpot,
            0,
            {
                id: 0,
                date: '',
                order: data?.data?.length,
                description: '',
                place_id: data.data[addNewSpot - 1].place_id,
                spot_id: 0,
            }
        )
    }
    // Remove Existing Spot
    else if (removeSpot != null && removeSpot >= 0 && removeSpot < data?.data?.length) {
        const deletedSpot = data?.data?.splice(removeSpot, 1)
        // if (deletedSpot[0].id) setEditTripData(prev => ({ ...prev, delete_trip_spots: [...prev.delete_trip_spots, deletedSpot[0].id] }))
        if (deletedSpot[0].id) data.delete_trip_spots.push(deletedSpot[0].id)
    }
    // Update Values
    else {
        if (index != null && key != null && value != null) {
            // @ts-ignore
            data.data[index][key] = value
        }
    }

    // Empty New Places Visited
    data.new_places_visited = []

    // Populate Order
    data.data = data?.data?.map((item: editTripSpotData, index: number) => {
        // Refer all the place_id and push it to the places_visited
        if (!data.new_places_visited.find((place_id: places_visited) => item.place_id === place_id.place_id) && item.place_id) {
            data.new_places_visited.push({
                count: editPlaceCountDetails.find(place => place.place_id === item.place_id)?.count ?? 0,
                place_id: item.place_id
            })
        }

        return {
            ...item,
            order: index,
        }
    })

    setEditTripData(data)
}

export const fetchTripDataForEdit = async (id: number, setEditTripData: React.Dispatch<React.SetStateAction<getTripByIdEditData>>) => {
    const response: getTripByIdResponseRawData = await fetchTripById(id, true)

    setEditTripData({
        id: response.id,
        trip_name: response.trip_name,
        description: response.description,
        amount_spend: response.amount_spend,
        members: response.members,
        new_places_visited: [],
        old_places_visited: response.old_places,
        delete_trip_spots: [],
        data: response.data
    })
}

export const fetchAllPlaceOptions = async (
    setPlaceOptions: React.Dispatch<React.SetStateAction<Options[]>>,
    setEditPlaceCountDetails?: React.Dispatch<React.SetStateAction<PlaceCountDetails[]>>
) => {
    try {
        const response: fetchAllPlaces[] = await fetchPlaces()

        let options: Options[] = []
        let editPlaceCountDetails: PlaceCountDetails[] = []

        response?.map(item => {
            options.push({
                label: item.place,
                value: item.id
            })

            if (setEditPlaceCountDetails) {
                editPlaceCountDetails.push({
                    count: item.count,
                    place_id: item.id
                })
            }
        })


        setPlaceOptions(options);
        if (setEditPlaceCountDetails) {
            setEditPlaceCountDetails(editPlaceCountDetails)
        }
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
        const response = await createTripData(data)

        if (response) {
            router.push('/trips')
        }
    }
    catch (error) {
        console.log("Error", error)
    }
}

export const editTripDataHandler = async (data: getTripByIdEditData, router: AppRouterInstance) => {
    try {
        const response = await editTripData(data)

        if (response) {
            router.push('/trips')
        }
    }
    catch (error) {
        console.log("Error", error)
    }
}