import fetch from "@/utils/api"

export const fetchAllStates = async () => {
    try {
        const response = await fetch({
            endPoint: 'state/all',
            method: "GET"
        })

        return response?.data.data;
    }
    catch (error) {
        console.log("Error", error)
    }
}