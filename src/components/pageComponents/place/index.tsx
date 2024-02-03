"use client"
import PlacesCardProps from '@/components/pageComponents/place/placesCard/interfaces';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { getAllPlacesHandler } from './helper';
import PlacesCard from './placesCard';
import styles from './styles.module.scss'
import NavBar from '../../commonComponents/navBar';

const PlacesPageComponent = () => {
    const router = useRouter();
    const [place, setPlace] = useState<PlacesCardProps[]>([])

    useEffect(() => {
        getAllPlacesHandler(setPlace)
    }, [])

    return (
        <>
            <NavBar addPlace manageState addState/>
            <div className={styles.placesPageContent}>
                {(place) && (
                    <div className={styles.placesCardsWrapper}>
                        {place?.map(item => (
                            <PlacesCard
                                key={item.id}
                                id={item.id}
                                best_time_to_visit={item.best_time_to_visit}
                                is_oneday_trip={item.is_oneday_trip}
                                is_visited={item.is_visited}
                                landscape={item.landscape}
                                place={item.place}
                                state_id={item.state_id}
                                stay_option={item.stay_option}
                                nearest_place_ref={item.nearest_place_ref}
                                state={item.state}
                                description={item.description}
                                image_link={item.image_link}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default PlacesPageComponent