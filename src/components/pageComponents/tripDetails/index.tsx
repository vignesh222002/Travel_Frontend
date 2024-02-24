"use client"
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { TripDetails, TripDetailsComponentProps } from './interfaces'
import NavBar from '@/components/commonComponents/navBar'
import { arrangeDatesInOrder, getValueFromDate, stringToDate } from '@/utils/moment'
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import TripSpotCard from '@/components/commonComponents/tripSpotCard'
import { getTripByIdHandler } from './helper'

const TripDetailsComponent = ({ id }: TripDetailsComponentProps) => {
  const [tripData, setTripData] = useState<TripDetails>({
    amount_spend: 0,
    description: '',
    id: id,
    members: '',
    places_visited: [],
    trip_data: {},
    trip_name: ''
  })
  const [orderedDays, setOrderedDays] = useState<string[]>([])
  const [accordions, setAccordions] = useState<string[]>([])

  useEffect(() => {
    if (tripData) setOrderedDays(arrangeDatesInOrder(Object?.keys(tripData?.trip_data)))
  }, [tripData])

  useEffect(() => {
    setAccordions(orderedDays.map((item, id) => `${id}`))
  }, [orderedDays])

  useEffect(() => {
    getTripByIdHandler(id, setTripData);
  }, [id])

  return (
    <>
      <NavBar addPlace addState manageState places trips />
      {tripData ? (
        <div className={styles.tripDetailPageWrapper}>
          <div className={styles.tripDetailWrapper}>
            <div className={styles.leftTripDetailWrapper}>
              <div className={styles.tripName}>{tripData?.trip_name}</div>
              <div className={styles.description}><b>Description : </b><span>{tripData?.description}</span></div>
              <div className={styles.placesVisited}>
                <div className={styles.placesHead}>Places Visited :</div>
                {tripData?.places_visited.map((item, index) => (
                  <div key={index} className={styles.places}>{"-"} {item.place}</div>
                ))}
              </div>
              <div className={styles.amount_spend}>
                <b>Amount Spent : </b><span>₹ {tripData?.amount_spend}</span>
              </div>
              <div className={styles.membersWrapper}>
                <div className={styles.membersHead}>
                  <div>Members : </div>
                  <div className={styles.membersCount}>{tripData?.members?.split(",").length}</div>
                </div>
                {tripData?.members.split(",").map((item, index) => (
                  <div key={index} className={styles.members}>- {item}</div>
                ))}
              </div>
            </div>
            <div className={styles.rightTripDetailWrapper}>
              {accordions?.length ? (
                <Accordion allowMultipleExpanded allowZeroExpanded preExpanded={accordions} className={`accordions`}>
                  {orderedDays.map((date, index) => (
                    <div key={index} className={styles.daysWrapper}>
                      <AccordionItem uuid={`${index}`} className={`accordion__item ${styles.accordion__item}`} key={index} >
                        <AccordionItemHeading>
                          <AccordionItemButton className={`accordion__button ${styles.accordion__button}`}>
                            <div className={styles.dayHeadWrapper}>
                              <div className={styles.days}>Day {index + 1}</div>
                              <div className={styles.date}>{date} - {getValueFromDate(stringToDate(date), 'day')}</div>
                            </div>
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel className={`accordion__panel ${styles.accordion__panel}`}>


                          {Object.keys(tripData?.trip_data[date]).map((placeKey, index) => (
                            <div key={index} className={styles.places}>

                              <div className={styles.placeHeadWrapper}>
                                <div className={styles.placeName}><span>Place: </span> {placeKey}</div>
                                <div className={styles.placeCount}>
                                  {tripData?.places_visited?.find(item => item.place === placeKey)?.count}
                                  {(tripData?.places_visited?.find(item => item.place === placeKey)?.count === 1)
                                    ?
                                    'st' : (tripData?.places_visited?.find(item => item.place === placeKey)?.count === 2)
                                      ?
                                      'nd' : (tripData?.places_visited?.find(item => item.place === placeKey)?.count === 3)
                                        ?
                                        'rd' : 'th'
                                  } Time
                                </div>
                              </div>

                              {/* Spots Card */}
                              {tripData?.trip_data[date][placeKey].map((tripSpot, index) => (
                                <TripSpotCard data={tripSpot} />
                              ))}
                            </div>
                          ))}
                        </AccordionItemPanel>
                      </AccordionItem>
                    </div>
                  ))}
                </Accordion>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default TripDetailsComponent