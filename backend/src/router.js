const express = require("express");

const router = express.Router();

const defaultsControllers = require("./controllers/defaultsControllers");
const defaultsUserControllers = require("./controllers/defaultsUserControllers");
const usersControllers = require("./controllers/usersControllers");
const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./middleware/auth");

// public route
router.post("/users", hashPassword, usersControllers.postUsers);
router.get("/defaults", defaultsControllers.getDefaults);
router.delete("/defaults/:id_default", defaultsControllers.deleteDefaults);

router.put("/defaults/:id_default", defaultsControllers.updateDefaults);

router.get(
  "/defaultsUser/:user_id",
  defaultsUserControllers.getDefaultsUserById
);
router.post("/defaults", defaultsControllers.postDefaults);

router.get(
  "/updateDefaultsUser/:id_default",
  defaultsUserControllers.getUserDefaultById
);

router.get("/users", usersControllers.getUsers);
router.delete("/users/:id_user", usersControllers.deleteUsers);
router.put("/users/:id_user", hashPassword, usersControllers.updateUsers);

router.post(
  "/profile/login",
  usersControllers.getUserByCpWithPasswordAndPassToNext,
  verifyPassword
);

// routes to protect
router.use(verifyToken); /* authentication wall */

module.exports = router;
