// import './App.css';
// import { Footer } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Analytics from "./Components/Analytics";
import Forbidden from "./Components/Forbidden";

// import Home from "./Components/Home";
import InputImage from "./Components/InputImage";
import LinkPut from "./Components/LinkPut";
import Onboarding from "./Components/Onboarding";
import Payment from "./Components/Payment";
import PlayMusic from "./Components/PlayMusic";
import Profile from "./Components/Profile";
import Services from "./Components/Services";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import UpdateSong from "./Components/UpdateSong";
// import UploadService from "./Components/UploadService";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home/>}></Route> */}
          <Route path="/linkPut" element={<LinkPut/>}></Route>
          <Route path="/updateSong/:id" element={<UpdateSong/>}></Route>
          <Route path="/inputImage/:id" element={<InputImage/>}></Route>
          <Route path="/:username/:songTitle" element={<PlayMusic/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/" element={<Signin/>}></Route>
          <Route path="/onboarding" element={<Onboarding/>}></Route>
          <Route path="/:username" element={<Profile />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/services" element={<Services />}></Route>
          <Route path="/analytics" element={<Analytics />}></Route>
          <Route path="/forbidden" element={<Forbidden />}></Route>
          
        </Routes>
      </Router>
      
    </div>
    
  );
}

export default App;
