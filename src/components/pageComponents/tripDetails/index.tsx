"use client"
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { TripDetails, TripDetailsComponentProps } from './interfaces'
import NavBar from '@/components/commonComponents/navBar'
import { arrangeDatesInOrder, getValueFromDate, stringToDate } from '@/utils/moment'

const data: TripDetails = {
  "id": 6,
  "description": "Testing Description",
  "amount_spend": 9000,
  "members": "Me,Testing,Balu",
  "trip_name": "Trip Name",
  "places_visited": [
    {
      "place_id": 6,
      "count": 0,
      "place": "Ooty"
    },
    {
      "place_id": 7,
      "count": 1,
      "place": "KodaiKanal"
    },
    {
      "place_id": 14,
      "count": 2,
      "place": "Kolli Hills"
    }
  ],
  "trip_data": {
    "19/02/2024": {
      "Ooty": [
        {
          "date": "19/02/2024",
          "order": 1,
          "description": "First Day Starts in Ooty Testing",
          "place": "Ooty",
          "spot": {
            "id": 2,
            "spot": "Boat House",
            "category": "Boating",
            "image_link": "https://media-cdn.tripadvisor.com/media/photo-s/03/93/9c/0e/kodaikanal-lake.jpg",
            "google_location": "https://www.google.com/maps/@11.0023788,76.9520521,15z?entry=ttu",
            "must_visit": true
          }
        }
      ],
      "KodaiKanal": [
        {
          "date": "19/02/2024",
          "order": 2,
          "description": "Then Go to Kodai in the First Day Testing",
          "place": "KodaiKanal",
          "spot": {
            "id": 1,
            "spot": "Boat House",
            "category": "boating",
            "image_link": "https://media-cdn.tripadvisor.com/media/photo-s/03/93/9c/0e/kodaikanal-lake.jpg",
            "google_location": "https://www.google.com/maps/@11.0023788,76.9520521,15z?entry=ttu",
            "must_visit": true
          }
        },
        {
          "date": "19/02/2024",
          "order": 3,
          "description": "First Day End Testing",
          "place": "KodaiKanal",
          "spot": {
            "id": 5,
            "spot": "Silver Falls",
            "category": "water_falls",
            "image_link": "https://lh5.googleusercontent.com/p/AF1QipNdjhmHKTCMjKECIaGn55STdde-4r-L1MHqJ3eu=s516-k-no",
            "google_location": "https://www.google.com/maps",
            "must_visit": true
          }
        }
      ]
    },
    "20/02/2024": {
      "KodaiKanal": [
        {
          "date": "20/02/2024",
          "order": 4,
          "description": "Second Day Start in Kodai Testing",
          "place": "KodaiKanal",
          "spot": {
            "id": 6,
            "spot": "Pine Forest",
            "category": "garden",
            "image_link": "https://lh5.googleusercontent.com/p/AF1QipOVI0NjbMGja9GnQ13E8kb-s9FRQsexs8Trwiel=s435-k-no",
            "google_location": "https://www.google.com/maps",
            "must_visit": true
          }
        }
      ],
      "Kolli Hills": [
        {
          "date": "20/02/2024",
          "order": 5,
          "description": "Then Go to Kolli in the Second Day Testing",
          "place": "Kolli Hills",
          "spot": {
            "id": 7,
            "spot": "Botanical Garden",
            "category": "garden",
            "image_link": "https://lh5.googleusercontent.com/p/AF1QipOVI0NjbMGja9GnQ13E8kb-s9FRQsexs8Trwiel=s435-k-no",
            "google_location": "https://www.google.com/maps",
            "must_visit": true
          }
        }
      ]
    }
  }
}

const TripDetailsComponent = ({ id }: TripDetailsComponentProps) => {
  const [tripData, setTripData] = useState<TripDetails>(data)
  const [orderedDays, setOrderedDays] = useState<string[]>([])

  useEffect(() => {
    setOrderedDays(arrangeDatesInOrder(Object.keys(tripData.trip_data)))
  }, [tripData])

  return (
    <>
      <NavBar addPlace addState manageState places trips />
      <div className={styles.tripDetailPageWrapper}>
        <div className={styles.tripDetailWrapper}>
          <div className={styles.leftTripDetailWrapper}>
            <div className={styles.tripName}>{tripData?.trip_name}</div>
            <div className={styles.description}><b>Description : </b><span>{tripData?.description}</span></div>
            <div className={styles.placesVisited}>
              <div className={styles.placesHead}>Places Visited :</div>
              {tripData.places_visited.map((item, index) => (
                <div key={index} className={styles.places}>{"-"} {item.place}</div>
              ))}
            </div>
            <div className={styles.amount_spend}>
              <b>Amount Spent : </b><span>₹ {tripData.amount_spend}</span>
            </div>
            <div className={styles.membersWrapper}>
              <div className={styles.membersHead}>
                <div>Members : </div>
                <div className={styles.membersCount}>{tripData.members.split(",").length}</div>
              </div>
              {tripData.members.split(",").map((item, index) => (
                <div key={index} className={styles.members}>- {item}</div>
              ))}
            </div>
          </div>
          <div className={styles.rightTripDetailWrapper}>
            {orderedDays.map((item, index) => (
              <div key={index} className={styles.daysWrapper}>
                <div className={styles.dayHeadWrapper}>
                  <div className={styles.date}>{item} - {getValueFromDate(stringToDate(item), 'day')}</div>
                  <div className={styles.days}>Day {index + 1}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default TripDetailsComponent