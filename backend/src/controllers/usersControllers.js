const { sqlDb } = require("../../db");

const getUsers = (req, res) => {
  sqlDb
    .query("select * from users")
    .then(([result]) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(500).send(`Erreur dans la requête getUsers: ${err}`);
    });
};

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);
  sqlDb
    .query(`select * from users where id_user= ?`, [id])
    .then(([user]) => {
      if (user[0] != null) {
        res.json(user[0]);
      } else {
        res.status(404).send(`user at id ${id} not Found`);
      }
      res.status(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const postUsers = (req, res) => {
  const { cp, mail, phone_number, hashedPassword } = req.body;

  sqlDb
    .query(
      "INSERT INTO users(cp, mail, phone_number, hashedPassword) VALUES (?, ?, ?, ?)",
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
  const id = parseInt(req.params.id);
  const { cp, mail, phone_number, hashedPassword } = req.body;

  sqlDb
    .query(
      "update users set cp = ?, mail = ?, phone_number = ?, hashedPassword = ? where id_user = ?",
      [cp, mail, phone_number, hashedPassword, id]
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
  let { id } = req.body;
  id = parseInt(req.params.id);
  sqlDb
    .query("delete from users where id_user=?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: `user was not found in db` });
      } else {
        res
          .status(200)
          .json({ message: `user number: ${id} has been deleted` });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `user number: ${id} was not deleted because of error, ${err}`,
      });
    });
};

module.exports = {
  getUsers,
  getUsersById,
  postUsers,
  updateUsers,
  deleteUsers,
};
