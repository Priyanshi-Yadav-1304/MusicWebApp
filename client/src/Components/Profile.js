import React, { useEffect, useState } from 'react'
import './Css/PlayMusic.css'
import './Css/Profile.css'
import instagram from './assests/icons8-instagram-48.png'
import phone from './assests/icons8-phone-50.png'
import whatsapp from './assests/icons8-whatsapp-32.png'
import correct from './assests/icons8-correct-48 (2).png'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { BackgroundImage, Button, FileInput, Group, LoadingOverlay, Modal, Textarea, TextInput } from '@mantine/core';
import { IconUpload } from '@tabler/icons';
import Footer from './Footer'
import Axios from '../AxiosConfig/Axios'

function Profile() {
  const [User, setUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState('');
  const [about, setAbout] = useState('');
  const [profession, setProfession] = useState('');
  const [instaId,setInstaId] = useState('');
  const [service, setService] = useState([]);
  const [url, setUrl] = useState([]);
  const [loader, setLoader] = useState(false);
  const [latestSong, setLatestSong] = useState('');
  const [embededUrl, setEmbededUrl] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const {username} = useParams();
  useEffect(() => {
    getServices();
  },[]);
  const getServices = async() => {
    try{
      setLoader(true);
      const {data} = await axios.get('http://localhost:4000/service/getService');
      const {services} = data;
      setService(services);
      getUserProfile(services);
      setLoader(false)
    }catch(err){
      setLoader(false)
      console.log({err})
    }
  }
  const getUserProfile = async(services)=>{
    try{
      const {data} = await Axios({
        method:'POST',
        url:`/user/profile/${username}`,
      })
      const {user} = data;
      setUser(user);
      setEmbededUrl(user.latestSong.trim() ? true : false);
      setShowEdit(data.editable)
      let urlArray = [];
      services.forEach((link)=>{
        let flag = true;
        user.profileLinks.forEach((newLink)=>{
            if(link.secure_url == newLink.image_url){
              urlArray = [...urlArray,newLink];
              flag = false;
            }
        })
        if(flag){
          urlArray = [...urlArray, {image_url:link.secure_url,song_url:'',service_id:link._id}];
        }
      })
      setUrl([...urlArray]);
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
       await axios.post(`http://localhost:4000/user/updateProfile`,{
        image:file,
        about,
        profession,
        instaId,
        id,
        latestSong,
        service:url
      });
      getUserProfile();
      setOpenModal(false)
    }catch(err){
      console.log({err})
    }
    console.log('end')
  }
  const openEditForm = () =>{
    setInstaId(User.instaId);
    setAbout(User.about);
    setProfession(User.profession);
    setLatestSong(User.latestSong)
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
  const handleUrl = (e,index) =>{
    const image_url = url[index].image_url;
    const song_url = e.target.value;
    let urlArray = url;
    urlArray[index]= {image_url,song_url};
    setUrl([...urlArray])
  }
  console.log({url})
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
         <TextInput
         className='edit-input'
       label="Latest song on youtube"
       placeholder='Enter your latest song url from youtube'
       value={latestSong}
       onChange={(e) => setLatestSong(e.target.value)}
        />
        {
          url.map((s,index)=>{
            return <Group>
            <BackgroundImage src={s.image_url} className='profile-service-modal'></BackgroundImage>
            <TextInput
         className='edit-input link-input-modal'
       value={s.song_url}
       onChange={(e) => handleUrl(e,index)}
        />
        </Group>
          })
        }
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
                {
                  showEdit && (
                    <button style={{border:'none',padding:'1vmin',color:'white',cursor:'pointer',backgroundColor:'#20a8d0',marginTop:'1vmin'}} onClick={()=> openEditForm()}>Edit Profile</button>
                  )
                }
                <img src={correct} alt="" />
                </div>
                <p className='job'>{User.profession}</p>
                <p className='discription'>{User.about}</p>
              </div>
             </div>
             {
              embededUrl && (
                <div className='pro2'>
                <div className='applink'>
                </div>
                <div className='video'>
                      <iframe className='youtube-frame' width="356" height="200" src={`https://www.youtube.com/embed/${User.latestSong.slice(User.latestSong.indexOf("=")+1)}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
               </div>
              )
             }
        </div>
        <div className='profile-links'>
         <div className='profile-links-option'>
           {
            User.profileLinks.map((service,index)=>{
                    if(service.song_url.trim()){
                      return <div key={index} className='playmusic-service-card profile-link-card'>
                     <BackgroundImage  className='playmusic-service'
                src={`${service.image_url}`}
                radius="sm"
            >
                 </BackgroundImage>
                    <a href={service.song_url} target='_blank'><button className='play-btn'>Play</button></a>
               </div>
                    }else{
                      return <></>
                    }
            })
        }
         </div>
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
     <LoadingOverlay visible={loader} overlayBlur={2} />
     <Footer />
  </>
  )
}

export default Profile
