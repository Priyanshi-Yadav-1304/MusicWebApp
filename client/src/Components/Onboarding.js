import React, { useEffect, useState } from 'react'
import './Css/Onboarding.css'
import image from './assests/no-image-available-icon-ui-260nw-1458092489-removebg-preview.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Onboarding() {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(image);
  const [name, setName] = useState('');
  const [instaId, setInstaId] = useState('');
  const navigate = useNavigate()
  function handleChange(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFile(reader.result)
      };

  }
  useEffect(() => {
    callAPI();
  }, []);
  const callAPI = async()=>{
      try{
          const id = localStorage.getItem('user-id')
          const {data} = await axios.get('http://localhost:4000/user/payment/'+id);
          const {success} = data;
          if(success === false){
            navigate('/payment')
          }else{
            setShow(true)
          }
      }catch(err){
        console.log(err)
        navigate('/payment')
      }
  }
  const handleSubmit = async(e) =>{
   try{
    e.preventDefault();
    if(name.trim().length === 0){
      alert('Please enter name')
      return;
    }
    const id = localStorage.getItem('user-id')
    await axios.post('http://localhost:4000/user/onboarding',{
      id,
      name,
      instaId,
      image:file
    })
    navigate(`/profile`)
   }catch(err){
    console.log(err)
   }
  }
  return (
    <>
      { show ?
      <div className='onboardingpage'>
      <form className='obbox' onSubmit={handleSubmit}>
         <h1>ONBOARDING PAGE</h1>
         <div className='onboard'>
           <div className='onboard1'>
              <img src={file}   alt="" />
              <input  type="file" id="img" onChange={(e)=> handleChange(e)} style={{display:"none"}}/>
              <label  for="img">Upload Photo (optional)</label>
           </div>
           <div className='onboard2'>
            <input type="text" placeholder='Your Artist Name' value={name} onChange={(e) => setName(e.target.value)}/>
            <input type="text" placeholder='Your Instagram Profile (optional)' value={instaId} onChange={(e)=> setInstaId(e.target.value)}/>
            <button type='submit'>Proceed</button>
           </div>
         </div>
      </form>
  </div>
  :<></>
      }
    </>
  )
}

export default Onboarding
