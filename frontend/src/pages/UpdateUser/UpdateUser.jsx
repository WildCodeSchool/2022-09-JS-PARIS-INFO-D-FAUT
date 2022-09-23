import React, { useState, useContext } from "react";
import "./UpdateUser.css";
import {
  Footer,
  Header,
  Input,
  Button,
  InputPassword,
} from "../../components/index";
import {
  IdUserContext,
  CpUserContext,
  MailContext,
  PhoneNumberContext,
} from "../../context/index";

import { updateUser } from "../../services/axios/AxiosUsers";

const UpdateUser = () => {
  const { id_user } = useContext(IdUserContext);
  const { cp, setCp } = useContext(CpUserContext);
  const { mail, setMail } = useContext(MailContext);
  const { phone_number, setPhoneNumber } = useContext(PhoneNumberContext);

  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  const verifPasswords = password !== secondPassword;

  const data = {
    id_user,
    cp,
    mail,
    phone_number,
    password,
  };

  return (
    <div className="updateUser-container">
      <Header backCss="backUpdateUser" profileCss="profileUpdateUser" />

      <form className="profile_champ-container">
        <h1>MODIFICATION</h1>
        <Input
          className="inputProfil"
          forId="cp"
          type="text"
          champ="Numéro de CP"
          onChange={(e) => setCp(e.target.value)}
          value={cp}
          // minlength="8"
          // maxlength="8"
        />
        <Input
          className="inputProfil"
          forId="mail"
          type="email"
          champ="Adresse mail"
          onChange={(e) => setMail(e.target.value)}
          value={mail}
        />
        <Input
          className="inputProfil"
          forId="telephone"
          type="tel"
          champ="Téléphone"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phone_number}
        />
        <InputPassword
          className="inputProfil"
          forId="mot"
          champ="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="on"
          value={password}
        />
        <InputPassword
          className="inputProfil"
          forId="confirmation"
          champ="Confirmation du mot de passe"
          onChange={(e) => setSecondPassword(e.target.value)}
          autoComplete="on"
          value={secondPassword}
        />
        <Button
          classButton="envoyer"
          disabled={verifPasswords}
          onClick={(e) =>
            updateUser(id_user, data, setPassword, setSecondPassword, e)
          }
          champButton="ENVOYER"
          type="button"
        />
      </form>
      <Footer />
    </div>
  );
};

export default UpdateUser;
