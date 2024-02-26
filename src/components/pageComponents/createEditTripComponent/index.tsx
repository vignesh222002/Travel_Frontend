import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { CreateEditTripData, CreateTripPageComponentProps, Options, PlaceCountDetails, SpotOptions, createTripSpotData, editTripSpotData, getTripByIdEditData } from './interfaces'
import NavBar from '@/components/commonComponents/navBar'
import Select from 'react-select'
import { createEditTripDataHandler, editTripDataHandler, fetchAllPlaceOptions, fetchAllSpotsOptions, fetchTripDataForEdit, findPlaceSelectedOption, findSpotSelectedOption, populateCreateTripData, populateEditTripData } from './helper'
import { useRouter } from 'next/navigation'

const CreateTripPageComponent = ({ purpose, id }: CreateTripPageComponentProps) => {
    const router = useRouter()
    const [tripData, setTripData] = useState<CreateEditTripData>({
        trip_name: '',
        amount_spend: 0,
        description: '',
        members: '',
        places_visited: [],
        data: [
            {
                date: '',
                order: 0,
                description: '',
                place_id: 0,
                spot_id: 0,
            }
        ],
    })
    const [editTripData, setEditTripData] = useState<getTripByIdEditData>({
        id: id ?? 0,
        trip_name: '',
        description: '',
        amount_spend: 0,
        members: '',
        new_places_visited: [],
        old_places_visited: [],
        data: [],
    })
    const [editPlaceCountDetails, setEditPlaceCountDetails] = useState<PlaceCountDetails[]>([])
    const [placeOptions, setPlaceOptions] = useState<Options[]>([])
    const [spotOptions, setSpotOptions] = useState<SpotOptions>({})

    useEffect(() => {

        if (purpose === 'create') {
            populateCreateTripData(
                tripData,
                setTripData,
                null,
                null,
            )
        }

        // All Places Options
        if (purpose === 'create') fetchAllPlaceOptions(setPlaceOptions)
        else if (purpose === 'edit') fetchAllPlaceOptions(setPlaceOptions, setEditPlaceCountDetails)
    }, [])

    useEffect(() => {
        if (purpose === 'edit' && typeof id !== 'undefined') {
            fetchTripDataForEdit(id, setEditTripData)
        }
    }, [id])

    useEffect(() => {
        if (purpose === 'edit' && typeof id !== 'undefined' && editTripData.old_places_visited.length) {
            editTripData.old_places_visited.map((item) => {
                fetchAllSpotsOptions(item.place_id, spotOptions, setSpotOptions)
            })
        }
    }, [editTripData.old_places_visited])

    return (
        <>
            <NavBar addPlace addState manageState places trips />
            <div className={styles.createTripWrapper}>
                <div className={styles.createTripLeftWrapper}>
                    <div className={styles.inputLabel}>Trip Name :</div>
                    <input
                        className={styles.tripDataInput}
                        type="text"
                        name='trip_name'
                        placeholder='Trip Name'
                        value={purpose === 'create' ? tripData.trip_name : editTripData.trip_name}
                        onChange={(e) => {
                            if (purpose === 'create') setTripData((prev) => ({ ...prev, trip_name: e.target.value }))
                            else if (purpose === 'edit') setEditTripData((prev) => ({ ...prev, trip_name: e.target.value }))
                        }}
                    />
                    <div className={styles.inputLabel}>Amount Spent :</div>
                    <input
                        className={styles.tripDataInput}
                        type="number"
                        name='amount_spend'
                        placeholder='Amount Spent'
                        value={purpose === 'create' ? tripData.amount_spend : editTripData.amount_spend}
                        onChange={(e) => {
                            if (purpose === 'create') setTripData((prev) => ({ ...prev, amount_spend: +(e.target.value) ?? 0 }))
                            else if (purpose === 'edit') setEditTripData((prev) => ({ ...prev, amount_spend: +(e.target.value) ?? 0 }))
                        }}
                    />
                    <div className={styles.inputLabel}>Members :</div>
                    <input
                        className={styles.tripDataInput}
                        type="text"
                        name='members'
                        placeholder='Members'
                        value={purpose === 'create' ? tripData.members : editTripData.members}
                        onChange={(e) => {
                            if (purpose === 'create') setTripData((prev) => ({ ...prev, members: e.target.value }))
                            else if (purpose === 'edit') setEditTripData((prev) => ({ ...prev, members: e.target.value }))
                        }}
                    />
                    <div className={styles.inputLabel}>Description :</div>
                    <textarea
                        className={styles.tripDataInput}
                        name='description'
                        placeholder='Description'
                        rows={3}
                        value={purpose === 'create' ? tripData.description : editTripData.description}
                        onChange={(e) => {
                            if (purpose === 'create') setTripData((prev) => ({ ...prev, description: e.target.value }))
                            else if (purpose === 'edit') setEditTripData((prev) => ({ ...prev, description: e.target.value }))
                        }}
                    />
                </div>
                <div className={styles.createTripRightWrapper}>
                    <div className={styles.tripSpotHeaderWrapper}>
                        <div className={styles.tripSpotHeader}>
                            Spots
                        </div>
                        <div className={styles.addtripSpotActionWrapper}>
                            <button
                                onClick={() => {
                                    populateCreateTripData(
                                        tripData, setTripData,
                                        tripData.data.length, null,
                                    )
                                }}
                                className={styles.addtripSpotAction}
                            >
                                Add Spot
                            </button>
                        </div>
                    </div>

                    {/* Add Trip Spot Detail Component */}
                    {purpose === 'create' ? (
                        <>
                            {tripData.data.map((item: createTripSpotData, index: number) => (
                                <div className={styles.tripSpotDetailWrapper} key={index}>
                                    <div className={styles.tripSpotDetailHeadWrapper}>
                                        <div className={styles.order}>Order : {item.order}</div>
                                        <div className={styles.tripSpotActionWrapper}>
                                            <button
                                                className={styles.tripSpotAction}
                                                onClick={() => {
                                                    populateCreateTripData(
                                                        tripData, setTripData,
                                                        null, index,
                                                    )
                                                }}
                                            >
                                                Remove
                                            </button>
                                            <button
                                                className={styles.tripSpotAction}
                                                onClick={() => {
                                                    populateCreateTripData(
                                                        tripData, setTripData,
                                                        index + 1, null,
                                                    )
                                                }}
                                            >
                                                Add Spot
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.inputRow}>
                                        <div className={styles.inputWrapper}>
                                            <div className={styles.inputLabel}>Date :</div>
                                            <input
                                                name='date'
                                                className={styles.input}
                                                value={item.date}
                                                onChange={(e) => {
                                                    populateCreateTripData(
                                                        tripData, setTripData,
                                                        null, null,
                                                        index, 'date', e.target.value
                                                    )
                                                }}
                                            >
                                            </input>
                                        </div>
                                        <div className={styles.inputWrapper}>
                                            <div className={styles.inputLabel}>Place :</div>
                                            <Select
                                                className={styles.select}
                                                options={placeOptions}
                                                value={findPlaceSelectedOption(item.place_id, placeOptions)}
                                                onChange={async (e: any) => {
                                                    await populateCreateTripData(
                                                        tripData, setTripData,
                                                        null, null,
                                                        index, 'place_id', e.value
                                                    )
                                                    await fetchAllSpotsOptions(e.value, spotOptions, setSpotOptions)
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.inputRow}>
                                        <div className={styles.inputWrapper}>
                                            <div className={styles.inputLabel}>Description :</div>
                                            <textarea
                                                className={styles.input}
                                                name='description'
                                                placeholder='Description'
                                                rows={3}
                                                value={item.description}
                                                onChange={(e) => {
                                                    populateCreateTripData(
                                                        tripData, setTripData,
                                                        null, null,
                                                        index, 'description', e.target.value
                                                    )
                                                }}
                                            />
                                        </div>
                                        <div className={styles.inputWrapper}>
                                            <div className={styles.inputLabel}>Spot :</div>
                                            <Select
                                                className={styles.select}
                                                options={spotOptions[item.place_id]}
                                                value={findSpotSelectedOption(item.place_id, item.spot_id, spotOptions)}
                                                onChange={(e: any) => {
                                                    populateCreateTripData(
                                                        tripData, setTripData,
                                                        null, null,
                                                        index, 'spot_id', e.value
                                                    )
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            {editTripData.data.map((item: editTripSpotData, index: number) => (
                                <div className={styles.tripSpotDetailWrapper} key={index}>
                                    <div className={styles.tripSpotDetailHeadWrapper}>
                                        <div className={styles.order}>Order : {item.order}</div>
                                        <div className={styles.tripSpotActionWrapper}>
                                            <button
                                                className={styles.tripSpotAction}
                                                onClick={() => {
                                                    populateEditTripData(
                                                        editTripData, setEditTripData, editPlaceCountDetails,
                                                        null, index,
                                                    )
                                                }}
                                            >
                                                Remove
                                            </button>
                                            <button
                                                className={styles.tripSpotAction}
                                                onClick={() => {
                                                    populateEditTripData(
                                                        editTripData, setEditTripData, editPlaceCountDetails,
                                                        index + 1, null,
                                                    )
                                                }}
                                            >
                                                Add Spot
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.inputRow}>
                                        <div className={styles.inputWrapper}>
                                            <div className={styles.inputLabel}>Date :</div>
                                            <input
                                                name='date'
                                                className={styles.input}
                                                value={item.date}
                                                onChange={(e) => {
                                                    populateEditTripData(
                                                        editTripData, setEditTripData, editPlaceCountDetails,
                                                        null, null,
                                                        index, 'date', e.target.value
                                                    )
                                                }}
                                            >
                                            </input>
                                        </div>
                                        <div className={styles.inputWrapper}>
                                            <div className={styles.inputLabel}>Place :</div>
                                            <Select
                                                className={styles.select}
                                                options={placeOptions}
                                                value={findPlaceSelectedOption(item.place_id, placeOptions)}
                                                onChange={async (e: any) => {
                                                    await populateEditTripData(
                                                        editTripData, setEditTripData, editPlaceCountDetails,
                                                        null, null,
                                                        index, 'place_id', e.value
                                                    )
                                                    await fetchAllSpotsOptions(e.value, spotOptions, setSpotOptions)
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.inputRow}>
                                        <div className={styles.inputWrapper}>
                                            <div className={styles.inputLabel}>Description :</div>
                                            <textarea
                                                className={styles.input}
                                                name='description'
                                                placeholder='Description'
                                                rows={3}
                                                value={item.description}
                                                onChange={(e) => {
                                                    populateEditTripData(
                                                        editTripData, setEditTripData, editPlaceCountDetails,
                                                        null, null,
                                                        index, 'description', e.target.value
                                                    )
                                                }}
                                            />
                                        </div>
                                        <div className={styles.inputWrapper}>
                                            <div className={styles.inputLabel}>Spot :</div>
                                            <Select
                                                className={styles.select}
                                                options={spotOptions[item.place_id]}
                                                value={findSpotSelectedOption(item.place_id, item.spot_id, spotOptions)}
                                                onChange={(e: any) => {
                                                    populateEditTripData(
                                                        editTripData, setEditTripData, editPlaceCountDetails,
                                                        null, null,
                                                        index, 'spot_id', e.value
                                                    )
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    <button
                        className={styles.submitAction}
                        onClick={() => {
                            if (purpose === 'create') createEditTripDataHandler(tripData, router)
                            else if (purpose === 'edit') editTripDataHandler(editTripData, router)
                        }}
                    >
                        {purpose === 'create' ? 'Create' : 'Edit'}
                    </button>
                </div>
            </div>
        </>
    )
}

export default CreateTripPageComponent