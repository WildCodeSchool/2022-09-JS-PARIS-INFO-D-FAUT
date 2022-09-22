import React, { useContext } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Footer, Header, Item, Button } from "../../components/index";
import { ProfileContext } from "../../context/index";
import gare from "../../assets/gare_et_connexions.png";
import ter from "../../assets/ter.png";
import reseau from "../../assets/reseau.png";
import voyageurs from "../../assets/voyageurs.png";

const Home = () => {
  const { id_user } = useContext(ProfileContext);

  return (
    <div className="home-container">
      <Header backCss="backHome" profileCss="profileHome" />
      <div className="item-container">
        <div className="item-flexone">
          <Link className="animation1" to={`/gare-et-connexions/${id_user}`}>
            <Item src={gare} alt="gare et connexions" />
          </Link>
          <Link className="animation2" to={`/ter/${id_user}`}>
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
        <div className="item-flextwo">
          <Link className="animation1" to={`/reseau/${id_user}`}>
            <Item src={reseau} alt="reseau" />
          </Link>
          <Link className="animation2" to={`/voyageurs/${id_user}`}>
            <Item src={voyageurs} alt="voyageurs" />
          </Link>
        </div>
        <Link to={`/defaultsUser/${id_user}`}>
          <Button
            classButton="btnrecap"
            champButton="Vos déclaration"
            type="bouton"
          />
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
