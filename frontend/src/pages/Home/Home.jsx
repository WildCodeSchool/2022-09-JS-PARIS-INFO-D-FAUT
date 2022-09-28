import React, { useContext } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Footer, Header, Item, Button } from "../../components/index";
import { CpUserContext } from "../../context/index";
import gare from "../../assets/gare_et_connexions.png";
import ter from "../../assets/ter.png";
import reseau from "../../assets/reseau.png";
import voyageurs from "../../assets/voyageurs.png";

const Home = () => {
  const { cp } = useContext(CpUserContext);

  return (
    <div className="home-container">
      <Header backCss="backHome" profileCss="profileHome" />
      <div className="item-container">
        <div className="item-flexone">
          <Link className="animation1" to={`/gare-et-connexions/${cp}`}>
            <Item src={gare} alt="gare et connexions" />
          </Link>
          <Link className="animation2" to={`/ter/${cp}`}>
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
          <Link className="animation1" to={`/reseau/${cp}`}>
            <Item src={reseau} alt="reseau" />
          </Link>
          <Link className="animation2" to={`/voyageurs/${cp}`}>
            <Item src={voyageurs} alt="voyageurs" />
          </Link>
        </div>
        <Link to={`/defaultsUser/${cp}`}>
          <Button
            classButton="btnrecap"
            champButton="Vos déclarations"
            type="bouton"
          />
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
