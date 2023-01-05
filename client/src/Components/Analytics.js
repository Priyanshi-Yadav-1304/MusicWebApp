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
  const getGraph = (song_id) =>{
      console.log({song_id})
    getClicksByMonth(song_id);
    setOpenUser(true);
   
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
    <div className='analytics-page'>
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
               <BackgroundImage className='lower-card-analytics-image' onClick={() => getGraph(song._id)} src={analytics}></BackgroundImage>
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
          <select class="monthsdiv">
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
       </div>
        
       <div className='countrydiv'>
            <h1>Total Clicks</h1>
             <p>505</p>
       </div>
      
          </div>
        
        
      </Modal>
        <Footer />
    </div>
  )
}

export default Analytics
