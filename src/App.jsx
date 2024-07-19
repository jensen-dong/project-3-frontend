import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
// import Listings from "./components/Listings/Listings";
import * as authService from "../src/services/authService";
import * as bnbService from "../src/services/bnbService";

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [listings, setListings] = useState([])

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const allListings = await bnbService.getAllListings()
        setListings(allListings)
      } catch (err) {
        console.log(err)
      }
    }
    fetchListings();
  }, [])

  return (
    <>
      <NavBar user={user} handleSignout={handleSignout} />
      <Routes>
        {user ? (
          <Route path="/" element={<Dashboard user={user} listings={listings}/>} />
        ) : (
          <Route path="/" element={<Landing listings={listings}/>} />
        )}
        <Route path="/signup" element={<SignupForm setUser={setUser} />} />
        <Route path="/signin" element={<SigninForm setUser={setUser} />} />
      </Routes>
    </>
  );
};

export default App;
