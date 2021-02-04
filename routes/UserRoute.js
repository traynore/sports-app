const router = require("express").Router();

///////////////////////////// User Controller methods /////////////////////////
const {
  registerUser
} = require("../controllers/userController/registerController");

const {
  loginUser,
  changePassword
} = require("../controllers/userController/authController");

//////////////////////////////////////////////////////////////////////////////////

//REGISTER USER
router.route("/routes/api/register").post(registerUser);

//LOGIN USER
router.route("/routes/api/login").post(loginUser);

//Change Password
router.route("/routes/api/changepassword").put(changePassword)

module.exports = router;