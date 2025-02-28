
const express=require("express");
const { registerUser,loginUser } =require("../controllers/authControllers");
const {body}=require("express-validator");
const router=express.Router();
router.post(
    "/register", [
        body("email").isEmail().withMessage("Enter valid email"),
        body("password").isLength({min: 6}).withMessage("password must be atleast 8 character"),
    ],
    registerUser
);
router.post(
    "/login",[
        body("email").isEmail().withMessage("Enter valid email"),
        body("password").notEmpty().withMessage("password is required"),
    ],
    loginUser
);
module.exports=router;