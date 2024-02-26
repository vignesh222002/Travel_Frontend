import fetch from "@/utils/api"

export const fetchTripById = async (id: number, includeRawData: boolean) => {
    try {
        const response = await fetch({
            endPoint: includeRawData ? `trip/${id}?raw_data=true` : `trip/${id}`,
            method: 'GET'
        })

        return response?.data?.data
    }
    catch (error) {
        console.log("Error", error)
    }
}