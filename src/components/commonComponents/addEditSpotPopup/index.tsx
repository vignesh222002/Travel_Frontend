import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { AddEditSpotPopupProps, SpotSelectedOption } from './interfaces';
import { SpotDetails } from '@/components/pageComponents/placeDetails/interfaces';
import { addSpotHandler, categoryOptions, editSpotHandler, seasonOptions, spotFieldsChangeHandler, timingOptions } from './helper';
import Select from 'react-select';

const AddEditSpot = ({ purpose, placeId, editSpotData, setPopup, setPlace }: AddEditSpotPopupProps) => {
    const [state, setState] = useState<SpotDetails>({
        category: editSpotData.category,
        description: editSpotData.description,
        google_location: editSpotData.google_location,
        image_link: editSpotData.image_link,
        must_visit: editSpotData.must_visit,
        place_id: placeId,
        season: editSpotData.season,
        spot: editSpotData.spot,
        timing: editSpotData.timing,
    })
    const [selectedOption, setSelectedOption] = useState<SpotSelectedOption>({
        category: { label: '', value: '' },
        timing: { label: '', value: '' },
        season: { label: '', value: '' },
    })
    const mustVisitRef = useRef(null);

    useEffect(() => {
        if (editSpotData.category && editSpotData.timing && editSpotData.season) {
            setSelectedOption({
                category: categoryOptions.find(item => item.value === editSpotData.category) ?? { label: '', value: '' },
                season: seasonOptions.find(item => item.value === editSpotData.season) ?? { label: '', value: '' },
                timing: timingOptions.find(item => item.value === editSpotData.timing) ?? { label: '', value: '' }
            })
        }
    }, [editSpotData])

    return (
        <div className={styles.addEditSpotPopupWrapper}>
            <div className={styles.addEditSpotPopup}>
                <div className={styles.inputContents}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <span className={styles.span}>Spot Name :</span>
                            <input
                                id='spot'
                                type="text"
                                placeholder='Spot Name'
                                value={state.spot}
                                className={styles.input}
                                onChange={(e) => {
                                    spotFieldsChangeHandler(setState, e.target.id, e.target.value)
                                }}
                            />
                        </div>
                        <div className={styles.column}>
                            <span className={styles.span}>Category :</span>
                            <Select
                                value={selectedOption.category}
                                options={categoryOptions}
                                className={styles.select}
                                onChange={(e: any) => {
                                    setSelectedOption(prev => ({
                                        ...prev,
                                        category: categoryOptions.find(item => item.value === e.value) ?? { label: '', value: '' }
                                    }))
                                    spotFieldsChangeHandler(setState, 'category', e.value)
                                }}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.column}>
                            <span className={styles.span}>Season :</span>
                            <Select
                                value={selectedOption.season}
                                options={seasonOptions}
                                className={styles.select}
                                onChange={(e: any) => {
                                    setSelectedOption(prev => ({
                                        ...prev,
                                        season: seasonOptions.find(item => item.value === e.value) ?? { label: '', value: '' }
                                    }))
                                    spotFieldsChangeHandler(setState, 'season', e.value)
                                }}
                            />
                        </div>
                        <div className={styles.column}>
                            <span className={styles.span}>Timing :</span>
                            <Select
                                value={selectedOption.timing}
                                options={timingOptions}
                                className={styles.select}
                                onChange={(e: any) => {
                                    setSelectedOption(prev => ({
                                        ...prev,
                                        timing: timingOptions.find(item => item.value === e.value) ?? { label: '', value: '' }
                                    }))
                                    spotFieldsChangeHandler(setState, 'timing', e.value)
                                }}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.column}>
                            <span className={styles.span}>Google Location :</span>
                            <input
                                id='google_location'
                                type="text"
                                placeholder='Google Location'
                                value={state.google_location}
                                className={styles.input}
                                onChange={(e) => {
                                    spotFieldsChangeHandler(setState, e.target.id, e.target.value)
                                }}
                            />
                        </div>
                        <div className={styles.column}>
                            <span className={styles.span}>Image Link :</span>
                            <input
                                id='image_link'
                                type="text"
                                placeholder='Image Link'
                                value={state.image_link}
                                className={styles.input}
                                onChange={(e) => {
                                    spotFieldsChangeHandler(setState, e.target.id, e.target.value)
                                }}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.column}>
                            <span className={styles.span}>Google Location :</span>
                            <input
                                id='description'
                                type="text"
                                placeholder='Description'
                                value={state.description}
                                className={styles.input}
                                onChange={(e) => {
                                    spotFieldsChangeHandler(setState, e.target.id, e.target.value)
                                }}
                            />
                        </div>
                        <div className={styles.column}>
                            <input
                                id='must_visit'
                                type="checkbox"
                                className={styles.checkbox}
                                checked={state.must_visit}
                                onChange={(e) => {
                                    spotFieldsChangeHandler(setState, e.target.id, e.currentTarget.checked)
                                }}
                                ref={mustVisitRef}
                            />
                            <span
                                className={styles.checkboxSpan}
                                onClick={() => {
                                    // @ts-ignore
                                    mustVisitRef.current.click()
                                }}
                            >
                                Must Visit
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.submitWrapper}>
                    <button
                        className={styles.submitPlace}
                        onClick={() => {
                            if (purpose === 'create') {
                                addSpotHandler(state, setPopup, setState, setSelectedOption, placeId, setPlace)
                            }
                            else if (purpose === 'edit') {
                                editSpotHandler({ ...state, id: editSpotData.id ?? 0 }, setPopup, setState, setSelectedOption, placeId, setPlace)
                            }
                        }}
                    >
                        {purpose === 'create' ? 'Add' : 'Edit'}
                    </button>
                    <button
                        className={styles.submitPlace}
                        onClick={() => {
                            setPopup({ add: false, edit: false })
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddEditSpot;