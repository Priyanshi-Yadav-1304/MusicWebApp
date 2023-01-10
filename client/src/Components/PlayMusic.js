import React,{useEffect, useRef, useState} from 'react'
import './Css/PlayMusic.css'
import insta from './assests/icons8-instagram-26.png'
import instagram from './assests/icons8-instagram-48.png'
import youtubemusic from './assests/play-icon-button-video-vector-isolated-illustration-symbol-white-business-modern-graphic-sign-shape-object-element-circle-web-148064268-removebg-preview.png'
import phone from './assests/icons8-phone-50.png'
import whatsapp from './assests/icons8-whatsapp-32.png'
import profile from './assests/icons8-male-user-48.png'
import {Link, useParams} from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import axios from 'axios'
import { BackgroundImage } from '@mantine/core'
import Footer from './Footer'

function PlayMusic() {
    const [song, setSong] = useState(null);
    useEffect(() => {
       getSongDetails();
    }, []);
    const {username} = useParams();
    const {id} = useParams();
    const getSongDetails =  async () =>{
        try{
            const {data} = await axios.post(`http://localhost:4000/song/getSongDetails/${id}`);
            const {song} = data;
            console.log({song})
            setSong(song)
        }catch(err){
            console.log({err})
        }
    }
  return (
   <> 
    <div className='SongPage'>
        <div className='nav'>
            <div></div>
            <h2>ONE BACKLINK</h2>
            <div>
                
            </div>
        </div>

        <div className='photovideo'>
            <div className='pv1'>
                <div className='pvspace'></div>

                <div className='pvmain'>
                    <div className='imgbox'>
                    <BackgroundImage className='photo-centre'  src={song?.image?.secure_url} >
                    <img style={{width:"40vmin",height:'40vmin'}} src={song?.image?.secure_url} alt="" />
                    </BackgroundImage>
                        
                    </div>
                    <h1>{song?.songTitle}</h1>
                    <p>{username}</p>
                </div>


            </div>
            <div className='pv2'>
                <div className='pvmain2'>
                    <div className='pm21'>
                        <p>{username}</p>
                        <a href={`${song?.instaId}`} target="_blank"><img style={{height:"3.8vmin"}} src={insta} alt="" /></a>
                    </div>
                    <div className='pm22'>
                         <iframe   width="440" height="220" src={`https://www.youtube.com/embed/`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className='pm23'>
                        <div>
                            <img style={{height:"15vmin"}} src={youtubemusic} alt="" />
                            <h1>Music</h1>
                        </div>
                        <button>Play</button>
                    </div>

                </div>
                <div className='pvspace'></div>
            </div>
        </div>

       {
        song ?
        <div className='AppArea'>
         <div className='aa1 right-service'>
           {
            song.socialUrl.map((service,index)=>{
                   if(index < song.socialUrl.length/2)
                    return <div key={index} className='playmusic-service-card'>
                     <BackgroundImage  className='playmusic-service'
                src={`${service.image_url}`}
                radius="sm"
            >
                 </BackgroundImage>
                    <a href={service.song_url} target='_blank'><button className='play-btn'>Play</button></a>
               </div>
               else{
                return<></>
               }
            })
        }
         </div>
        <div className='service-line'></div>
        <div className="aa1">
        {
            song.socialUrl.map((service,index)=>{
                   if(index >= song.socialUrl.length/2)
                    return <div key={index} className='playmusic-service-card'>
                     <BackgroundImage  className='playmusic-service'
                src={`${service.image_url}`}
                radius="sm"
            >
                 </BackgroundImage>
                 <a href={service.song_url} target='_blank'><button className='play-btn'>Play</button></a>
               </div>
               else{
                return<></>
               }
            })
        }
        </div>
    </div>
    :<></>
       }


        <div className='lastOne'>
             <p className='p'>POWERED BY</p>
              <div className='onewali'>
                <span>ONE</span>
                <p>MUSIC RECORDS</p>
              </div>
              <p className='d'>Digitally Distributed By One Music Records Distribution</p>
              <div className='twowali'>
                <a href="https://www.onemusicrecordsofficial.com" target="_blank" style={{textDecoration:'none',color:'rgb(18,175,255)'}}><p>www.onemusicrecordsofficial.com</p></a>
                <a href="https://www.onemusicrecordsdistribution.com" target="_blank" style={{textDecoration:'none',color:'rgb(18,175,255)'}}><p>www.onemusicrecordsdistribution.com</p></a>
              </div>
              <div className='threewali'>
                <a href="tel:+917021480255" target="_blank"><img style={{height:"8vmin"}} src={phone} alt="" /></a>
                <a href="https://www.instagram.com/onemusicrecordsofficial/" target="_blank"><img style={{height:"10vmin"}} src={instagram} alt="" /></a>
                <a href="https://api.whatsapp.com/message/CYNLOEAFI5GGP1?autoload=1&app_absent=0" target="_blank"><img style={{height:"10vmin"}} src={whatsapp} alt="" /></a>
              </div>
        </div>
    </div>
    <Footer />
   </>
  )
}

export default PlayMusic
