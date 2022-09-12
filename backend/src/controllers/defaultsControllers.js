const { sqlDb } = require("../../db");

const getDefaults = (req, res) => {
  sqlDb
    .query("select * from defaults")
    .then(([result]) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(500).send(`Erreur dans la requête getDefaults: ${err}`);
    });
};

const getDefaultsById = (req, res) => {
  const id = parseInt(req.params.id);
  sqlDb
    .query(`select * from defaults where id_default= ?`, [id])
    .then(([d_fault]) => {
      if (d_fault[0] != null) {
        res.json(d_fault[0]);
      } else {
        res.status(404).send(`default at id ${id} not Found`);
      }
      res.status(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
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
    geolocation,
    id_user,
  } = req.body;

  sqlDb
    .query(
      "INSERT INTO defaults( station, tgv_number, ter_number, railway_track_number, description, picture, geolocation, id_user) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        station,
        tgv_number,
        ter_number,
        railway_track_number,
        description,
        picture,
        geolocation,
        id_user,
      ]
    )
    .then(([result]) => {
      res.location(`/defaults/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      res.status(500).send(`Error in postDefaults ${err}`);
    });
};

//   const updateDefaults = (req, res) => {
//     const id = parseInt(req.params.id);
//     const { station, tgv_number, ter_number, railway_track_number, description, picture, geolocation } = req.body;

//     sqlDb
//       .query(
//         "update defaults set station = ?, tgv_number = ?, ter_number = ?, railway_track_number = ?, description = ?, picture = ?, geolocation = ? where id_default = ?",
//         [station, tgv_number, ter_number, railway_track_number, description, picture, geolocation, id]
//       )
//       .then(([result]) => {
//         if (result.affectedRows === 0) {
//           res.status(404).send("Not Found");
//         } else {
//           res.sendStatus(204);
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         res.status(500).send("Error editing the default");
//       });
//   };

// const deleteDefaults = (req, res) => {
//     let { id } = req.body;
//     id = parseInt(req.params.id);
//     sqlDb
//       .query("delete from defaults where id_default=?", [id])
//       .then(([result]) => {
//         if (result.affectedRows === 0) {
//           res.status(404).json({ message: `default was not found in db` });
//         } else {
//           res.status(200).json({ message: `default number: ${id} has been deleted` });
//         }
//       })
//       .catch((err) => {
//         res.status(500).json({
//           message: `default number: ${id} was not deleted because of error, ${err}`,
//         });
//       });
//   };

module.exports = {
  getDefaults,
  getDefaultsById,
  postDefaults,
  // updateDefaults,
  // deleteDefaults,
};
