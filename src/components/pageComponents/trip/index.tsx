"use client"
import NavBar from "@/components/commonComponents/navBar"
import styles from './styles.module.scss'
import TripCard from "@/components/commonComponents/tripCard"
import { useEffect, useState } from "react"
import { AllTripApiData } from "./interfaces"
import { getAllTripsHandler } from "./helper"
import { useRouter } from "next/navigation"

const TripsPageComponent = () => {
    const router = useRouter();
    const [tripData, setTripData] = useState<AllTripApiData>({
        trip_data: [
            {
                amount_spend: 0,
                dates: [],
                description: '',
                id: 0,
                members: '',
                place_image_link: '',
                places: [],
                trip_name: '',
                places_visited: [],
            }
        ],
        places_visited: [],
        total_amount_spent: 0,
        total_days_spent: 0,
        total_multiday_trips: 0,
        total_oneday_trips: 0,
        total_places_visited: 0,
        total_trips: 0,
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
                        <div className={styles.total}>
                            <b>Total Trips: </b>
                            <span>{tripData.total_trips}</span>
                        </div>
                        <div className={styles.total}>
                            <b>Amount Spent: </b>
                            <span>₹ {tripData.total_amount_spent}</span>
                        </div>
                        <div className={styles.total}>
                            <b>Days Spent: </b>
                            <span>{tripData.total_days_spent}</span>
                        </div>
                        <div className={styles.total}>
                            <b>Oneday Trips: </b>
                            <span>{tripData.total_oneday_trips}</span>
                        </div>
                        <div className={styles.total}>
                            <b>Multidays Trips: </b>
                            <span>{tripData.total_multiday_trips}</span>
                        </div>
                        <div className={styles.total}>
                            <b>Places Visited: </b>
                            <span>{tripData.total_places_visited}</span>
                        </div>
                    </div>
                    <div className={styles.rightTripsWrapper}>
                        <div className={styles.tripHeader}>
                            <h3 className={styles.tripHead}>Trips</h3>
                            <div className={styles.tripActions}>
                                <button
                                    className={styles.addTripButton}
                                    onClick={() => router.push('/trips/create')}
                                >
                                    Add Trip
                                </button>
                            </div>
                        </div>
                        {tripData?.trip_data?.map((item, index) => (
                            <TripCard
                                key={item.id}
                                dates={item.dates}
                                description={item.description}
                                id={item.id}
                                place_image_link={item.place_image_link}
                                places={item.places}
                                tripNumber={tripData?.trip_data?.length - index}
                                amount_spend={item.amount_spend}
                                members={item.members}
                                trip_name={item.trip_name}
                                places_visited={item.places_visited}
                                setTripData={setTripData}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TripsPageComponent