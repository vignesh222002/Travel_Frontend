"use client"
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import NavBar from '@/components/commonComponents/navBar';
import { getPlaceDetailsHandler } from './helper';
import { PlaceDetails, PlaceDetailsPageComponentProps, SpotDetails, SpotPopupState } from './interfaces';
import Image from 'next/image';
import landscapeLogo from '../../../assests/svg/beach_holiday_vacations_sun_tree_sea_landscape_icon_179508.svg'
import { navigateTo } from '@/utils/router';
import { useRouter } from 'next/navigation';
import { deletePlace } from './services';
import SpotComponent from '@/components/commonComponents/spotCard';
import AddEditSpot from '@/components/commonComponents/addEditSpotPopup';

const PlaceDetailsPageComponent = ({ id }: PlaceDetailsPageComponentProps) => {
    const router = useRouter()
    const [place, setPlace] = useState<PlaceDetails>({
        best_time_to_visit: '',
        description: '',
        id: 0,
        image_link: '',
        is_oneday_trip: false,
        is_visited: false,
        landscape: '',
        place: '',
        spots: [],
        state_id: 0,
        stay_option: '',
        state: {
            state: ''
        },
        nearest_place_ref: {
            nearest_place: ''
        }
    })
    const [spotPopup, setSpotPopup] = useState<SpotPopupState>({
        add: false,
        edit: false,
    })
    const [editSpotData, setEditSpotData] = useState<SpotDetails>({
        category: '',
        description: '',
        google_location: '',
        image_link: '',
        must_visit: false,
        place_id: 0,
        season: '',
        spot: '',
        timing: '',
        id: 0
    })

    useEffect(() => {
        getPlaceDetailsHandler(id, setPlace);
    }, [id])

    return (
        <>
            <NavBar addPlace addState manageState places trips />
            {spotPopup.add ? (
                <AddEditSpot editSpotData={editSpotData} placeId={id} purpose='create' setPopup={setSpotPopup} setPlace={setPlace} />
            ) : spotPopup.edit && (
                <AddEditSpot editSpotData={editSpotData} placeId={id} purpose='edit' setPopup={setSpotPopup} setPlace={setPlace} />
            )}
            <div className={styles.placeDetailPageWrapper}>
                <div className={styles.placeDetailWrapper}>
                    <div className={styles.leftPlaceDetailsWrapper}>
                        <div className={styles.placeHeader}>
                            <div className={styles.place}>{place?.place}</div>
                            <div className={styles.state}>{place?.state.state}</div>
                        </div>
                        <div className={styles.placeDetailsContent}>
                            <div className={styles.landscapeWrapper}>
                                <Image className={styles.landscapeLogo} src={landscapeLogo} alt='landscape logo' />
                                <div className={styles.landscape}>{place?.landscape}</div>
                            </div>
                            <div className={styles.isOnedayTrip}>{place?.is_oneday_trip ? 'One Day Trip' : 'Many Days Trip'}</div>
                            <div
                                className={styles.isVisited}
                                style={{ color: place?.is_visited ? 'green' : 'red' }}
                            >
                                {place?.is_visited ? 'Already Visited' : 'Not Visited Yet'}
                            </div>
                            <div className={styles.description}><b>Description : </b><span className={styles.values}>{place?.description}</span></div>
                            <div className={styles.stayOption}><b>Stay : </b><span className={styles.values}>{place?.stay_option}</span></div>
                        </div>
                    </div>
                    <div className={styles.rightPlaceSpotsWrapper}>
                        <div className={styles.spotHeader}>
                            <h3 className={styles.spotHead}>Spots</h3>
                            <div className={styles.placeActions}>
                                <button
                                    className={styles.editPlaceButton}
                                    onClick={() => setSpotPopup(prev => ({ ...prev, add: true }))}
                                >
                                    Add Spot
                                </button>
                                <button
                                    className={styles.editPlaceButton}
                                    onClick={() => navigateTo(router, `/places/${id}/edit`)}
                                >
                                    Edit Place
                                </button>
                                <button
                                    className={styles.editPlaceButton}
                                    onClick={() => deletePlace(id, router)}
                                >
                                    Delete Place
                                </button>
                            </div>
                        </div>
                        {place?.spots?.map(item => (
                            <SpotComponent data={item} key={item.id} setEditSpotData={setEditSpotData} setPopup={setSpotPopup} setPlace={setPlace} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlaceDetailsPageComponent;