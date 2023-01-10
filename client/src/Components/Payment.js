import React ,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from '../AxiosConfig/Axios'
import instagram from './assests/icons8-instagram-48.png'
import phone from './assests/icons8-phone-50.png'
import whatsapp from './assests/icons8-whatsapp-32.png'
import './Css/Payment.css'

const Payment = () => {
  const [showPage,setShowPage] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    isLoggedIn();
  }, []);
  const isLoggedIn = async() =>{
    try{
      await Axios({
        method:'GET',
        url:'/user/isLoggedIn'
      })
      setShowPage(true)
    }catch(err){
      navigate('/');
      console.log({err})
    }
  }
  return (
    <>
     {
      showPage && (
        <div className='PaymentPage'>
         <div className='nav'>
            <div></div>
            <h2>ONE BACKLINK</h2>
            <div></div>
        </div>
        <div className='pricingArea'>
          <h1>Pricing</h1>
         <div className='buy'>
         <h1 className='money'>499</h1>
         <h1>999/-</h1>
         </div>
          <ul>
            <li><h1>Feature1</h1></li>
            <li><h1>Feature2</h1></li>
            <li><h1>Feature3</h1></li>
          </ul>
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
      )
     }
    </>
  )
}

export default Payment
