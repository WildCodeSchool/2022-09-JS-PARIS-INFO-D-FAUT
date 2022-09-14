import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import GareEtConnexions from "./pages/GareEtConnexions/GareEtConnexions";
import Ter from "./pages/Ter/Ter";
import Reseau from "./pages/Reseau/Reseau";
import Voyageurs from "./pages/Voyageurs/Voyageurs";
import Profile from "./pages/Profile/Profile";
import RegulationPage from "./pages/RegulationPage/RegulationPage";
import Defaults from "./pages/Defaults/Defaults";
import Page404 from "./pages/Page404/Page404";
import { LatitudeContext } from "./context/LatitudeContext";
import { LongitudeContext } from "./context/LongitudeContext";
import { DefaultsContext } from "./context/DefaultsContext";
import { Utilisateur } from "./pages/Utilisateur/Utilisateur";
import { DescriptionContext } from "./context/DescriptionContext";
import { PictureContext } from "./context/PictureContext";
import { StationContext } from "./context/StationContext";
import DefaultsUser from "./pages/DefaultsUser/DefaultsUser";

function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [problem, setProblem] = useState([]);
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [station, setStation] = useState("");

  return (
    <LatitudeContext.Provider value={{ latitude, setLatitude }}>
      <LongitudeContext.Provider value={{ longitude, setLongitude }}>
        <DefaultsContext.Provider value={{ problem, setProblem }}>
          <DescriptionContext.Provider value={{ description, setDescription }}>
            <PictureContext.Provider value={{ picture, setPicture }}>
              <StationContext.Provider value={{ station, setStation }}>
                <Router>
                  <div className="App">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route
                        path="/gare-et-connexions"
                        element={<GareEtConnexions />}
                      />
                      <Route path="/ter" element={<Ter />} />
                      <Route path="/reseau" element={<Reseau />} />
                      <Route path="/voyageurs" element={<Voyageurs />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/utilisateur" element={<Utilisateur />} />
                      <Route path="/legal" element={<RegulationPage />} />
                      <Route path="/defaults" element={<Defaults />} />
                      <Route
                        path="/defaultsUser/:id"
                        element={<DefaultsUser />}
                      />
                      <Route path="*" element={<Page404 />} />
                    </Routes>
                  </div>
                </Router>
              </StationContext.Provider>
            </PictureContext.Provider>
          </DescriptionContext.Provider>
        </DefaultsContext.Provider>
      </LongitudeContext.Provider>
    </LatitudeContext.Provider>
  );
}

export default App;
