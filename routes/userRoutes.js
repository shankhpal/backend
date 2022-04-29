const{
  authUser,
  registerUser,
  updateUserProfile,
  delUser,
  getUsers,
  
} =require("../controllers/userController.js");
const{ protect} = require("../middleware/authMiddleware.js");
const express = require('express');
const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").post(protect, updateUserProfile);
router.route('/:id').delete(protect,delUser);
router.route('/users').get( getUsers) 


module.exports= router;