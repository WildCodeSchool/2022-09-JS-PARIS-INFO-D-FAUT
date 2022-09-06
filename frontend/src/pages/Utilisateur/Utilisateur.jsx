import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Header, Footer, Input, Button } from "../../components/index";
import "./Utilisateur.css";

export const Utilisateur = () => {
  const formRef = useRef(null);

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

  return (
    <div className="utilisateur-container">
      <Header backCss="backProfile" profileCss="profileProfile" />
      <div className="champ-container">
        <form
          className="form-container"
          ref={formRef}
          action="/upload-utilisateur"
          method="POST"
          onSubmit={onSubmit}
        >
          <h1>UTILISATEUR</h1>
          <Input
            forId="cp"
            type="text"
            champ="Numéro de CP"
            // minlength="8"
            // maxlength="8"
          />
          <Input forId="mot" type="password" champ="Mot de passe" />
          <Button
            classButton="envoyer"
            // onClick={(e) => e}
            champButton="CONNEXION"
            type="submit"
          />
        </form>
        <div className="trait" />
        <Link className="link" to="/profile">
          <Button
            classButton="inscription"
            champButton="S'INSCRIRE"
            type="submit"
          />
        </Link>
      </div>
      <Footer />
    </div>
  );
};
