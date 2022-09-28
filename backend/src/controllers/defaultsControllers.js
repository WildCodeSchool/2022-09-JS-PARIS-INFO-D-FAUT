const { sqlDb } = require("../../db");

const getDefaults = (req, res) => {
  sqlDb
    .query(
      "select users.cp, defaults.id_default, defaults.station, defaults.tgv_number, defaults.ter_number, defaults.railway_track_number, defaults.description, defaults.picture, defaults.latitude, defaults.longitude, defaults.user_id from defaults INNER JOIN users ON users.id_user=defaults.user_id"
    )
    .then(([result]) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(500).send(`Erreur dans la requête getDefaults: ${err}`);
    });
};

const postDefaults = (req, res) => {
  const {
    station,
    tgv_number,
    ter_number,
    railway_track_number,
    description,
    picture,
    latitude,
    longitude,
    user_id,
  } = req.body;

  sqlDb
    .query(
      "INSERT INTO defaults( station, tgv_number, ter_number, railway_track_number, description, picture, longitude, latitude, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        station,
        tgv_number,
        ter_number,
        railway_track_number,
        description,
        picture,
        latitude,
        longitude,
        user_id,
      ]
    )
    .then(([result]) => {
      res.location(`/defaults/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      res.status(500).send(`Error in postDefaults ${err}`);
    });
};

const updateDefaults = (req, res) => {
  const id_default = parseInt(req.params.id_default);
  const {
    user_id,
    station,
    tgv_number,
    ter_number,
    railway_track_number,
    description,
    picture,
    longitude,
    latitude,
  } = req.body;

  sqlDb
    .query(
      "update defaults set user_id = ?, station = ?, tgv_number = ?, ter_number = ?, railway_track_number = ?, description = ?, picture = ?, longitude = ?, latitude = ? where id_default = ?",
      [
        user_id,
        station,
        tgv_number,
        ter_number,
        railway_track_number,
        description,
        picture,
        longitude,
        latitude,
        id_default,
      ]
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
      res.status(500).send("Error editing the default");
    });
};

const deleteDefaults = (req, res) => {
  let { id_default } = req.body;
  id_default = parseInt(req.params.id_default);
  sqlDb
    .query("delete from defaults where id_default=?", [id_default])
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
  getDefaults,
  postDefaults,
  updateDefaults,
  deleteDefaults,
};
