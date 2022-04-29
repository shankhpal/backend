const asyncHandler = require("express-async-handler");
const Tweet = require("../models/tweetModel.js");
const Comment = require("../models/commentModel.js");
const User = require("../models/userModel.js");
const generateToken = require("../utils/generateToken.js");

const authUser = asyncHandler(async (req, res) => {
  const { loginId, password } = req.body;

  const user = await User.findOne({ loginId });
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  } else if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      fistName: user.fistName,
      lastName: user.lastName,
      email: user.email,
      loginId : user.loginId,
      pic: user.pic,
      contact: user.contact,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { fistName, lastName, email, loginId, password, pic, contact } = req.body;

  const ID = await User.findOne({ loginId });
  if (ID) {
    res.status(404);
    throw new Error("Username is not available");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    fistName,
    lastName,
    email,
    loginId,
    password,
    pic,
    contact,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      fistName: user.fistName,
      lastName: user.lastName,
      email: user.email,
      loginId : user.loginId,
      pic: user.pic,
      contact: user.contact,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.fistName = req.body.fistName || user.fistName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    user.contact = req.body.contact || user.contact;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      role: updatedUser.role,
      skill: updatedUser.skill,
      qualification: updatedUser.qualification,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});


const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
 
  if (users) res.json(users);
  else {
    res.status(400);
    throw new Error("Not Found");
  }
});


module.exports = {
  authUser,
  updateUserProfile,
  registerUser,
  getUsers,
  delUser,
};
