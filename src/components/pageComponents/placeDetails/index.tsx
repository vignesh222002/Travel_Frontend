"use client"
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import NavBar from '@/components/commonComponents/navBar';
import { getPlaceDetailsHandler } from './helper';
import { PlaceDetails, PlaceDetailsPageComponentProps } from './interfaces';
import Image from 'next/image';
import landscapeLogo from '../../../assests/svg/beach_holiday_vacations_sun_tree_sea_landscape_icon_179508.svg'
import { navigateTo } from '@/utils/router';
import { useRouter } from 'next/navigation';

const PlaceDetailsPageComponent = ({ id }: PlaceDetailsPageComponentProps) => {
    const router = useRouter()
    const [place, setPlace] = useState<PlaceDetails>({
        best_time_to_visit: '',
        description: '',
        id: 0,
        image_link: '',
        is_oneday_trip: false,
        is_visited: false,
        landscape: '',
        place: '',
        spots: [],
        state_id: 0,
        stay_option: '',
        state: {
            state: ''
        },
        nearest_place_ref: {
            nearest_place: ''
        }
    })

    useEffect(() => {
        console.log("Place Data", place)
    }, [place])

    useEffect(() => {
        getPlaceDetailsHandler(id, setPlace);
    }, [id])

    return (
        <>
            <NavBar addPlace addState manageState places />
            <div className={styles.placeDetailPageWrapper}>
                <div className={styles.placeDetailWrapper}>
                    <div className={styles.leftPlaceDetailsWrapper}>
                        <div className={styles.placeHeader}>
                            <div className={styles.place}>{place.place}</div>
                            <div className={styles.state}>{place.state.state}</div>
                        </div>
                        <div className={styles.placeDetailsContent}>
                            <div className={styles.landscapeWrapper}>
                                <Image className={styles.landscapeLogo} src={landscapeLogo} alt='landscape logo' />
                                <div className={styles.landscape}>{place.landscape}</div>
                            </div>
                            <div className={styles.isOnedayTrip}>{place.is_oneday_trip ? 'One Day Trip' : 'Many Days Trip'}</div>
                            <div
                                className={styles.isVisited}
                                style={{ color: place.is_visited ? 'green' : 'red' }}
                            >
                                {place.is_visited ? 'Already Visited' : 'Not Visited Yet'}
                            </div>
                            <div className={styles.description}><b>Description : </b>{place.description}</div>
                            <div className={styles.stayOption}><b>Stay : </b>{place.stay_option}</div>
                        </div>
                    </div>
                    <div className={styles.rightPlaceSpotsWrapper}>
                        <div className={styles.spotHeader}>
                            <h3 className={styles.spotHead}>Spots</h3>
                            <button
                                className={styles.editPlaceButton}
                                onClick={() => navigateTo(router, `/places/${id}/edit`)}
                            >
                                Edit Place
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlaceDetailsPageComponent;