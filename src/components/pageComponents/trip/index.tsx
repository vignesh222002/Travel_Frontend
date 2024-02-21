"use client"
import NavBar from "@/components/commonComponents/navBar"
import styles from './styles.module.scss'
import TripCard from "@/components/commonComponents/tripCard"
import { useEffect, useState } from "react"
import { AllTripApiData } from "./interfaces"
import { getAllTripsHandler } from "./helper"

const TripsPageComponent = () => {
    const [tripData, setTripData] = useState<AllTripApiData>({
        data: []
    })

    useEffect(() => {
        getAllTripsHandler(setTripData)
    }, [])

    return (
        <>
            <NavBar addPlace addState manageState places />
            <div className={styles.tripDetailPageWrapper}>
                <div className={styles.tripDetailWrapper}>
                    <div className={styles.leftTripsWrapper}>
                    </div>
                    <div className={styles.rightTripsWrapper}>
                        <div className={styles.tripHeader}>
                            <h3 className={styles.tripHead}>Trips</h3>
                            <div className={styles.tripActions}>
                                <button
                                    className={styles.addTripButton}
                                // onClick={() => setSpotPopup(prev => ({ ...prev, add: true }))}
                                >
                                    Add Trip
                                </button>
                            </div>
                        </div>
                        {tripData?.data?.map((item, index) => (
                            <TripCard
                                key={item.id}
                                dates={item.dates}
                                description={item.description}
                                id={item.id}
                                place_image_link={item.place_image_link}
                                places={item.places}
                                tripNumber={index + 1}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TripsPageComponent