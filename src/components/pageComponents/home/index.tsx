"use client"
import PlacesCardProps from '@/components/pageComponents/home/placesCard/interfaces';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { getAllPlacesHandler } from './helper';
import PlacesCard from './placesCard';

const HomePageComponent = () => {
    const router = useRouter();
    const [place, setPlace] = useState<PlacesCardProps[]>([])

    useEffect(() => {
        getAllPlacesHandler(setPlace)
    }, [])

    useEffect(() => {
        console.log("places", place, typeof place)
    }, [place])

    return (
        <>
            {
                (place) ? (
                    place?.map(item => (
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
                        />
                    ))
                ) : (
                    <>Nothing</>
                )
            }
        </>
    )
}

export default HomePageComponent