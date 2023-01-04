import { BackgroundImage, Button, Card, CardSection, FileInput, Group, Image, LoadingOverlay, Modal, TextInput } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Css/Service.css";
import deleteIcon from './assests/deleteIcon.png'
import { addUrl } from "../fileIndex";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";

const UpdateSong = () => {
  const [loader,setLoader] = useState(false); 
  const [URLs, setURLs] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(() => {
    if(id){
      getSongDetails()
    }
  }, []);
 const getSongDetails = async () =>{
  try{
      const {data} = await axios.get(`http://localhost:4000/song/getSongToUpdate/${id}`);
      const {newServices} = data;
    //   setService(data.newservices);
    //   let urlArray = [];
    //   newServices.forEach((s,index)=>{
    //     urlArray = [...urlArray, {image_url:s.secure_url,song_url:'',service_id:s._id}]
    //   })
      setURLs(newServices);
  }catch(err){
    console.log({err})
  }
 }
  const deleteService = async (index) =>{
   let urls = URLs.filter((item,i) => i!==index);
   setURLs(urls);
  }
  const addSong = async ()=>{
    try{
        const id = localStorage.getItem('user-id');
        setLoader(true)
        const {data} = await axios.post('http://localhost:4000/song/addSong',{
            url:URLs,
            user_id:id
        });
        const {song} = data;
        setLoader(false);
        navigate(`/inputImage/${song._id}`);
    }catch(err){
        setLoader(false)
        console.log({err})
    }
  }
  const addUrl = (e,index) =>{
    const image_url = URLs[index].image_url;
    const song_url = e.target.value;
    let urlArray = URLs;
    urlArray[index]= {image_url,song_url};
    setURLs([...urlArray])
  }
  return (
    <div className="service-page">
      <Group>
        <Button
          onClick={() => addSong()}
          variant="dark"
          color="green.7"
          fullWidth
          mt="md"
          radius="md"
          style={{ width: "20vmin", margin: "auto" }}
        >
          Next
        </Button>
      </Group>
      <div className="service">
        {URLs.length >= 0 ? (
           URLs.map((serviceInfo,index) =>
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
                src={serviceInfo.image_url}
                radius="sm"
            ></BackgroundImage>
            <Image style={{cursor:'pointer'}} height={30} width={30} src={deleteIcon} onClick={()=> deleteService(index)} color="red.8" variant="light">
              Delete
            </Image>
            </CardSection>
            <TextInput value={URLs[index].song_url} onChange= {(e)=> addUrl(e,index)} className="service-card-input" placeholder="Enter url here" />
          </Card>
           )
        ) : (
          <></>
        )}
        <LoadingOverlay visible={loader} overlayBlur={1} />
      </div>
        <Footer/>
    </div>
  );
};

export default UpdateSong;
