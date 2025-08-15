const UserSchema = require("../models/userModal");

exports.signup = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const userexist = await UserSchema.findOne({ email: email });

  if (userexist) {
    res.status(411).json({
      message: "user already exist",
    });
  }

  const newUser = await UserSchema.create({
    email: email,
    password: password,
  });

  res.status(200).json({
    message: "User Created Succesfully",
    user_details: newUser,
  });
};

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const userexist = await UserSchema.findOne({ email: email });

  if (!userexist) {
    res.status(411).json({
      message: "user not exist, Please create your account",
    });
  }
  if (userexist.password != password) {
    res.status(411).json({
      message: "Invalid username or password",
    });
  }

  res.status(200).json({
    message: "LoggedIn Succesfully",
  });
};
