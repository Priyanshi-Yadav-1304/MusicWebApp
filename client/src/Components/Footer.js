import React from 'react'
import './Css/Footer.css'
import twiter from './assests/icons8-twitter-48.png'
import facebook from './assests/icons8-facebook-48.png'
import insta from './assests/icons8-instagram-48.png'
import mess from './assests/icons8-facebook-messenger-48.png'
import email from './assests/icons8-envelope-48.png'
import { Link } from 'react-router-dom'
import addImg from './assests/icons8-add-48.png'
import analyticsImg from './assests/analytics2.jpeg'
import profileImg from './assests/profile.jpeg'
import { BackgroundImage } from '@mantine/core'
function Footer() {
  return (
   <>
    <div className="footer-nav">
      <Link to='/LinkPut'><BackgroundImage className='footer-img' src={addImg}></BackgroundImage></Link>
      <Link to='/analytics'><BackgroundImage className='footer-img' src={analyticsImg}></BackgroundImage></Link>
      <Link to='/profile'><BackgroundImage className='footer-img' src={profileImg}></BackgroundImage></Link>
    </div>
   </>
  )
}

export default Footer
