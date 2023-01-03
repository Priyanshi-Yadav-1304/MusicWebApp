import { BackgroundImage, Card, Text, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import './Css/Analytics.css'
import editAnalytics from './assests/editAnalytics.jpeg'
import analytics from './assests/analytics.jpeg'
import Footer from './Footer'
import axios from 'axios'
const Analytics = () => {
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    getSongs();
  }, []);
  const getSongs = async() =>{
    try{
      const user_id = localStorage.getItem('user-id')
      const {data} = await axios.post('http://localhost:4000/song/getSongs',{
        user_id
      }) 
      const {songs} = data;
      setSongs(songs)
    }catch(err){
      console.log({err})
    }
  }
  return (
    <div className='analytics-page'>
       {
        songs.map((song,index)=>{
            return <Card key={index} withBorder className='analytics-card'>
            <div className="upper-card-analytics">
               <BackgroundImage className='analytics-image' src={song.image.secure_url}>
   
               </BackgroundImage>
               <div></div>
               <div className="analytics-card-left">
               <Title order={3}>Clicks</Title>
               <Title order={3}>{song.clicked}</Title>
               </div>
            </div>
            <div className='lower-card-analytics'>
               <BackgroundImage className='lower-card-analytics-image' src={analytics}></BackgroundImage>
               <div></div>
               <BackgroundImage className='lower-card-analytics-image' src={editAnalytics}></BackgroundImage>
            </div>
           </Card>
        })
       }
        <Footer />
    </div>
  )
}

export default Analytics
