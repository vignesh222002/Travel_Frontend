import React from 'react'
import styles from './styles.module.scss'
import { AddEditStatePopupComponentProps } from './interfaces'
import { addNewState, editState } from './services'

const AddEditStatePopup = ({ state, setState, purpose, id, refetchSetState }: AddEditStatePopupComponentProps) => {
    return (
        <div className={styles.addStatePopupWrapper}>
            <div className={styles.addStatePopup}>
                <div className={styles.addStatePopupHead}>Enter State :</div>
                <input
                    type="text"
                    className={styles.addStatePopupInput}
                    value={state.state}
                    placeholder='Enter State Name'
                    onChange={(e) => {
                        setState(prev => ({
                            ...prev,
                            state: e.target.value
                        }))
                    }}
                />
                <div className={styles.addStateActionWrapper}>
                    <button
                        className={styles.addStateAction}
                        onClick={() => setState({ show: false, state: '' })}
                    >
                        Cancel
                    </button>
                    {purpose === 'create' && (
                        <button
                            className={styles.addStateAction}
                            onClick={() => addNewState(state.state, setState)}
                        >
                            Add
                        </button>
                    )}
                    {purpose === 'edit' && (
                        <button
                            className={styles.addStateAction}
                            onClick={() => editState(state.state, id, setState, refetchSetState)}
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AddEditStatePopup