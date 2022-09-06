import React, { useRef } from "react";
import "./Profile.css";
import { Footer, Header, Input, Button } from "../../components/index";

const Profile = () => {
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
    <div className="profile-container">
      <Header backCss="backProfile" profileCss="profileProfile" />

      <form
        className="profile_champ-container"
        ref={formRef}
        action="/upload-profile"
        method="POST"
        onSubmit={onSubmit}
      >
        <h1>PROFIL</h1>
        <Input
          forId="cp"
          type="text"
          champ="Numéro de CP"
          // minlength="8"
          // maxlength="8"
        />
        <Input forId="mail" type="email" champ="Adresse mail" />
        <Input forId="telephone" type="tel" champ="Téléphone" />
        <Input forId="mot" type="password" champ="Mot de passe" />
        <Input
          forId="confirmation"
          type="password"
          champ="Confirmation du mot de passe"
        />
        <Button
          classButton="envoyer"
          // onClick={(e) => e}
          champButton="ENVOYER"
          type="submit"
        />
      </form>

      <Footer />
    </div>
  );
};

export default Profile;
