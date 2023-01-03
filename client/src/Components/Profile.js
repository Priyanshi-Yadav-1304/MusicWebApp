import React, { useEffect, useState } from 'react'
import './Css/PlayMusic.css'
import './Css/Profile.css'
// import {Link} from 'react-router-dom'
import insta from './assests/icons8-instagram-48.png'
import instagram from './assests/icons8-instagram-48.png'
import youtubelogo from './assests/icons8-youtube-48.png'
import spotify from './assests/Spotify_Logo_CMYK_Green-removebg-preview.png'
import youtube from './assests/8gzcr6RpGStvZFA2qRt4v6-removebg-preview.png'
import amazone from './assests/56-565024_amazon-logo-png-amazon-png-transparent-png-removebg-preview.png'
import jio from './assests/jiosaavn-logo-300x169-removebg-preview.png'
import soundcloud from './assests/2560px-Soundcloud_logo.svg-removebg-preview.png'
import phone from './assests/icons8-phone-50.png'
import whatsapp from './assests/icons8-whatsapp-32.png'
import correct from './assests/icons8-correct-48 (2).png'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, FileInput, Group, Modal, Textarea, TextInput } from '@mantine/core';
import { IconUpload } from '@tabler/icons';
import Footer from './Footer'

function Profile() {
  const [User, setUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState('');
  const [about, setAbout] = useState('');
  const [profession, setProfession] = useState('');
  const [instaId,setInstaId] = useState('');
  useEffect(() => {
    getUserProfile();
  },[]);
  const getUserProfile = async()=>{
    try{
      const id = localStorage.getItem('user-id')
      const {data} = await axios.post('http://localhost:4000/user/profile',{
        id
      })
      const {user} = data;
      setUser(user);
    }catch(err){
      console.log({err})
    }
  }
  function handleChange(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFile(reader.result)
    };
  }
  const updateProfile = async() => {
    try{
      const id = localStorage.getItem('user-id')
      const res = await axios.post(`http://localhost:4000/user/updateProfile`,{
        image:file,
        about,
        profession,
        instaId,
        id
      });
      getUserProfile();
      setOpenModal(false)
    }catch(err){
      console.log({err})
    }
  }
  const openEditForm = () =>{
    setInstaId(User.instaId);
    setAbout(User.about);
    setProfession(User.profession);
    setOpenModal(true)
  }
  const handleProfession = (e) =>{
    if(e.target.value.length <=40)
    setProfession(e.target.value);
  }
  const handleAbout = (e) =>{
    if(e.target.value.length <= 250)
      setAbout(e.target.value);
  }
  return (
  <> 
    {
      User ?
      <div className='profilepage'>
        <div className='nav'>
            <h2>ONE BACKLINK</h2>
        </div>
        <Modal className='edit-profile'
        opened={openModal}
        onClose={() => setOpenModal(false)}
        title="Edit Profile"
      >
      <FileInput onChange={handleChange} label="Change profile" placeholder="upload profile" icon={<IconUpload size={14} />} />
       <TextInput
       label="Profession"
       className='edit-input'
       placeholder='Enter profession'
       value={profession}
       onChange={(e) => handleProfession(e)}
        />
        <TextInput
        className='edit-input'
       label="About"
       placeholder='Enter something about you'
       value={about}
       onChange={(e) => handleAbout(e)}
        />
         <TextInput
         className='edit-input'
       label="Instagram Id"
       placeholder='Enter your instagram id'
       value={instaId}
       onChange={(e) => setInstaId(e.target.value)}
        />
        <Group className='edit-input'>
          <Button color='teal.7' onClick={updateProfile}>Save</Button>
          <Button color='red.7' onClick={()=> setOpenModal(false)}>Cancel</Button>
        </Group>
      </Modal>

        <div className='profilefirst'>
             <div className='pro1'>
              <div className='prophoto'>
                <img style={{height:"25vmin"}} src={`${User?.image?.secure_url}`} alt="" />
              </div>
              <div className='proname'>
                <div>
                <p className='name'>{User.name}</p>
                <button style={{border:'none',padding:'1vmin',color:'white',cursor:'pointer',backgroundColor:'#38BBFF',marginTop:'1vmin'}} onClick={()=> openEditForm()}>Edit Profile</button>
                <img src={correct} alt="" />
                </div>
                <p className='job'>{User.profession}</p>
                <p className='discription'>{User.about}</p>
              </div>
             </div>
             <div className='pro2'>
              <div className='applink'>
                <div className='insta'>
                  <div></div>
                  <a href={User.instaId} target="_blank"><img style={{height:"4vmin"}} src={insta} alt="" /></a>
                  <p>Instagram</p>
                  <div></div>
                </div>
                <div className='youtube'>
                  <div></div>
                  <img style={{height:"4vmin"}} src={youtubelogo} alt="" />
                  <p>YouTube</p>
                  <div></div>
                </div>
              </div>
              <div className='video'>
              <iframe className='youtube-frame' width="356" height="200" src="https://www.youtube.com/embed/oQ7Jzl6BiTE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
             </div>
        </div>

        <div className='AppArea'>
            <div className='extraspace'></div>
             <div className='aa1'>
               <div>
                    <img style={{height:"5vmin"}} src={spotify} alt="" />
                    <button>Play</button>
               </div>
               <div>
                    <img style={{height:"10vmin"}} src={youtube} alt="" />
                    <button>Play</button>
               </div>
               <div>
                    <img style={{height:"5vmin"}} src={amazone} alt="" />
                    <button>Play</button>
               </div>
               <div>
                    <img style={{height:'4vmin'}} src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Gaana_%28music_streaming_service%29_logo.png/1200px-Gaana_%28music_streaming_service%29_logo.png?20220222152415'  alt="" />
                    <button>Play</button>
               </div>
             </div>
             
            <div className='line'></div>

             <div className='aa2'>
             <div>
                    <img style={{height:"5vmin"}} src="https://cdn2.downdetector.com/static/uploads/logo/amazonmusiclogo_CG06xih.png" alt="" />
                    <button>Play</button>
               </div>
               <div>
                    <img style={{height:'5vmin'}} src="https://www.seekpng.com/png/full/8-84344_samsung-make-google-play-their-default-music-service.png"  alt="" />
                    <button>Play</button>
               </div>
               <div>
                    <img style={{height:'3vmin'}} src={soundcloud} alt="" />
                    <button>Play</button>
               </div>
               <div>
                    <img style={{height:'13vmin'}} src={jio} alt="" />
                    <button>Play</button>
               </div>
             </div>
             <div  className='extraspace'></div>
        </div>


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
    :<></>
    }
     <Footer />
  </>
  )
}

export default Profile
