import {
  BackgroundImage,
  Button,
  Card,
  CardSection,
  FileInput,
  Group,
  Image,
  LoadingOverlay,
  Modal,
  Notification,
  Pagination,
  TextInput,
  Title,
} from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Css/Service.css";

import eyeImg from "./assests/eye.jpeg";
import { useNavigate } from "react-router-dom";
import Axios from "../AxiosConfig/Axios";
import { IconCheck, IconX } from "@tabler/icons";
import PaginationList from "./PaginationList";
const Services = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [File, setFile] = useState("");
  const [service, setService] = useState([]);
  const [loader, setLoader] = useState(false);
  const [users, setUsers] = useState([]);
  const [openUser, setOpenUser] = useState(false);
  const [totalPaidUsers, setTotalPaidUsers] = useState(0);
  const [totalUnPaidUsers, setTotalUnpaidUsers] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [blocked, setBlocked] = useState(false);
  const [unableToBlock, setUnableToBlock] = useState(false);
  const [details, setDetails] = useState({
    signUpTime: "",
    signUpDate: "",
    onBoardTime: "",
    onBoardDate: "",
    totalLinks: 0,
    totalClicks: 0,
    user_id: "",
    country:"Unknown",
  });
  function handleChange(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFile(reader.result);
    };
  }
  useEffect(() => {
    verifyAdmin();
  }, []);
  const verifyAdmin = async () => {
    try {
      const res = await Axios({
        method: "POST",
        url: "/user/isValidAdmin",
      });
      getService();
      setIsAdmin(true);
    } catch (err) {
      navigate("/forbidden");
      console.log({ err });
    }
  };
  const getService = async () => {
    try {
      setLoader(true);
      const {data} = await Axios({
        method:'GET',
        url:'/service/getService'
      })
      const { services } = data;
      setService(services);
      getAllUsers();
      setLoader(false);
    } catch (err) {
      console.log({ err });
      setLoader(false);
    }
  };
  const getAllUsers = async () => {
    try {
      const {data} = await Axios({
        method:'GET',
        url:'/user/users'
      })
      const { users } = data;
      let totalPaid = 0,
        totalUnPaid = 0;
      users.forEach((user) => {
        if (user.isPaid) {
          totalPaid++;
        } else {
          totalUnPaid++;
        }
      });
      setUsers(users);
      setTotalPaidUsers(totalPaid);
      setTotalUnpaidUsers(totalUnPaid);
    } catch (err) {
      console.log({ err });
    }
  };
  const addService = async () => {
    try {
      setLoader(true);
      await Axios({
        method: "POST",
        url: "/service/addService",
        data: {
          image: File,
          name: serviceName,
        },
      });
      getService();
      setLoader(false);
    } catch (err) {
      console.log({ err });
      setLoader(false);
    }
    setOpenModal(false);
  };
  const deleteService = async (id) => {
    try {
      setLoader(true);
      await Axios({
        method: "POST",
        url: `/service/deleteService/${id}`,
      });
      getService();
      setLoader(false);
    } catch (err) {
      console.log({ err });
      setLoader(false);
    }
  };
  const getUserInfo = async (user_id,index) => {
    try {
      setLoader(true);
      const { data } = await Axios({
        method: "POST",
        url: "/song/getDetails",
        data: {
          user_id,
        },
      });
      const { user, totalLinks, totalClicks } = data;
      let createdAt = new Date(user.createdAt);
      let onBoardAt = new Date(user.onBoardingTime);
      let signUpDate = getDate(createdAt);
      let signUpTime = getTime(createdAt);
      let onBoardDate = getDate(onBoardAt);
      let onBoardTime = getTime(onBoardAt);
      setDetails({
        signUpTime,
        signUpDate,
        onBoardTime,
        onBoardDate,
        totalLinks,
        totalClicks,
        user_id,
        country:users[index].country
      });
      setOpenUser(true);
      setLoader(false);
    } catch (err) {
      console.log({ err });
      setLoader(false);
    }
  };
  const blockUser = async (user_id) => {
    try {
      const res = await axios.post("/user/blockUser", {
        user_id,
      });
       setBlocked(true);
    } catch (err) {
      console.log({ err });
      setUnableToBlock(true);
    }
  };
  const getDate = (createdAt) => {
    return (
      createdAt.getDate() +
      "/" +
      (createdAt.getMonth() + 1) +
      "/" +
      createdAt.getFullYear()
    );
  };
  const getTime = (createdAt) => {
    return (
      createdAt.getHours() +
      ":" +
      createdAt.getMinutes() +
      ":" +
      createdAt.getSeconds()
    );
  };
  return (
    <div className="service-page">
      
      {isAdmin && (
        <>
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
           <PaginationList service={service} deleteService={deleteService}/>
            <Modal opened={openModal} onClose={() => setOpenModal(false)}>
              <form>
                <TextInput
                  withAsterisk
                  className="service-card-input"
                  placeholder="Enter service name"
                  label="service name"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                />
                <FileInput
                  style={{ marginBottom: "3vmin" }}
                  placeholder="Upload image"
                  withAsterisk
                  label="upload image"
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
              <Title className="user-analytice-head" order={3}>
                Non Paid Users
              </Title>
              {users.map((user, index) => {
                if (!user.isPaid) {
                  return (
                    <div key={index} className="user-card-detail non">
                      <span>Email id : {user.email}</span>
                      <span>Password : {user.password}</span>
                    </div>
                  );
                } else {
                  return <></>;
                }
              })}
            </Card>
            <Card withBorder className="admin-user-card">
              <Title className="user-analytice-head" order={3}>
                Paid Users
              </Title>
              {users.map((user, index) => {
                if (user.isPaid) {
                  return (
                    <div key={index} className="user-card-detail paid-users">
                      <div>
                        <span>email id : {user.email}</span>
                        <span>Password : {user.password}</span>
                      </div>
                      <BackgroundImage
                        onClick={() => getUserInfo(user._id,index)}
                        className="paid-users-eye"
                        src={eyeImg}
                      ></BackgroundImage>
                    </div>
                  );
                } else {
                  return <></>;
                }
              })}
            </Card>
            <Modal
              className="eyebox"
              size={1000}
              opened={openUser}
              onClose={() => setOpenUser(false)}
            >
          {
            blocked && (
              <Notification className='block-notification' onClose={()=> setBlocked(false)}   icon={<IconCheck size={18} />} color="teal">
              User blocked successfully
            </Notification>
            )
          }
      {
        unableToBlock && (
          <Notification className="block-notification" onClose={()=> setUnableToBlock(false)}  icon={<IconX size={18} />} color="red">
          Sorry, something went wrong!
        </Notification>
        )
      }
              <button
                className="blockbtn"
                onClick={() => blockUser(details.user_id)}
              >
                Block
              </button>
              <div className="eyeboxmain">
                <div className="eyeboxbox">
                  <p className="signupeye">Signup Login</p>
                  <div className="Timeloc">
                    <h4>
                      Time:- {details.signUpTime}, {details.signUpDate}
                    </h4>
                    <h4>Location:- {details.country}</h4>
                  </div>
                </div>
                <div className="eyeboxbox">
                  <p className="signupeye">Onboarding Signup</p>
                  <div className="Timeloc">
                    <h4>
                      Time:- {details.onBoardTime}, {details.onBoardDate}
                    </h4>
                    <h4>Location:- {details.country}</h4>
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
                      <BackgroundImage
                        onClick={() => navigate("/analytics")}
                        className="paid-users-eye"
                        src={eyeImg}
                      ></BackgroundImage>
                    </div>
                  </div>
                </div>
                <div className="eyeboxbox">
                  <p className="signupeye">Total Clicks</p>
                  <div className="Timeloc">
                    <h3>{details.totalClicks}</h3>
                    <div className="eyeimg">
                      <div></div>
                      <BackgroundImage
                        onClick={() => navigate("/analytics")}
                        className="paid-users-eye"
                        src={eyeImg}
                      ></BackgroundImage>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </>
      )}
    </div>
  );
};

export default Services;
