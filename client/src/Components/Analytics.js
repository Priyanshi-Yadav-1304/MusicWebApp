import { BackgroundImage, Card, Text, Title } from '@mantine/core'
import React from 'react'
import './Css/Analytics.css'
import editAnalytics from './assests/editAnalytics.jpeg'
import analytics from './assests/analytics.jpeg'
import Footer from './Footer'
const Analytics = () => {
  return (
    <div className='analytics-page'>
       <Card withBorder className='analytics-card'>
         <div className="upper-card-analytics">
            <BackgroundImage className='analytics-image' src='https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'>

            </BackgroundImage>
            <div></div>
            <div className="analytics-card-left">
            <Title order={3}>Clicks</Title>
            <Title order={3}>505</Title>
            </div>
         </div>
         <div className='lower-card-analytics'>
            <BackgroundImage className='lower-card-analytics-image' src={analytics}></BackgroundImage>
            <div></div>
            <BackgroundImage className='lower-card-analytics-image' src={editAnalytics}></BackgroundImage>
         </div>
        </Card>
        <Footer />
    </div>
  )
}

export default Analytics
