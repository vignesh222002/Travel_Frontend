"use client"
import PlacesCardProps from '@/components/pageComponents/home/placesCard/interfaces';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const HomePageComponent = () => {
    const router = useRouter();
    const [place, setPlace] = useState<PlacesCardProps[] | null>(null)

    useEffect(() => {
        
    }, [])

    return (
        <>qwe</>
    )
}

export default HomePageComponent