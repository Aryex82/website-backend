const express = require("express");
const {
  deleteUserStatus,
  getUserStatus,
  updateUserStatus,
  updateAllUserStatus,
  batchUpdateUsersStatus,
  getUserStatusControllers,
  updateUserStatusController,
  // TODO - Remove it
  setRoleIdleToIdleMembers,
} = require("../controllers/userStatus");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");
const { SUPERUSER } = require("../constants/roles");
const {
  validateUserStatus,
  validateMassUpdate,
  validateGetQueryParams,
} = require("../middlewares/validators/userStatus");

router.get("/", validateGetQueryParams, getUserStatusControllers);
router.get("/self", authenticate, getUserStatus);
router.get("/:userId", getUserStatus);
router.patch("/self", authenticate, validateUserStatus, updateUserStatusController);
router.patch("/update", authenticate, authorizeRoles([SUPERUSER]), updateAllUserStatus);
router.patch("/batch", authenticate, authorizeRoles([SUPERUSER]), validateMassUpdate, batchUpdateUsersStatus);
// Route for running one time script, will remove it once work is done
router.patch("/roleIdle", authenticate, authorizeRoles([SUPERUSER]), setRoleIdleToIdleMembers);
router.patch("/:userId", authenticate, authorizeRoles([SUPERUSER]), validateUserStatus, updateUserStatus);
router.delete("/:userId", authenticate, authorizeRoles([SUPERUSER]), deleteUserStatus);

module.exports = router;
