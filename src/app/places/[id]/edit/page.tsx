import React from 'react'
import CreateEditPlaceComponent from '@/components/pageComponents/createEditPlaceComponent'
import EditPlacePageProps from './interfaces'

const EditPlacePage = ({ params }: EditPlacePageProps) => {
    return (
        <CreateEditPlaceComponent purpose='edit' id={+params.id} />
    )
}

export default EditPlacePage