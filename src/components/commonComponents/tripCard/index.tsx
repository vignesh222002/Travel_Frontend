import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { AllTripApiData, AllTripData } from '@/components/pageComponents/trip/interfaces'
import { dateHeadingForTripHeading, stringToDate } from '@/utils/moment'
import { useRouter } from 'next/navigation'
import { deleteTripHandler } from '@/components/pageComponents/trip/helper'

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
        places_visited,
        tripNumber,
        setTripData,
    }: AllTripData & { tripNumber: number, setTripData: React.Dispatch<React.SetStateAction<AllTripApiData>> }
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
                        onClick={() => deleteTripHandler(id, places_visited, setTripData)}
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