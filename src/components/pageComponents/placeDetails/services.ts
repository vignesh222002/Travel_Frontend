import fetch from "@/utils/api"
import { navigateTo } from "@/utils/router"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export const fetchPlaceDetails = async (id: number) => {
    try {
        const response = await fetch({
            endPoint: `place/${id}`,
            method: 'GET'
        })

        return response?.data?.data
    }
    catch (error) {
        console.log("Error", error)
    }
}

export const deletePlace = async (id: number, router: AppRouterInstance) => {
    try {
        const response = await fetch({
            endPoint: `place/delete/${id}`,
            method: 'DELETE'
        })

        if (response) {
            navigateTo(router, '/places')
        }
    }
    catch (error) {
        console.log("Error", error)
    }
}