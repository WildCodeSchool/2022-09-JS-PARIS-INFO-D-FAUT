const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

const usersControllers = require("./controllers/usersControllers");

router.get("/users", usersControllers.getUsers);
router.get("/users/:id", usersControllers.getUsersById);
router.post("/users", usersControllers.postUsers);
router.put("/users/:id", usersControllers.updateUsers);
router.delete("/users/:id", usersControllers.deleteUsers);

const defaultsControllers = require("./controllers/defaultsControllers");

router.get("/defaults", defaultsControllers.getDefaults);
router.get("/defaults/:id", defaultsControllers.getDefaultsById);
router.post("/defaults", defaultsControllers.postDefaults);
// router.put("/defaults/:id", defaultsControllers.updateDefaults);
// router.delete("/defaults/:id", defaultsControllers.deleteDefaults);

module.exports = router;
