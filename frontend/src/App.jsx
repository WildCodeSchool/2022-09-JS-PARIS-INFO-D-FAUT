import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import GareEtConnexions from "./pages/GareEtConnexions/GareEtConnexions";
import Ter from "./pages/Ter/Ter";
import Reseau from "./pages/Reseau/Reseau";
import Voyageurs from "./pages/Voyageurs/Voyageurs";
import CreateProfile from "./pages/CreateProfile/CreateProfile";
import RegulationPage from "./pages/RegulationPage/RegulationPage";
import Defaults from "./pages/Defaults/Defaults";
import Login from "./pages/Login/Login";
import DefaultsUser from "./pages/DefaultsUser/DefaultsUser";
import UpdateDefaultsUser from "./pages/UpdateDefaultsUser/UpdateDefaultsUser";
import Page404 from "./pages/Page404/Page404";
import Admin from "./pages/Admin/Admin";
import AuthAdminGuard from "./services/AuthAdminGuar/AuthAdminGuard";
import UpdateUser from "./pages/UpdateUser/UpdateUser";
import Users from "./pages/Users/Users";
import Profile from "./pages/Profile/Profile";
import {
  UserContext,
  GeolocationContext,
  PictureContext,
} from "./context/index";

function App() {
  const [user, setUser] = useState([]);
  const [geolocation, setGeolocation] = useState([]);

  const [picture, setPicture] = useState("");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <GeolocationContext.Provider value={{ geolocation, setGeolocation }}>
        <PictureContext.Provider value={{ picture, setPicture }}>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/items/:id_user" element={<Home />} />
                <Route
                  path="/gare-et-connexions/:cp_user"
                  element={<GareEtConnexions />}
                />
                <Route path="/ter/:cp_user" element={<Ter />} />
                <Route path="/reseau/:cp_user" element={<Reseau />} />
                <Route path="/voyageurs/:cp_user" element={<Voyageurs />} />
                <Route path="/Profile/:cp_user" element={<Profile />} />
                <Route path="/CreateProfile" element={<CreateProfile />} />
                <Route path="/updateUser" element={<UpdateUser />} />

                <Route path="/legal" element={<RegulationPage />} />

                <Route
                  path="/admin"
                  element={
                    <AuthAdminGuard>
                      <Admin />
                    </AuthAdminGuard>
                  }
                />
                <Route
                  path="/admin/defaults"
                  element={
                    <AuthAdminGuard>
                      <Defaults />
                    </AuthAdminGuard>
                  }
                />

                <Route
                  path="/admin/users"
                  element={
                    <AuthAdminGuard>
                      <Users />
                    </AuthAdminGuard>
                  }
                />

                <Route
                  path="/defaultsUser/:cp_user"
                  element={<DefaultsUser />}
                />
                <Route
                  path="/updateDefaultsUser/:cp_user/:id_default"
                  element={<UpdateDefaultsUser />}
                />
                <Route path="*" element={<Page404 />} />
              </Routes>
            </div>
          </Router>
        </PictureContext.Provider>
      </GeolocationContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
