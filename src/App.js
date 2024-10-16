import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TranslationProvider } from "./Context/TranslationContext";
import { ParallaxProvider } from 'react-scroll-parallax';
import Navbar from "./components/Navbar";
import ScoutHomepage from "./Pages/ScoutHomePage";
import Footer from "./components/Footer";
import WhoWeAre from "./Pages/WhoWeAre";
import ScoutEducation from "./Pages/ScoutEducation";
import ScoutMethod from "./Pages/ScoutMethod";
import ScoutPromiseLaw from "./Pages/ScoutPromiseAndLaw";
import WhatWeDo from "./Pages/WhatWeDo";
import Gallery from "./Pages/Gallery";
import WhereWeWork from "./Pages/WhereWeWork";
import GetInvolved from "./Pages/GetInvolved";
import Products from "./Pages/Products";
import LoginPage from "./Pages/Login";
import ScoutingHistoryPage from "./Pages/ScoutingHistory";
import DonationPage from "./Pages/DonationPage";
import DonationPayment from "./Pages/DonationPayment";
import Cart from "./Pages/Cart";
import ProductDescription from "./Pages/ProductDescription";
import OfficeBearersPage from "./Pages/OfficeBearers";

function App() {
  return (
    <Router>
      <ParallaxProvider>
        <TranslationProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<ScoutHomepage />} />
            <Route path="/ScoutHomepage" element={<ScoutHomepage />} />
            <Route path="/whoweare" element={<WhoWeAre />} />
            <Route path="/scout-education" element={<ScoutEducation />} />
            <Route path="/scout-method" element={<ScoutMethod />} />
            <Route path="/scout-promising-law" element={<ScoutPromiseLaw />} />
            <Route path="/what-we-do" element={<WhatWeDo />} />
            <Route path="/where-we-work" element={<WhereWeWork/>} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/product" element={<Products />} />
            <Route path="/product/:id" element={<ProductDescription />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/scouting-history" element={<ScoutingHistoryPage />} />
            <Route path="/donation" element={<DonationPage/>}/>
            <Route path="/donate/:eventId" element={<DonationPayment />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/office-bearers" element={<OfficeBearersPage/>}/>
          </Routes>
          <Footer />
        </TranslationProvider>
      </ParallaxProvider>
    </Router>
  );
}

export default App;