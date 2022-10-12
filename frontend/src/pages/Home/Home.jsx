import React, { useContext } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Footer, Header, Item, Button } from "../../components/index";
import { Geolocation } from "../../services/Geolocation/Geolocation";
import { UserContext } from "../../context/index";

import gare from "../../assets/gare_et_connexions.png";
import ter from "../../assets/ter.png";
import reseau from "../../assets/reseau.png";
import voyageurs from "../../assets/voyageurs.png";

const Home = () => {
  const { user } = useContext(UserContext);
  const cp = user.cp;

  return (
    <div className="home-container">
      {Geolocation()}
      <Header
        profileCss="profileHome"
        loginCss="loginHome"
        adminOnCss="adminOnHome"
        adminOffCss="adminOffHome"
      />

      <div className="item-container">
        <div className="item-flexOne">
          <Link className="animationOne" to={`/gare-et-connexions/${cp}`}>
            <Item src={gare} alt="gare et connexions" />
          </Link>
          <Link className="animationTwo" to={`/ter/${cp}`}>
            <Item src={ter} alt="ter" />
          </Link>
        </div>
        <Typewriter
          options={{
            strings: "CLIQUEZ sur l'activité pour signaler un défaut !",
            autoStart: true,
            loop: true,
            delay: 60,
          }}
        />
        <div className="item-flexTwo">
          <Link className="animationOne" to={`/reseau/${cp}`}>
            <Item src={reseau} alt="reseau" />
          </Link>
          <Link className="animationTwo" to={`/voyageurs/${cp}`}>
            <Item src={voyageurs} alt="voyageurs" />
          </Link>
        </div>
        <Link to={`/defaultsUser/${cp}`}>
          <Button
            classButton="btnrecap"
            fieldButton="Vos déclarations"
            type="bouton"
          />
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
