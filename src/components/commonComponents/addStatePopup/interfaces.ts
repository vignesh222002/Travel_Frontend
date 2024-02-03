import { States } from "@/components/pageComponents/manageState/interfaces";

export interface AddEditStatePopupComponentProps {
    state: {
        show: boolean;
        state: string;
    },
    setState: React.Dispatch<React.SetStateAction<{
        show: boolean;
        state: string;
    }>>,
    purpose: 'create' | 'edit',
    id?: number
    refetchSetState?: React.Dispatch<React.SetStateAction<States[]>>
}