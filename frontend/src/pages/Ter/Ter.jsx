import React, { useRef, useContext } from "react";
import "./Ter.css";
import {
  Footer,
  Header,
  Input,
  Button,
  Textarea,
} from "../../components/index";
import { Geolocalisation } from "../../utils/Geolocalisation/Geolocalisation";
import { LongitudeContext } from "../../context/LongitudeContext";
import { LatitudeContext } from "../../context/LatitudeContext";

const Ter = () => {
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
    <div className="ter-container">
      <Header backCss="backTer" profileCss="profileTer" />

      <form
        className="ter_champ-container"
        ref={formRef}
        action="/upload-ter"
        method="POST"
        onSubmit={onSubmit}
      >
        <h1> TER </h1>
        <Input
          forId="cp"
          type="text"
          champ="Numéro de CP"
          minlength={8}
          maxlength={8}
        />
        <Input forId="ter" type="text" champ="Numéro de Ter" />
        <Textarea className="textarea" forId="field" />
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

export default Ter;
