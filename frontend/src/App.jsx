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
import Login from "./pages/Login/Login";
import DefaultsUser from "./pages/DefaultsUser/DefaultsUser";
import UpdateDefaultsUser from "./pages/UpdateDefaultsUser/UpdateDefaultsUser";
import UpdateDefaults from "./pages/UpdateDefaults/UpdateDefaults";
import Page404 from "./pages/Page404/Page404";
import {
  ProfileContext,
  LatitudeContext,
  LongitudeContext,
} from "./context/index";

function App() {
  const [id_user, setId_user] = useState([]);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  return (
    <ProfileContext.Provider value={{ id_user, setId_user }}>
      <LatitudeContext.Provider value={{ latitude, setLatitude }}>
        <LongitudeContext.Provider value={{ longitude, setLongitude }}>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/items/:id_user" element={<Home />} />
                <Route
                  path="/gare-et-connexions/:id_user"
                  element={<GareEtConnexions />}
                />
                <Route path="/ter/:id" element={<Ter />} />
                <Route path="/reseau/:id" element={<Reseau />} />
                <Route path="/voyageurs/:id" element={<Voyageurs />} />
                <Route path="/profile" element={<Profile />} />

                <Route path="/legal" element={<RegulationPage />} />
                <Route path="/defaults" element={<Defaults />} />
                <Route
                  path="/defaultsUser/:id_user"
                  element={<DefaultsUser />}
                />
                <Route
                  path="/updateDefaultsUser/:id_user/:id_default"
                  element={<UpdateDefaultsUser />}
                />
                <Route
                  path="/updateDefaults/:id_default"
                  element={<UpdateDefaults />}
                />
                <Route path="*" element={<Page404 />} />
              </Routes>
            </div>
          </Router>
        </LongitudeContext.Provider>
      </LatitudeContext.Provider>
    </ProfileContext.Provider>
  );
}

export default App;
