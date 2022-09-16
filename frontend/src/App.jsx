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
import {
  DefaultsContext,
  StationContext,
  TerNumberContext,
  TgvNumberContext,
  RailwayTrackNumberContext,
  PictureContext,
  DescriptionContext,
  LatitudeContext,
  LongitudeContext,
} from "./context/index";

import Utilisateur from "./pages/Utilisateur/Utilisateur";

import DefaultsUser from "./pages/DefaultsUser/DefaultsUser";

function App() {
  const [problem, setProblem] = useState([]);
  const [station, setStation] = useState("");
  const [terNumber, setTerNumber] = useState("");
  const [tgvNumber, setTgvNumber] = useState("");
  const [railwayNumber, setRailwayNumber] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  return (
    <DefaultsContext.Provider value={{ problem, setProblem }}>
      <StationContext.Provider value={{ station, setStation }}>
        <TerNumberContext.Provider value={{ terNumber, setTerNumber }}>
          <TgvNumberContext.Provider value={{ tgvNumber, setTgvNumber }}>
            <RailwayTrackNumberContext.Provider
              value={{ railwayNumber, setRailwayNumber }}
            >
              <DescriptionContext.Provider
                value={{ description, setDescription }}
              >
                <PictureContext.Provider value={{ picture, setPicture }}>
                  <LatitudeContext.Provider value={{ latitude, setLatitude }}>
                    <LongitudeContext.Provider
                      value={{ longitude, setLongitude }}
                    >
                      <Router>
                        <div className="App">
                          <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                              path="/gare-et-connexions/:id"
                              element={<GareEtConnexions />}
                            />
                            <Route path="/ter/:id" element={<Ter />} />
                            <Route path="/reseau/:id" element={<Reseau />} />
                            <Route
                              path="/voyageurs/:id"
                              element={<Voyageurs />}
                            />
                            <Route path="/profile" element={<Profile />} />
                            <Route
                              path="/utilisateur"
                              element={<Utilisateur />}
                            />
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
                    </LongitudeContext.Provider>
                  </LatitudeContext.Provider>
                </PictureContext.Provider>
              </DescriptionContext.Provider>
            </RailwayTrackNumberContext.Provider>
          </TgvNumberContext.Provider>
        </TerNumberContext.Provider>
      </StationContext.Provider>
    </DefaultsContext.Provider>
  );
}

export default App;
