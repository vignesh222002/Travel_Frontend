import React, { useState } from 'react'
import styles from './styles.module.scss'
import { useRouter } from 'next/navigation'
import { navigateTo } from './helper';
import { NavbarComponentProps } from './interfaces';
import AddEditStatePopup from '../addStatePopup';

const NavBar = ({ places, addPlace, manageState, addState }: NavbarComponentProps) => {
    const router = useRouter();
    const [addStatePopup, setAddStatePopup] = useState({
        show: false,
        state: ''
    });

    return (
        <>
            {addStatePopup.show && (
                <AddEditStatePopup state={addStatePopup} setState={setAddStatePopup} purpose='create' />
            )}

            <div className={styles.navbarWrapper}>
                <div className={styles.navbarLogo}>Travel Planner</div>
                <div className={styles.navbarActions}>
                    {manageState && (
                        <button
                            className={styles.navbarActionButton}
                            onClick={() => navigateTo(router, '/manage_states')}
                        >
                            Manage States
                        </button>
                    )}
                    {places && (
                        <button
                            className={styles.navbarActionButton}
                            onClick={() => navigateTo(router, '/places')}
                        >
                            Places
                        </button>
                    )}
                    {addState && (
                        <button
                            className={styles.navbarActionButton}
                            onClick={() => setAddStatePopup({ show: true, state: '' })}
                        >
                            Add State
                        </button>
                    )}
                    {addPlace && (
                        <button
                            className={styles.navbarActionButton}
                        >
                            Add Place
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}

export default NavBar;