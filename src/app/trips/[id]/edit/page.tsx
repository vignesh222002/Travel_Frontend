"use client"
import React from 'react'
import CreateTripPageComponent from '@/components/pageComponents/createEditTripComponent'
import EditTripPageProps from './interfaces'

const EditTripPage = ({ params }: EditTripPageProps) => {
    return (
        <CreateTripPageComponent purpose='edit' id={+params.id} />
    )
}

export default EditTripPage