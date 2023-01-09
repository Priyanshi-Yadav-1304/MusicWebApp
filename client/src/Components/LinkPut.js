import { BackgroundImage, Button, Card, CardSection, FileInput, Group, Image, LoadingOverlay, Modal, Select, TextInput } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Css/Service.css";
import deleteIcon from './assests/deleteIcon.png'
import { addUrl } from "../fileIndex";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";

const LinkPut = () => {
  const [service, setService] = useState([]);
  const [filterServices,setFilterServices] = useState([]);
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
      setFilterServices(services)
      let urlArray = [];
      services.forEach((s,index)=>{
        urlArray = [...urlArray, {image_url:s.secure_url,song_url:'',service_id:s._id}]
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
   setFilterServices(arr);
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
  console.log({service})
  const onFilterServices = (value) => {
     if(value === ''){
      setFilterServices(service);
      return;
     }
     const filteredServices =  service.filter((service) => service.name.toLowerCase().startsWith(value.toLowerCase()));
     setFilterServices(filteredServices);
  }
  return (
    <div className="service-page">
      <Group>
      <Select
      placeholder="search services"
      searchable
      data={[]}
      onSearchChange={(value) => onFilterServices(value)}
    />
        <Button
          onClick={() => addSong()}
          variant="dark"
          color="green.7"
          fullWidth
          mt="md"
          radius="md"
          style={{ width: "20vmin", margin: "auto" }}
          withAsterisk
        >
          Next
        </Button>
      </Group>
      <div className="service">
        {filterServices?.length >= 0 ? (
           filterServices?.map((serviceInfo,index) =>
            <Card
            key={index}
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
            className="service-card"
          >
            <CardSection  className="card-section-image">
            <BackgroundImage className="service-logo"
                src={serviceInfo.secure_url}
                radius="sm"
            ></BackgroundImage>
            <Image style={{cursor:'pointer'}} height={30} width={30} src={deleteIcon} onClick={()=> deleteService(index)} color="red.8" variant="light">
              Delete
            </Image>
            </CardSection>
            <TextInput withAsterisk required={true} value={URLs[index].url} onChange= {(e)=> addUrl(e,index)} className="service-card-input" placeholder="Enter url here" />
          </Card>
           )
        ) : (
          <>
          </>
        )}
        <LoadingOverlay visible={loader} overlayBlur={1} />
      </div>
        <Footer/>
    </div>
  );
};

export default LinkPut;
