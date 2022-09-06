import React, { useRef, useContext } from "react";
import "./Voyageurs.css";
import { Footer, Header, Input, Button } from "../../components/index";
import { Geolocalisation } from "../../utils/Geolocalisation/Geolocalisation";
import { LongitudeContext } from "../../context/LongitudeContext";
import { LatitudeContext } from "../../context/LatitudeContext";

const Voyageurs = () => {
  const formRef = useRef(null);

  const { latitude } = useContext(LatitudeContext);
  const { longitude } = useContext(LongitudeContext);

  const onSubmit = (evt) => {
    evt.preventDefault();

    if (!formRef) {
      return;
    }

    fetch(formRef.current.action, {
      method: formRef.current.method,
      body: new FormData(formRef.current),
    });
  };
  //   console.log(formRef);

  return (
    <div className="voyageurs-container">
      <Header backCss="backVoyageurs" profileCss="profileVoyageurs" />

      <form
        className="voyageurs_champ-container"
        ref={formRef}
        action="/upload-voyageurs"
        method="POST"
        onSubmit={onSubmit}
      >
        <h1>GARE & CONNEXIONS</h1>
        <Input
          forId="cp"
          type="text"
          champ="Numéro de CP"
          minlength={8}
          maxlength={8}
        />
        <Input forId="tgv" type="text" champ="Numéro du train" />
        <Input forId="anomalie" type="text" champ="Description de l'anomalie" />
        <Input forId="file" type="file" champ="Joindre une photographie" />
        <Input
          forId="file"
          onChange={Geolocalisation()}
          type="text"
          // placeholder={`  ${latitude},  ${longitude}`}
          // defaultValue={`  ${latitude},  ${longitude}`}
          value={`  ${latitude},  ${longitude}`}
          champ="Coordonnées GPS"
        />

        {/* <div>
          <h2>Coordonnées GPS</h2>
          <h3>{Geolocalisation()}</h3>
        </div> */}

        <Button classButton="envoyer" champButton="ENVOYER" type="submit" />
      </form>

      <Footer />
    </div>
  );
};

export default Voyageurs;
