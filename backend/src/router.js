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
router.get("/defaults", defaultsControllers.getDefaults);
router.delete("/defaults/:id_default", defaultsControllers.deleteDefaults);
router.put("/defaults/:id_default", defaultsControllers.updateDefaults);
router.get("/defaults/:id_default", defaultsControllers.getDefaultsById);
router.get(
  "/defaultsUser/:id_user",
  defaultsUserControllers.getDefaultsUserById
);
router.post("/defaults", defaultsControllers.postDefaults);

router.delete(
  "/defaultsUser/:id_default",
  defaultsUserControllers.deleteDefaultsUserById
);

router.get(
  "/updateDefaultsUser/:id_default",
  defaultsUserControllers.getUserDefaultById
);
router.get("/users", usersControllers.getUsers);
router.delete("/users/:id_user", usersControllers.deleteUsers);

router.post(
  "/profile/login",
  usersControllers.getUserByCpWithPasswordAndPassToNext,
  verifyPassword
);

// routes to protect
router.use(verifyToken); /* authentication wall */

router.get("/users/:id_user", usersControllers.getUsersById);
router.put("/users/:id_user", usersControllers.updateUsers);

module.exports = router;
