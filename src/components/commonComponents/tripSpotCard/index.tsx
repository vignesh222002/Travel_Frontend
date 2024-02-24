import React from 'react'
import { TripSpotData } from '@/components/pageComponents/tripDetails/interfaces'
import styles from './styles.module.scss'
import Image from 'next/image'
import locationImage from '@/assests/svg/locationIcon.svg'

const mock = {
    "date": "19/02/2024",
    "description": "First Day Starts in Ooty Testing",
    "place": "Ooty",
}


const TripSpotCard = ({ data }: { data: TripSpotData }) => {
    return (
        <div className={styles.tripSpotCardWrapper}>
            <div className={styles.tripSpotDetails}>
                <div className={styles.tripSpotHeader}>
                    <div className={styles.tripSpotHeadContent}>
                        <div className={styles.spot}>{data.order}. {data.spot.spot}</div>
                        <div className={styles.mustVisit}>{data.spot.must_visit && 'Must Visit'}</div>
                    </div>
                    <div className={styles.category}>{data.spot.category.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</div>
                </div>

                <div className={styles.locationContainer}>
                    <div className={styles.locationLogo}>
                        <Image alt='Location Icon' src={locationImage} width={15} height={15} />
                    </div>
                    <div className={styles.location}>
                        <a target='_blank' href={data.spot.google_location}>View location</a>
                    </div>
                </div>

                <div className={styles.description}>
                    <b>Description : </b>
                    <span>{data.description}</span>
                </div>
            </div>
            <div className={styles.tripSpotImage}>
                <img alt='Trip Spot Image' src={data.spot.image_link} />
            </div>
        </div>
    )
}

export default TripSpotCard