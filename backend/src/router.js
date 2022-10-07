const express = require("express");

const router = express.Router();

const defaultsControllers = require("./controllers/defaultsControllers");
const defaultsUserControllers = require("./controllers/defaultsUserControllers");
const usersControllers = require("./controllers/usersControllers");
const auth = require("./middleware/auth");

// public route
router.post("/createUser", auth.hashPassword, usersControllers.postCreateUser);

router.post("/login", usersControllers.login, auth.verifyPassword);

// routes to protect
router.use(auth.verifyToken, auth.isTokenBlackListed); /* authentication wall */
router.post("/defaults", defaultsControllers.postDefaults);
router.get(
  "/defaultsUser/:user_id",
  defaultsUserControllers.getDefaultsUserById
);
router.get(
  "/updateDefaultsUser/:id_default",
  defaultsUserControllers.getUserDefaultById
);

router.put("/defaults/:id_default", defaultsControllers.updateDefaults);
router.delete("/defaults/:id_default", defaultsControllers.deleteDefaults);

router.put("/users/:id_user", auth.hashPassword, usersControllers.updateUsers);

router.get("/users", usersControllers.getUsers);
router.delete("/users/:id_user", usersControllers.deleteUsers);
router.get("/defaults", defaultsControllers.getDefaults);

router.post("/logout", auth.blackListToken);
module.exports = router;
