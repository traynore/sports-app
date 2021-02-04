// REQUIRED FILES
const Users = require("../../modals/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Validaton
const validateLogin = require("../../validation/ValidateLogin");
const validateRegister = require("../../validation/ValidateRegister");

//PUBLIC
//LOGIN A USER
exports.loginUser = async (req, res, next) => {
  try {
    const { isValid, errors } = validateLogin(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { name, password } = req.body;
    const user = await Users.findOne({ name });
    if (!user) {
      errors.name = "User not found!";
      return res.status(400).json(errors);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      errors.password = "Incorrect Password";
      return res.status(400).json(errors);
    }

    const payload = {
      id: user.id,
      name: user.name
    };

    jwt.sign(
      payload,
      process.env.SecretOrKey,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        return res
          .status(200)
          .json({ success: true, token: "Bearer " + token });
      }
    );
  } catch (err) {
    console.log(err);
    next();
  }
};


//PUBLIC
//Change Password
exports.changePassword = async (req, res, next) => {
  try {
    const { isValid, errors } = validateRegister(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { name, password } = req.body;
    const user = await Users.findOne({ name});
    if (!user) {
      errors.name = "User doesn't exist exists!";
      return res.status(404).json(errors);
    }
    const newpassword = password;

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newpassword, salt, async (err, hash) => {
        if (err) throw err;
        try {
          user.password = hash;
          const updateduser = await user.save();
          return res.json({success: "true",updateduser});
        } catch (err) {
          console.log(err);
        }
      });
    });
  } catch (err) {
    console.log(err);
    next();
  }
};