import React, { useEffect, useState } from "react";
import { Router, Routes, Route, Outlet, Link } from "react-router-dom";
import { useTheme } from "react-daisyui"; // apply daisy themes to App
import AllGames from "./pages/AllGames"
import GameInfo from "./pages/GameInfo"
import LoginPage from "./pages/Login"
import VerifyUser from "./components/VerifyUser";
import SignupPage from "./pages/Signup";

const App: React.FC = () => {
// users need to verify their email after signing up!
  const [showVerifyDialog, setShowVerifyDialog] = useState(false);
return (
  <>
  
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<SignupPage />} />
    <Route path="/games" element={<AllGames />} />
    <Route path="/games/:gameId" element={<GameInfo />} />
    {/* Add more routes as needed */}
  </Routes>
  
  </>
)
};

export default App;