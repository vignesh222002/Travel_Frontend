import fetch from "@/utils/api"

export const fetchTripById = async (id: number) => {
    try {
        const response = await fetch({
            endPoint: `trip/${id}`,
            method: 'GET'
        })

        return response?.data?.data
    }
    catch (error) {
        console.log("Error", error)
    }
}