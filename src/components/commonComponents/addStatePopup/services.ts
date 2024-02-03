import { getStateHandler } from "@/components/pageComponents/manageState/helper";
import { States } from "@/components/pageComponents/manageState/interfaces";
import fetch from "@/utils/api"

export const addNewState = async (
    state: string,
    setAddStatePopup: (value: React.SetStateAction<{
        show: boolean;
        state: string;
    }>) => void
) => {
    try {
        if (state) {
            const response: any = await fetch({
                endPoint: 'state/create',
                method: 'POST',
                body: { state }
            })

            setAddStatePopup({ show: false, state: '' })
        }
        else {
            console.log("State Name is Required")
        }
    }
    catch (error) {
        console.log("Error", error)
    }
}

export const editState = async (
    state: string,
    id: number | undefined,
    setAddStatePopup: (value: React.SetStateAction<{
        show: boolean;
        state: string;
    }>) => void,
    setStates: React.Dispatch<React.SetStateAction<States[]>> | undefined
) => {
    try {
        if (state && typeof id !== 'undefined' && setStates) {
            const response: any = await fetch({
                endPoint: 'state/update',
                method: 'PUT',
                body: { id, state }
            })
            getStateHandler(setStates)
            setAddStatePopup({ show: false, state: '' })
        }
        else {
            console.log("State Name and ID is Required")
        }
    }
    catch (error) {
        console.log("Error", error)
    }
}