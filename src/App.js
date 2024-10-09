import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TranslationProvider } from "./Context/TranslationContext";
import Navbar from "./components/Navbar";
import ScoutHomepage from "./Pages/ScoutHomePage";
import Footer from "./components/Footer";
import WhoWeAre from "./Pages/WhoWeAre";
import ScoutEducation from "./Pages/ScoutEducation"; // Import the new component


function App() {
  return (
    <Router>
      <TranslationProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<ScoutHomepage />} />
          <Route path="/ScoutHomepage" element={<ScoutHomepage />} />
          <Route path="/whoweare" element={<WhoWeAre />} />
          <Route path="/scout-education" element={<ScoutEducation />} /> {/* Updated Route */}
          <Route path="/what-we-do" element={<div>What We Do Page</div>} />
          <Route path="/where-we-work" element={<div>Where We Work Page</div>} />
          <Route path="/get-involved" element={<div>Get Involved Page</div>} />
          <Route path="/shop" element={<div>Shop Page</div>} />
        </Routes>
        <Footer />
     
      </TranslationProvider>
    </Router>
  );
}

export default App;
