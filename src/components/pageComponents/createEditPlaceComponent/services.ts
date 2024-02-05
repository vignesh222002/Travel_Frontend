import fetch from "@/utils/api";
import { PlaceData, SelectedOption } from "./interfaces";
import { navigateTo } from "@/utils/router";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const addNewPlace = async (
    body: PlaceData,
    setState: React.Dispatch<React.SetStateAction<PlaceData>>,
    setSelectedOption: React.Dispatch<React.SetStateAction<SelectedOption>>
) => {
    try {
        const response = await fetch({
            endPoint: 'place/create',
            method: 'POST',
            body
        })

        if (response) {
            setState({
                place: '',
                state_id: 0,
                landscape: '',
                is_visited: false,
                is_oneday_trip: false,
                stay_option: '',
                best_time_to_visit: '',
                description: '',
                image_link: '',
                nearest_place: '',
            })

            setSelectedOption({
                state: { label: '', value: 0 },
                landscape: { label: '', value: 0 },
                bestTimeToVisit: { label: '', value: 0 },
            })
        }
    }
    catch (error) {
        console.log("Error", error)
    }
}

export const updatePlace = async (id: number, body: PlaceData, router: AppRouterInstance) => {
    try {
        const response = await fetch({
            endPoint: 'place/update',
            method: 'PUT',
            body: {
                ...body,
                id
            }
        })

        navigateTo(router, `/places/${id}`)
    }
    catch (error) {
        console.log("Error", error)
    }
}