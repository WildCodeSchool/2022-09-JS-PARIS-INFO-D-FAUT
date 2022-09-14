const { sqlDb } = require("../../db");

const getDefaultsUserById = (req, res) => {
  const id = parseInt(req.params.id);
  sqlDb
    .query(`select * from defaults where id_user= ?`, [id])
    .then(([d_faultUser]) => {
      if (d_faultUser[0] != null) {
        res.json(d_faultUser);
      } else {
        res.status(404).send(`defaults User at id ${id} not Found`);
      }
      res.status(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  getDefaultsUserById,
};
