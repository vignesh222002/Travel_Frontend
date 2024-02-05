import fetch from "@/utils/api"

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