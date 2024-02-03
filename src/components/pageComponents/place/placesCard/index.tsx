import React, { CSSProperties, useEffect } from 'react'
import styles from './styles.module.scss'
import PlacesCardProps from './interfaces'
import Image from 'next/image'

const PlacesCard = ({
    best_time_to_visit, is_oneday_trip, is_visited, landscape, place, state, stay_option, nearest_place_ref, description, image_link
}: PlacesCardProps) => {

    const defaultImage = process.env.NEXT_PUBLIC_DEFAULT_IMAGE_LINK || "";

    const cardImageStyle: CSSProperties = {
        backgroundImage: `url(${image_link || defaultImage})`
    }

    return (
        <>
            <div className={styles.cardOutline}>
                <div className={styles.cardImageWrapper}>
                    {/* <img className={styles.cardImage} src={image_link ? image_link : defaultImage} alt="Place Card Image" /> */}
                    <div className={styles.cardBackgroungImage} style={cardImageStyle}></div>
                    {/* <Image className={styles.cardImage} width={300} height={200} src={image_link ? image_link : defaultImage} alt="Place Card Image" /> */}
                </div>
                <div className={styles.cardHead}>
                    <h3 className={styles.place}>{place}</h3>
                    <div className={styles.state}>{state.state}</div>
                </div>
            </div>
        </>
    )
}

export default PlacesCard;