import { BackgroundImage, Card, Modal, Text, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import './Css/Analytics.css'
import editAnalytics from './assests/editAnalytics.jpeg'
import analytics from './assests/analytics.jpeg'
import Footer from './Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Analytics = () => {
  const [songs, setSongs] = useState([]);
  const [open, setOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [month, setMonth] = useState('january');
  const [clicks, setClicks] = useState(0);
  const navigate = useNavigate();
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
  const getGraph = (clicks) =>{
    //   console.log({song_id})
    // getClicksByMonth(song_id);
    setOpenUser(true);
    setClicks(clicks);
   
  }
  const changeMonth = (e) =>{
      setMonth(e.target.value)
  }
  const getClicksByMonth = async(song_id) => {
    try{

         const res = await axios.get(`http://localhost:4000/song/getClicksByMonth/1/${song_id}`)
         console.log({res})
    }catch(err){
      console.log({err})
    }
  } 
  return (
    <div className="analytics-page">
       {
        songs.map((song,index)=>{
            return <Card key={index} withBorder className='analytics-card'>
            <div className="upper-card-analytics">
               <BackgroundImage className='analytics-image' src={song?.image?.secure_url}>
   
               </BackgroundImage>
               <div></div>
               <div className="analytics-card-left">
               <Title order={3} >Clicks</Title>
               <Title order={3}>{song.clicked}</Title>
               </div>
            </div>
            <div className='lower-card-analytics'>
               <BackgroundImage className='lower-card-analytics-image' onClick={() => getGraph(song.clicked)} src={analytics}></BackgroundImage>
               <div></div>
               <BackgroundImage className='lower-card-analytics-image' src={editAnalytics} onClick={()=> navigate(`/updateSong/${song._id}`)}></BackgroundImage>
            </div>
           </Card>
        })
       }
         <Modal
        opened={open}
        onClose={() => setOpen(false)}
      >
      </Modal>
      <Modal  size={1000} opened={openUser} onClose={() => setOpenUser(false)}>
          <div className='graphbox'>
          <select class="monthsdiv" onChange={changeMonth}>
          <option value="january">January</option>
          <option value="feb">February</option>
          <option value="march">March</option>
          <option value="april">April</option>
          <option value="may">May</option>
          <option value="june">June</option>
          <option value="july">July</option>
          <option value="august">August</option>
          <option value="september">September</option>
          <option value="october">October</option>
          <option value="november">November</option>
          <option value="december">December</option>
       </select>

       <div className='countrydiv'>
            <h1>Country</h1>
            <p>India: 50</p>
            <p>Pakistan: 50</p>
            <p>Australia: 60</p>
            <p>USA: 70</p>
            <p>Portugal: 50</p>
            <p>Japan: 50</p>
            <p>Thailand: 50</p>
            <p>Singapore: 50</p>
            <p>Italy: 50</p>
            <p>New Zealand: 50</p>
            <p>Spain: 50</p>
            <p>Netherlands: 50</p>
            <p>Ireland: 50</p>
            <p>Sri Lanka: 50</p>
            <p>South Africa: 50</p>
            <p>Australia: 50</p>
            <p>Malaysia: 50</p>
            <p>Germany: 50</p>
            <p>Indonesia: 50</p>
            <p>Switzerland: 50</p>
            <p>Canada: 50</p>
            <p>China: 50</p>
            <p>USA: 50</p>
       </div>
        
       <div className='clicksdiv'>
            <h1>Total Clicks</h1>
             <div><h2>{month === 'january'? clicks : "0"}</h2></div>
       </div>
      
          </div>
        
        
      </Modal>
        <Footer />
    </div>
  )
}

export default Analytics
