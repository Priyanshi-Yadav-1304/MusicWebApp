import axios from 'axios'
import React, { useState } from 'react'
import { Link ,useNavigate } from 'react-router-dom';
import './Css/Signup.css'

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const signInAPI =  async (e) =>{
    e.preventDefault();
    try{
      const {data} = await axios.post('http://localhost:4000/user/signIn',{
        email,password
      });
      let {user} = data;
      localStorage.setItem('user-id',user._id)
      localStorage.setItem('artist-name',user.artistName)
      navigate(`/profile`)
    }catch(err){
      const {message} = err.response.data;
      console.log({err})
      alert(message)
    }
  }
  return (
    <>
    <div className='sign'>
         <div>
         <form className='signupbox in' onSubmit={(e) => signInAPI(e)}>
              <h1>LOGIN PAGE</h1>
             <div className='inputLogin'>
             <input type="text" placeholder='Email ID' value={email} onChange={(e)=> setEmail(e.target.value)}/>
              <input type="password" placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
             </div>
              <button>LOG IN</button>
          </form>
          <Link className='link' to="/Signup">Sign Up</Link>
         </div>
    </div>
    </>
  )
}

export default Signin
