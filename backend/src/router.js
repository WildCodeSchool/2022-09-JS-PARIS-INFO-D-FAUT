const express = require("express");

const router = express.Router();

const defaultsControllers = require("./controllers/defaultsControllers");
const defaultsUserControllers = require("./controllers/defaultsUserControllers");
const usersControllers = require("./controllers/usersControllers");
const mailControllers = require("./controllers/mailControllers");
const auth = require("./middleware/auth");

// public route
router.post("/createUser", auth.hashPassword, usersControllers.postCreateUser);

router.post("/login", usersControllers.login, auth.verifyPassword);

// routes to protect
router.use(auth.verifyToken, auth.isTokenBlackListed); /* authentication wall */
router.post("/defaults", defaultsControllers.postDefaults);
router.post("/remit", mailControllers.email);
router.get(
  "/defaultsUser/:user_id",
  defaultsUserControllers.getAllDefaultsUser
);
router.get(
  "/updateDefaultUser/:id_default",
  defaultsUserControllers.getDefaultView
);

router.put("/defaults/:id_default", defaultsControllers.updateDefault);
router.delete("/defaults/:id_default", defaultsControllers.deleteDefaults);

router.put("/users/:id_user", auth.hashPassword, usersControllers.updateUsers);

router.get("/users", usersControllers.getUsers);
router.delete("/users/:id_user", usersControllers.deleteUsers);
router.get("/defaults", defaultsControllers.getDefaults);

router.post("/logout", auth.blackListToken);
module.exports = router;
