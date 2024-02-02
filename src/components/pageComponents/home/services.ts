import fetch from "@/utils/api";

export async function fetchPlaces() {
    try {
        const response = await fetch({
            endPoint: 'place/all',
            method: 'GET',
        })

        return response?.data;
    }
    catch (error) {
        console.log("Error", error)
    }
}