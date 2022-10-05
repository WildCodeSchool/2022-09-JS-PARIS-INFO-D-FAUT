const { sqlDb } = require("../../db");

const getDefaultsUserById = (req, res) => {
  const user_id = parseInt(req.params.user_id);
  sqlDb
    .query(
      `select users.cp, defaults.id_default, defaults.station, defaults.tgv_number, defaults.ter_number, defaults.railway_track_number, defaults.description, defaults.picture, defaults.latitude, defaults.longitude, defaults.treatment, defaults.user_id from defaults INNER JOIN users ON users.id_user=defaults.user_id where user_id= ? `,
      [user_id]
    )
    .then(([d_faultUser]) => {
      if (d_faultUser[0] != null) {
        res.json(d_faultUser);
      } else {
        res.status(404).send(`defaults User at id ${user_id} not Found`);
      }
      res.status(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUserDefaultById = (req, res) => {
  let { id_default } = req.body;
  id_default = parseInt(req.params.id_default);
  sqlDb
    .query(
      `select users.cp, defaults.id_default, defaults.station, defaults.tgv_number, defaults.ter_number, defaults.railway_track_number, defaults.description, defaults.picture, defaults.latitude, defaults.longitude, defaults.treatment, defaults.user_id from defaults INNER JOIN users ON users.id_user=defaults.user_id where id_default= ?`,
      [id_default]
    )
    .then(([d_faultUser]) => {
      if (d_faultUser[0] != null) {
        res.json(d_faultUser);
      } else {
        res.status(404).send(`defaults User at id ${id_default} not Found`);
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
  getUserDefaultById,
};
