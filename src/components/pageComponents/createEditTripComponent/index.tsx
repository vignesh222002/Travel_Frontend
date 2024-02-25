import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { CreateEditTripData, CreateEditTripSpotData, CreateTripPageComponentProps, Options, SpotOptions } from './interfaces'
import NavBar from '@/components/commonComponents/navBar'
import Select from 'react-select'
import { createEditTripDataHandler, fetchAllPlaceOptions, fetchAllSpotsOptions, findPlaceSelectedOption, findSpotSelectedOption, populateCreateTripData } from './helper'
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
    const [placeOptions, setPlaceOptions] = useState<Options[]>([])
    const [spotOptions, setSpotOptions] = useState<SpotOptions>({})

    useEffect(() => {
        populateCreateTripData(
            tripData,
            setTripData,
            false,
            null,
        )

        // All Places Options
        fetchAllPlaceOptions(setPlaceOptions)
    }, [])

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
                        value={tripData.trip_name}
                        onChange={(e) => setTripData((prev) => ({ ...prev, trip_name: e.target.value }))}
                    />
                    <div className={styles.inputLabel}>Amount Spent :</div>
                    <input
                        className={styles.tripDataInput}
                        type="number"
                        name='amount_spend'
                        placeholder='Amount Spent'
                        value={tripData.amount_spend}
                        onChange={(e) => setTripData((prev) => ({ ...prev, amount_spend: +(e.target.value) ?? 0 }))}
                    />
                    <div className={styles.inputLabel}>Members :</div>
                    <input
                        className={styles.tripDataInput}
                        type="text"
                        name='members'
                        placeholder='Members'
                        value={tripData.members}
                        onChange={(e) => setTripData((prev) => ({ ...prev, members: e.target.value }))}
                    />
                    <div className={styles.inputLabel}>Description :</div>
                    <textarea
                        className={styles.tripDataInput}
                        name='description'
                        placeholder='Description'
                        rows={3}
                        value={tripData.description}
                        onChange={(e) => setTripData((prev) => ({ ...prev, description: e.target.value }))}
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
                                        true, null,
                                    )
                                }}
                                className={styles.addtripSpotAction}
                            >
                                Add Spot
                            </button>
                        </div>
                    </div>

                    {/* Add Trip Spot Detail Component */}
                    {tripData.data.map((item: CreateEditTripSpotData, index: number) => (
                        <div className={styles.tripSpotDetailWrapper} key={index}>
                            <div className={styles.tripSpotDetailHeadWrapper}>
                                <div className={styles.order}>Order : {item.order}</div>
                                <div className={styles.tripSpotActionWrapper}>
                                    <button
                                        className={styles.tripSpotAction}
                                        onClick={() => {
                                            populateCreateTripData(
                                                tripData, setTripData,
                                                false, index,
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
                                                true, null,
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
                                                false, null,
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
                                                false, null,
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
                                                false, null,
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
                                                false, null,
                                                index, 'spot_id', e.value
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        className={styles.submitAction}
                        onClick={() => createEditTripDataHandler(tripData, router)}
                    >
                        {purpose === 'create' ? 'Create' : 'Edit'}
                    </button>
                </div>
            </div>
        </>
    )
}

export default CreateTripPageComponent