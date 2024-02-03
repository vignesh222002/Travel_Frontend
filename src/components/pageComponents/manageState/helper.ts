import { States } from "./interfaces";
import { fetchAllStates } from "./services"

export const getStateHandler = async (setStates: React.Dispatch<React.SetStateAction<States[]>>) => {
    const response: States[] = await fetchAllStates();

    setStates(response);
}