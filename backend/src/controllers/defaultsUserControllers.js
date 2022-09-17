const { sqlDb } = require("../../db");

const getDefaultsUserById = (req, res) => {
  const id_user = parseInt(req.params.id_user);
  sqlDb
    .query(`select * from defaults where id_user= ?`, [id_user])
    .then(([d_faultUser]) => {
      if (d_faultUser[0] != null) {
        res.json(d_faultUser);
      } else {
        res.status(404).send(`defaults User at id ${id_user} not Found`);
      }
      res.status(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const deleteDefaultsUserById = (req, res) => {
  // let { id_user } = req.body;
  let { id_default } = req.body;
  // id_user = parseInt(req.params.id_user);
  id_default = parseInt(req.params.id_default);
  sqlDb
    .query(`delete from defaults where id_default=?`, [id_default])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: `default was not found in db` });
      } else {
        res
          .status(200)
          .json({ message: `default number: ${id_default} has been deleted` });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `default number: ${id_default} was not deleted because of error, ${err}`,
      });
    });
};

module.exports = {
  getDefaultsUserById,
  deleteDefaultsUserById,
};
