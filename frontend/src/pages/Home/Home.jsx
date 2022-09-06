import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { Footer, Header, Item } from "../../components/index";
import gare from "../../assets/gare_et_connexions.png";
import ter from "../../assets/ter.png";
import reseau from "../../assets/reseau.png";
import voyageurs from "../../assets/voyageurs.png";

const Home = () => {
  return (
    <div className="home-container">
      <Header backCss="back" profileCss="profile" />
      <div className="item-container">
        <div className="item-flex">
          <Link to="/gare-et-connexions">
            <Item src={gare} alt="gare et connexions" />
          </Link>
          <Link to="/ter">
            <Item src={ter} alt="ter" />
          </Link>
        </div>
        <p>
          CLIQUEZ sur l’activité <br />
          pour signaler un défaut
        </p>
        <div className="item-flex">
          <Link to="/reseau">
            <Item src={reseau} alt="reseau" />
          </Link>
          <Link to="/voyageurs">
            <Item src={voyageurs} alt="voyageurs" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
