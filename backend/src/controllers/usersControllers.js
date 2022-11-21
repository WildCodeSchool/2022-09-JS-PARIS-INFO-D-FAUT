const { sqlDb } = require("../models/db");

const getUsers = (req, res) => {
  sqlDb
    .query("select * from users")
    .then(([result]) => {
      res.json({ result });
    })
    .catch((err) => {
      res.status(500).send(`Erreur dans la requête getUsers: ${err}`);
    });
};

const postCreateUser = (req, res) => {
  const { cp, mail, phone_number, hashedPassword } = req.body;

  sqlDb
    .query(
      "INSERT INTO users(cp, mail, phone_number, hashedPassword) VALUES ( ?, ?, ?, ?)",
      [cp, mail, phone_number, hashedPassword]
    )
    .then(([result]) => {
      res.location(`/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      res.status(500).send(`Error in postUsers ${err}`);
    });
};

const updateUsers = (req, res) => {
  const id_user = parseInt(req.params.id_user);
  const { cp, mail, phone_number, hashedPassword } = req.body;

  sqlDb
    .query(
      "update users set cp = ?, mail = ?, phone_number = ?, hashedPassword = ? where id_user = ?",
      [cp, mail, phone_number, hashedPassword, id_user]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the user");
    });
};

const deleteUsers = (req, res) => {
  let { id_user } = req.body;
  id_user = parseInt(req.params.id_user);
  sqlDb
    .query("delete from users where id_user=?", [id_user])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: `user was not found in db` });
      } else {
        res
          .status(200)
          .json({ message: `user number: ${id_user} has been deleted` });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `user number: ${id_user} was not deleted because of error, ${err}`,
      });
    });
};

const login = (req, res, next) => {
  const { cp } = req.body;

  sqlDb
    .query("select * from users where cp = ?", [cp])
    .then(([users]) => {
      if (users[0] != null) {
        req.user = users[0];

        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  getUsers,
  postCreateUser,
  updateUsers,
  deleteUsers,
  login,
};
