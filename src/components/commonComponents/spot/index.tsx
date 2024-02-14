import { SpotComponentProps, SpotDetails } from '@/components/pageComponents/placeDetails/interfaces'
import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'
import locationImage from '../../../assests/svg/locationIcon.svg'

const SpotComponent = ({ data, setPopup, setEditSpotData }: SpotComponentProps) => {

    return (
        <div className={styles.spotWrapper}>
            <div className={styles.spotDetails}>
                <div className={styles.spotHeader}>
                    <div className={styles.spotHeadContent}>
                        <div className={styles.spot}>{data.spot}</div>
                        <div className={styles.mustVisit}>{data.must_visit && 'Must Visit'}</div>
                    </div>
                    <div className={styles.category}>{data.category.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</div>
                </div>
                <div className={styles.spotTimingContainer}>
                    <div className={styles.season}><b>Season : </b>{data.season.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</div>
                    <div className={styles.timing}><b>Timing : </b>{data.timing.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</div>
                </div>
                <div className={styles.locationContainer}>
                    <div className={styles.locationLogo}>
                        <Image alt='Location Icon' src={locationImage} width={20} height={20} />
                    </div>
                    <div className={styles.location}>
                        <a target='_blank' href={data.google_location}>View location</a>
                    </div>
                </div>
                <div className={styles.description}>
                    <b>Description : </b>
                    <span>{data.description}</span>
                </div>
                <div className={styles.spotActionWrapper}>
                    <button
                        onClick={() => {
                            setPopup(prev => ({ ...prev, edit: true, editSpotId: data.id ?? 0 }))
                            setEditSpotData(data)
                        }}
                    >
                        Edit Spot
                    </button>
                    <button
                        onClick={() => { }}
                    >
                        Delete Spot
                    </button>
                </div>
            </div>
            <div className={styles.spotImage}>
                <img alt='Spot Image' src={data.image_link} />
            </div>
        </div>
    )
}

export default SpotComponent