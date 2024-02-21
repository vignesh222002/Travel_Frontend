import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { AllTripData } from '@/components/pageComponents/trip/interfaces'
import { dateHeadingForTripHeading } from '@/utils/moment'

const TripCard = (
    {
        dates,
        description,
        id,
        place_image_link,
        places,
        tripNumber
    }: AllTripData & { tripNumber: number }
) => {

    const [tripDates, setTripDates] = useState<Date[]>([])

    useEffect(() => {
        setTripDates(dates.map(item => new Date(item)))
    }, [dates])

    return (
        <div className={styles.tripWrapper}>
            <div className={styles.tripDetails}>
                <div className={styles.tripHeader}>
                    <div className={styles.tripDates}>
                        {dateHeadingForTripHeading(tripDates).slice(0, -3)}
                    </div>
                    <div className={styles.tripNumber}>Trip No : {tripNumber}</div>
                </div>
            </div>
            <div className={styles.tripImage}>
                <img alt='Trip Image' src={place_image_link} />
            </div>
        </div>
    )
}

export default TripCard