import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { AllTripData } from '@/components/pageComponents/trip/interfaces'
import { dateHeadingForTripHeading, stringToDate } from '@/utils/moment'
import { useRouter } from 'next/navigation'

const TripCard = (
    {
        id,
        dates,
        description,
        places,
        place_image_link,
        amount_spend,
        members,
        trip_name,
        tripNumber
    }: AllTripData & { tripNumber: number }
) => {
    const router = useRouter()
    const [tripDates, setTripDates] = useState<Date[]>([])

    useEffect(() => {
        setTripDates(dates.map(item => stringToDate(item)))
    }, [dates])

    return (
        <div className={styles.tripWrapper}>
            <div className={styles.tripDetails}>
                <div className={styles.tripContent}>
                    <div className={styles.tripHeader}>
                        <div className={styles.tripDates}>
                            {dateHeadingForTripHeading(tripDates).slice(0, -3)}
                        </div>
                        <div className={styles.tripNumber}>Trip No : {tripNumber}</div>
                    </div>
                    <div className={styles.tripPlaces}>
                        {places.join(" - ")}
                    </div>
                    <div className={styles.description}>
                        <b>Description : </b>
                        <span>{description}</span>
                    </div>
                </div>
                <div className={styles.tripActionWrapper}>
                    <button
                        onClick={() => router.push(`/trips/${id}`)}
                    >
                        View Trip
                    </button>
                    <button
                        onClick={() => router.push(`/trips/${id}/edit`)}
                    >
                        Edit Trip
                    </button>
                    <button
                        onClick={() => { }}
                    >
                        Delete Trip
                    </button>
                </div>
            </div>
            <div className={styles.tripImage}>
                <img alt='Trip Image' src={place_image_link} />
            </div>
        </div>
    )
}

export default TripCard