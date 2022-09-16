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

// const { application } = require("express");

// public route
router.post("/users", hashPassword, usersControllers.postUsers);

router.post(
  "/profile/login",
  usersControllers.getUserByCpWithPasswordAndPassToNext,
  verifyPassword
);

// routes to protect
router.use(verifyToken); /* authentication wall */

router.get("/users", usersControllers.getUsers);
router.get("/users/:id_user", usersControllers.getUsersById);
router.put("/users/:id_user", usersControllers.updateUsers);
router.delete("/users/:id_user", usersControllers.deleteUsers);

router.get("/defaults", defaultsControllers.getDefaults);
router.get("/defaults/:id_default", defaultsControllers.getDefaultsById);
router.post("/defaults", defaultsControllers.postDefaults);
router.put("/defaults/:id_default", defaultsControllers.updateDefaults);
router.delete("/defaults/:id_default", defaultsControllers.deleteDefaults);

router.get(
  "/defaultsUser/:id_user",
  defaultsUserControllers.getDefaultsUserById
);
router.delete(
  "/defaultsUser/:id_user/:id_default",
  defaultsUserControllers.deleteDefaultsUserById
);
module.exports = router;
