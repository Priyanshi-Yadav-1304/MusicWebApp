import { BackgroundImage, Button, Card, CardSection, FileInput, Group, Image, LoadingOverlay, Modal, TextInput } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Css/Service.css";
import deleteIcon from './assests/deleteIcon.png'
import { addUrl } from "../fileIndex";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const LinkPut = () => {
  const [service, setService] = useState([]);
  const [loader,setLoader] = useState(false); 
  const [URLs, setURLs] = useState([]);
  const navigate = useNavigate();
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
      let urlArray = [];
      services.forEach((s,index)=>{
        urlArray = [...urlArray, {image_url:s.secure_url,song_url:''}]
      })
      setURLs(urlArray);
      setLoader(false);
    } catch (err) {
      console.log({ err });
      setLoader(false)
    }
  };
  const deleteService = async (index) =>{
   let arr = service.filter((item,i) => i!==index);
   let urls = URLs.filter((item,i) => i!==index);
   setService(arr);
   setURLs(urls);
  }
  const addSong = async ()=>{
    try{
        setLoader(true)
        const {data} = await axios.post('http://localhost:4000/song/addSong',{
            url:URLs
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
            <Image style={{cursor:'pointer'}} height={30} width={30} src={deleteIcon} onClick={()=> deleteService(index)} color="red.8" variant="light">
              Delete
            </Image>
            </CardSection>
            <TextInput value={URLs[index].url} onChange= {(e)=> addUrl(e,index)} className="service-card-input" placeholder="Enter url here" />
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

export default LinkPut;
