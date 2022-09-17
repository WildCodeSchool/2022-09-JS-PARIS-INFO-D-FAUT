import React, { useContext } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Footer, Header, Item } from "../../components/index";
import { ProfileContext } from "../../context/index";
import gare from "../../assets/gare_et_connexions.png";
import ter from "../../assets/ter.png";
import reseau from "../../assets/reseau.png";
import voyageurs from "../../assets/voyageurs.png";

const Home = () => {
  const { id_user } = useContext(ProfileContext);

  return (
    <div className="home-container">
      <Header backCss="back" profileCss="profile" />
      <div className="item-container">
        <div className="item-flex">
          <Link to={`/gare-et-connexions/${id_user}`}>
            <Item src={gare} alt="gare et connexions" />
          </Link>
          <Link to={`/ter/${id_user}`}>
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
        <div className="item-flex">
          <Link to={`/reseau/${id_user}`}>
            <Item src={reseau} alt="reseau" />
          </Link>
          <Link to={`/voyageurs/${id_user}`}>
            <Item src={voyageurs} alt="voyageurs" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
