import fetch from "@/utils/api"

export const fetchAllTrip = async () => {
    try {
        const response = await fetch({
            endPoint: 'trip/all',
            method: 'GET'
        })

        return response?.data?.data
    }
    catch (error) {
        console.log("Error", error)
    }
}