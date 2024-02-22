import TripDetailsComponent from '@/components/pageComponents/tripDetails'
import React from 'react'
import TripDetailsPageProps from './interfaces'

const TripDetailsPage = ({ params }: TripDetailsPageProps) => {
    return (
        <TripDetailsComponent id={+(params.id)} />
    )
}

export default TripDetailsPage