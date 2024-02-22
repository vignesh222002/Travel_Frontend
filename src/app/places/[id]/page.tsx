import React from 'react'
import PlaceDetailsPageComponent from '@/components/pageComponents/placeDetails'
import PlaceDetailsPageProps from './interfaces'

const PlaceDetailsPage = ({ params }: PlaceDetailsPageProps) => {
    return (
        <PlaceDetailsPageComponent id={+params.id} />
    )
}

export default PlaceDetailsPage