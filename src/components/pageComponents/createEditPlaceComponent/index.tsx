"use client"
import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import NavBar from '@/components/commonComponents/navBar'
import { CreateEditPlaceComponentProps, PlaceData, Options, SelectedOption } from './interfaces'
import { useRouter } from 'next/navigation'
import { best_time_to_visit_Options, fetchStateOptions, landscapeOptions, placeFieldsChangeHandler } from './helper'
import Select from 'react-select'
import { addNewPlace } from './services'

const CreateEditPlaceComponent = ({ purpose }: CreateEditPlaceComponentProps) => {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState<SelectedOption>({
        state: { label: '', value: 0 },
        landscape: { label: '', value: 0 },
        bestTimeToVisit: { label: '', value: 0 },
    })
    const isVisitedRef = useRef(null);
    const isOneDayTripRef = useRef(null);
    const [Options, setOptions] = useState<Options[]>([{ label: '', value: 0 }])
    const [state, setState] = useState<PlaceData>({
        place: '',
        state_id: 0,
        landscape: '',
        is_visited: false,
        is_oneday_trip: false,
        stay_option: '',
        best_time_to_visit: '',
        description: '',
        image_link: '',
        nearest_place: '',
    })

    useEffect(() => {
        fetchStateOptions(setOptions)
    }, [])

    return (
        <>
            <NavBar manageState addState places />

            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <h2 className={styles.header}>{purpose === 'create' ? 'Add New Place' : 'Edit Place'}</h2>
                    <div className={styles.inputContents}>
                        <div className={styles.row}>
                            <div className={styles.column}>
                                <span className={styles.span}>Place :</span>
                                <input
                                    id='place'
                                    type="text"
                                    placeholder='Place Name'
                                    value={state.place}
                                    className={styles.input}
                                    onChange={(e) => {
                                        placeFieldsChangeHandler(setState, e.target.id, e.target.value)
                                    }}
                                />
                            </div>
                            <div className={styles.column}>
                                <span className={styles.span}>State :</span>
                                <Select
                                    value={selectedOption.state}
                                    options={Options}
                                    className={styles.select}
                                    onChange={(e: any) => {
                                        setSelectedOption(prev => ({
                                            ...prev,
                                            state: Options.find(item => item.value === e.value) ?? { label: '', value: 0 }
                                        }))
                                        placeFieldsChangeHandler(setState, 'state_id', e.value)
                                    }}
                                />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.column}>
                                <span className={styles.span}>Landscape :</span>
                                <Select
                                    value={selectedOption.landscape}
                                    options={landscapeOptions}
                                    className={styles.select}
                                    onChange={(e: any) => {
                                        setSelectedOption(prev => ({
                                            ...prev,
                                            landscape: landscapeOptions.find(item => item.value === e.value) ?? { label: '', value: '' }
                                        }))
                                        placeFieldsChangeHandler(setState, 'landscape', e.value)
                                    }}
                                />
                            </div>
                            <div className={styles.column}>
                                <input
                                    id='is_visited'
                                    type="checkbox"
                                    className={styles.checkbox}
                                    checked={state.is_visited}
                                    onChange={(e) => {
                                        placeFieldsChangeHandler(setState, e.target.id, e.currentTarget.checked)
                                    }}
                                    ref={isVisitedRef}
                                />
                                <span
                                    className={styles.checkboxSpan}
                                    onClick={() => {
                                        // @ts-ignore
                                        isVisitedRef.current.click()
                                    }}
                                >
                                    Is Visited Already
                                </span>
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.column}>
                                <span className={styles.span}>Stay Option :</span>
                                <input
                                    id='stay_option'
                                    type="text"
                                    placeholder='Stay Option'
                                    value={state.stay_option}
                                    className={styles.input}
                                    onChange={(e) => {
                                        placeFieldsChangeHandler(setState, e.target.id, e.target.value)
                                    }}
                                />
                            </div>
                            <div className={styles.column}>
                                <input
                                    id='is_oneday_trip'
                                    type="checkbox"
                                    className={styles.checkbox}
                                    checked={state.is_oneday_trip}
                                    onChange={(e) => {
                                        placeFieldsChangeHandler(setState, e.target.id, e.currentTarget.checked)
                                    }}
                                    ref={isOneDayTripRef}
                                />
                                <span
                                    className={styles.checkboxSpan}
                                    onClick={() => {
                                        // @ts-ignore
                                        isOneDayTripRef.current.click()
                                    }}
                                >
                                    Is Oneday Trip
                                </span>
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.column}>
                                <span className={styles.span}>Best Time to Visit :</span>
                                <Select
                                    value={selectedOption.bestTimeToVisit}
                                    options={best_time_to_visit_Options}
                                    className={styles.select}
                                    onChange={(e: any) => {
                                        setSelectedOption(prev => ({
                                            ...prev,
                                            bestTimeToVisit: best_time_to_visit_Options.find(item => item.value === e.value) ?? { label: '', value: '' }
                                        }))
                                        placeFieldsChangeHandler(setState, 'best_time_to_visit', e.value)
                                    }}
                                />
                            </div>
                            <div className={styles.column}>
                                <span className={styles.span}>Description :</span>
                                <input
                                    id='description'
                                    type="text"
                                    placeholder='Description'
                                    value={state.description}
                                    className={styles.input}
                                    onChange={(e) => {
                                        placeFieldsChangeHandler(setState, e.target.id, e.target.value)
                                    }}
                                />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.column}>
                                <span className={styles.span}>Image Link :</span>
                                <input
                                    id='image_link'
                                    type="text"
                                    placeholder='Image Link'
                                    value={state.image_link}
                                    className={styles.input}
                                    onChange={(e) => {
                                        placeFieldsChangeHandler(setState, e.target.id, e.target.value)
                                    }}
                                />
                            </div>
                            <div className={styles.column}>
                                <span className={styles.span}>Nearest Place :</span>
                                <input
                                    id='nearest_place'
                                    type="text"
                                    placeholder='Nearest Place'
                                    value={state.nearest_place}
                                    className={styles.input}
                                    onChange={(e) => {
                                        placeFieldsChangeHandler(setState, e.target.id, e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.submitWrapper}>
                        <button
                            className={styles.submitPlace}
                            onClick={() => addNewPlace(state, setState, setSelectedOption)}
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateEditPlaceComponent