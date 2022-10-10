import React, { useEffect, useState } from "react";
import "./Users.css";
import { getUsers, deleteUser } from "../../services/axios/AxiosUsers";

import { Footer, Header, Button, UserCard } from "../../components/index";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers(setUsers);
  }, [users]);

  return (
    <div className="users-container">
      <Header
        backCss="backUsers"
        profileCss="profileUsers"
        loginCss="loginUsers"
      />
      <div className="users-display">
        {users && (
          <>
            {users.map((user) => (
              <div className="mapUser-container" key={user.id_user}>
                <UserCard
                  cp={user.cp}
                  mail={user.mail}
                  phone_number={user.phone_number}
                  id_user={user.id_user}
                />

                <Button
                  name="deleteUser"
                  classButton="deleteUser-button"
                  fieldButton="Supprimer"
                  type="button"
                  onClick={(e) => deleteUser(user.id_user, setUsers, e)}
                />
              </div>
            ))}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Users;
