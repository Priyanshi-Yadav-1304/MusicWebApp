import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../AxiosConfig/Axios";
import "./Css/Signup.css";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const getLocation = async () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        resolve(pos.coords);
      });
    });
  };

  const handleSubmit = async (e) => {
    try {
      if (!validateEmail(email)) return;
      if (!checkPassword(password)) return;
      e.preventDefault();
      const locate = await getLocation();
      const { data } = await Axios({
        method: "POST",
        url: "/user/signup",
        data: {
          email,
          password,
          latitude: locate.latitude,
          longitude: locate.longitude,
        },
      });
      const { success, user } = data;
      if (success) {
        localStorage.setItem("user-id", user._id);
        localStorage.setItem("artist-name", user.artistName);
        navigate("/payment");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const validateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    alert("You have entered an invalid email address!");
    return false;
  };
  const checkPassword = (inputtxt) => {
    var strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (!strongRegex.test(inputtxt)) {
      alert(
        "please enter valid password with , one uppercase, one lowercase , one special symbol and minimum 8 characters"
      );
      return false;
    }
    if (password !== confirmPassword) {
      alert("password and confirm password should match");
      return false;
    }
    return true;
  };
  return (
    <>
      <div className="sign">
        <div>
          <form className="signupbox" onSubmit={(e) => handleSubmit(e)}>
            <h1>SIGN UP PAGE</h1>
            <div className="input">
              <input
                type="text"
                placeholder="Enter Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Re enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button>SIGN UP</button>
          </form>
          <Link className="link" to="/">
            SignIn
          </Link>
        </div>
      </div>
    </>
  );
}

export default Signup;
