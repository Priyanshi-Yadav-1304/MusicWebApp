import React from "react";
import "./Css/InputPage.css";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import image from "./assests/no-image-available-icon-ui-260nw-1458092489-removebg-preview.png";
import { useSelector, useDispatch } from "react-redux";
import { addDetails } from "../fileIndex";
import {
  BackgroundImage,
  Button,
  Card,
  CardSection,
  LoadingOverlay,
  TextInput,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function InputImage() {
  const [file, setFile] = useState(image);
  const [loader, setLoader] = useState(false);
  const [artistName, setArtistName] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [instagramId, setInstagramId] = useState('');
  const navigate = useNavigate();
  const {id} = useParams();
  function handleChange(e) {
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFile(reader.result)
    };
  }
  const addSongDetails = async() =>{
      try{
        setLoader(true);
        await axios.post(`http://localhost:4000/song/addSongCover/${id}`,{
          image:file,
          artistName,
          songTitle,
          instaId:instagramId
        });
        setLoader(false);
        navigate(`/playMusic/${id}`)
      }catch(err){
        console.log({err});
        setLoader(false)
      }
  }
  return (
    <>
      <div className="InputPage">
        <Card
          className="input-image-card"
          shadow="sm"
          p="lg"
          radius="md"
          withBorder
        >
          <Title order={2}>Cover</Title>
          <CardSection className="input-image-photo-section">
            <BackgroundImage
              className="input-image-card-photo"
              src={file}
              radius="sm"
            ></BackgroundImage>
            <input
              onChange={(e)=> handleChange(e)}
              type="file"
              id="img"
              name="file"
              style={{ display: "none" }}
            />
            <label htmlFor="img">Upload Image</label>
          </CardSection>
          <CardSection>
            <div className="input-image-input">
              <Title order={4}>Artist Name</Title>
              <TextInput value={artistName} onChange={(e) =>setArtistName(e.target.value)} placeholder="Enter artist name" />
            </div>
            <div className="input-image-input">
              <Title order={4}>Song Title</Title>
              <TextInput value={songTitle} onChange={(e) => setSongTitle(e.target.value)} placeholder="Enter song title" />
            </div>
            <div className="input-image-input">
              <Title order={4}>Instagram ID</Title>
              <TextInput value={instagramId} onChange={(e) => setInstagramId(e.target.value)} placeholder="Enter instagram id" />
            </div>
          </CardSection>
          <Button onClick={addSongDetails}>Save</Button>
        </Card>
        <LoadingOverlay visible={loader} overlayBlur={1} />
      </div>
    </>
  );
}

export default InputImage;
