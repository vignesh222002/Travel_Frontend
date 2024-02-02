import React from 'react'
import styles from './styles.module.scss'
import PlacesCardProps from './interfaces'

const PlacesCard = ({
    id, best_time_to_visit, is_oneday_trip, is_visited, landscape, place, state_id, stay_option
}: PlacesCardProps) => {


    return (
        <>
            <div className={styles.card_outline}>
                <h3 className={styles.card_head}>{place}</h3>
            </div>
        </>
    )
}

export default PlacesCard;