import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { AddEditSpotPopupProps } from './interfaces';
import { SpotDetails } from '@/components/pageComponents/placeDetails/interfaces';

const AddEditSpot = ({ purpose, placeId, spotId, setPopup }: AddEditSpotPopupProps) => {
    const [spotDetails, setSpotDetails] = useState<SpotDetails>({
        category: '',
        description: '',
        google_location: '',
        image_link: '',
        must_visit: false,
        place_id: placeId,
        season: '',
        spot: '',
        timing: '',
    })

    useEffect(() => {
        console.log("Compound Mounded")
    }, [])

    return (
        <div className={styles.addEditSpotPopupWrapper}>
            <div className={styles.addEditSpotPopup}>
                
            </div>
        </div>
    )
}

export default AddEditSpot;