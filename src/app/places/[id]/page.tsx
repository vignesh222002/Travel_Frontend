import PlaceDetailsPageComponent from '@/components/pageComponents/placeDetails'
import React from 'react'
import PlaceDetailsPageProps from './interfaces'

const PlaceDetailsPage = ({ params }: PlaceDetailsPageProps) => {
    return (
        <PlaceDetailsPageComponent id={+params.id} />
    )
}

export default PlaceDetailsPage