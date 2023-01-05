import { BackgroundImage, Button, Card, CardSection, FileInput, Group, Image, LoadingOverlay, Modal, TextInput, Title } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Css/Service.css";
import deleteIcon from './assests/deleteIcon.png'
import eyeImg from './assests/eye.jpeg'
import { useNavigate } from 'react-router-dom'
const Services = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [File, setFile] = useState("");
  const [service, setService] = useState([]);
  const [loader,setLoader] = useState(false); 
  const [users, setUsers] = useState([]);
  const [openUser, setOpenUser] = useState(false);
  const [totalPaidUsers, setTotalPaidUsers] = useState(0);
  const [totalUnPaidUsers, setTotalUnpaidUsers] = useState(0);
  const [details, setDetails] = useState({
    signUpTime:'',
    signUpDate:'',
    onBoardTime:'',
    onBoardDate:'',
    totalLinks:0,
    totalClicks:0,
    user_id:''
  });
  function handleChange(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFile(reader.result);
    };
  }
  useEffect(() => {
    getService();
  }, []);
  const getService = async () => {
    try {
        setLoader(true);
      const { data } = await axios.get(
        "http://localhost:4000/service/getService"
      );
      const { services } = data;
      setService(services);
      getAllUsers();
      setLoader(false);
    } catch (err) {
      console.log({ err });
      setLoader(false)
    }
  };
  const getAllUsers = async() =>{
    try{
      const {data} = await axios.get("http://localhost:4000/user/users");
      const {users} = data;
      let totalPaid = 0, totalUnPaid = 0;
      users.forEach((user)=>{
        if(user.isPaid){
          totalPaid++;
        }else{
          totalUnPaid++;
        }
      })
      setUsers(users);
      setTotalPaidUsers(totalPaid);
      setTotalUnpaidUsers(totalUnPaid)
    }catch(err){
      console.log({err})
    }
  }
  const addService = async () => {
    try {
        setLoader(true);
      await axios.post("http://localhost:4000/service/addService", {
        image: File,
      });
      getService();
      setLoader(false)
    } catch (err) {
      console.log({ err });
      setLoader(false)
    }
    setOpenModal(false);
  };
  const deleteService = async (id) =>{
    try{
        setLoader(true)
        await axios.post(`http://localhost:4000/service/deleteService`,{
            id
        });
        getService();
        setLoader(false)
    }catch(err){
        console.log({err})
        setLoader(false)
    }
  }
  const getUserInfo = async(user_id) =>{
    try{
      setLoader(true);
      const {data} = await axios.post('http://localhost:4000/song/getDetails',{
        user_id
      })
      const {user,totalLinks,totalClicks} = data;
      let createdAt = new Date(user.createdAt);
      let onBoardAt = new Date(user.onBoardingTime)
      let signUpDate = getDate(createdAt);
      let signUpTime = getTime(createdAt);
      let onBoardDate = getDate(onBoardAt);
      let onBoardTime = getTime(onBoardAt);
      setDetails({signUpTime,signUpDate,onBoardTime,onBoardDate,totalLinks,totalClicks,user_id})
      setOpenUser(true);
      setLoader(false);
    }catch(err){
      console.log({err})
      setLoader(false)
    }
  }
  const blockUser = async (user_id)=>{
      try{
        const res = await axios.post('/user/blockUser',{
          user_id
        })
        console.log({res})
      }catch(err){
        console.log({err});
      }
  }
  const getDate = (createdAt) =>{
    return createdAt.getDate()+'/'+(createdAt.getMonth()+1)+'/'+createdAt.getFullYear();
  }
  const getTime = (createdAt) =>{
    return createdAt.getHours()+':'+createdAt.getMinutes()+':'+createdAt.getSeconds();
  }
  return (
    <div className="service-page">
      <Group>
        <Button
          onClick={() => setOpenModal(true)}
          variant="dark"
          color="green.7"
          fullWidth
          mt="md"
          radius="md"
          style={{ width: "20vmin", margin: "auto" }}
        >
          Add Service
        </Button>
      </Group>
      <div className="service">
        {service.length >= 0 ? (
           service.map((serviceInfo,index) =>
            <Card
            key={index}
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
            className="service-card"
          >
            <CardSection className="card-section-image">
            <BackgroundImage className="service-logo"
                src={serviceInfo.secure_url}
                radius="sm"
            ></BackgroundImage>
            <Image style={{cursor:'pointer'}} height={30} width={30} src={deleteIcon} onClick={()=> deleteService(serviceInfo._id)} color="red.8" variant="light">
              Delete
            </Image>
            </CardSection>
            <TextInput className="service-card-input" placeholder="Enter url here" />
          </Card>
           )
        ) : (
          <></>
        )}
        <Modal opened={openModal} onClose={() => setOpenModal(false)}>
          <form>
            <FileInput
              style={{ marginBottom: "3vmin" }}
              placeholder="Upload image"
              withAsterisk
              onChange={(value) => handleChange(value)}
            />
            <Button onClick={addService}>Save</Button>
          </form>
        </Modal>
        <LoadingOverlay visible={loader} overlayBlur={1} />
      </div>

      {/* DETAILS */}
      <div className="total-info">
        <div>
        <Title order={2}>Total Paid Users {totalPaidUsers}</Title>
        <Title order={2}>Total Unpaid Users {totalUnPaidUsers}</Title>
        </div>
      </div>
      <div className="user-details">
      <Card withBorder className="admin-user-card">
        <Title className="user-analytice-head" order={3}>Non Paid Users</Title>
          {
            users.map((user,index)=>{
              if(!user.isPaid){
                return <div key={index} className="user-card-detail non">
                  <span>Email id : {user.email}</span>
                  <span>Password : {user.password}</span>
               </div>
              }else{
                return <></>
              }
            })
          }
      </Card>
      <Card withBorder className="admin-user-card">
        <Title className="user-analytice-head" order={3}>Paid Users</Title>
          {
            users.map((user,index)=>{
              if(user.isPaid){
                return <div key={index} className="user-card-detail paid-users">
                  <div>
                      <span>email id : {user.email}</span>
                      <span>Password : {user.password}</span>
                  </div>
                 <BackgroundImage onClick={()=> getUserInfo(user._id)} className="paid-users-eye" src={eyeImg}></BackgroundImage>
               </div>
              }else{
                return <></>
              }
            })
          }
      </Card>
      <Modal className="eyebox" size={1000} opened={openUser} onClose={() => setOpenUser(false)}>
          
                 <button className="blockbtn" onClick={()=> blockUser(details.user_id)}>Block</button>
                 <div className="eyeboxmain">
                    <div className="eyeboxbox">
                      <p className="signupeye">Signup Login</p>
                      <div className="Timeloc">
                        <h4>Time:- {details.signUpTime}, {details.signUpDate}</h4>
                        <h4>Location:-</h4>
                      </div>
                    </div>
                    <div className="eyeboxbox">
                        <p className="signupeye">Onboarding Signup</p>
                        <div className="Timeloc">
                          <h4>Time:- {details.onBoardTime}, {details.onBoardDate}</h4>
                          <h4>Location:-</h4>
                        </div>
                    </div>
                 </div>
                <div className="eyeboxmain">
                    <div className="eyeboxbox">
                          <p className="signupeye">Total Links</p>
                            <div className="Timeloc">
                              <h3>{details.totalLinks}</h3>
                              <div className="eyeimg">
                              <div></div>
                               <BackgroundImage onClick={()=> navigate("/analytics")} className="paid-users-eye" src={eyeImg}></BackgroundImage>
                             </div>
                            </div>
                    </div>
                    <div className="eyeboxbox">
                          <p className="signupeye">Total Clicks</p>
                          <div className="Timeloc">
                              <h3>{details.totalClicks}</h3>
                             <div className="eyeimg">
                              <div></div>
                               <BackgroundImage onClick={()=> navigate("/analytics")} className="paid-users-eye" src={eyeImg}></BackgroundImage>
                             </div>
                          </div>
                    </div>
                </div>
      </Modal>
      </div>
    </div>
  );
};

export default Services;
