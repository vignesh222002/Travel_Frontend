export interface AddEditSpotPopupProps {
    purpose: 'create' | 'edit',
    placeId: number,
    spotId?: number,
    setPopup: React.Dispatch<React.SetStateAction<boolean>>
}