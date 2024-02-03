"use client"
import React, { useEffect, useState } from 'react'
import NavBar from '@/components/commonComponents/navBar'
import { States } from './interfaces'
import { getStateHandler } from './helper'
import styles from './styles.module.scss'
import AddEditStatePopup from '@/components/commonComponents/addStatePopup'

const ManageStatePageComponent = () => {
    const [states, setStates] = useState<States[]>([])
    const [editStateId, setEditStateId] = useState<number | undefined>()
    const [editState, setEditState] = useState({
        show: false,
        state: ''
    });

    useEffect(() => {
        getStateHandler(setStates)
    }, [])

    return (
        <>
            {editState.show && (
                <AddEditStatePopup state={editState} setState={setEditState} purpose='edit' id={editStateId} refetchSetState={setStates} />
            )}

            <NavBar addPlace addState places />
            <div className={styles.stateListWrapper}>
                {states.length > 0 ? (
                    <>
                        <h3>States :</h3>
                        <div className={styles.stateListContainer}>
                            {states.map(item => (
                                <div className={styles.stateList}>
                                    <span>{item.state}</span>
                                    <button
                                        className={styles.editStateButton}
                                        onClick={() => {
                                            setEditState({
                                                show: true,
                                                state: item.state
                                            })
                                            setEditStateId(item.id)
                                        }}
                                    >
                                        Edit
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <h3>No States are Available</h3>
                )}
            </div>
        </>
    )
}

export default ManageStatePageComponent