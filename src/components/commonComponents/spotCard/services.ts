import fetch from "@/utils/api"

export const deleteSpot = async (spotId: number, placeId: number) => {
    try {
        const response = await fetch({
            endPoint: `spot/delete/${spotId}/place_id/${placeId}`,
            method: 'DELETE'
        })

        return response?.data
    }
    catch (error: any) {
        throw new Error(error.message)
    }
}