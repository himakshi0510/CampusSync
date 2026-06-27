const verifyToken=require("../middleware/authMiddleware"); 

const express = require("express");

const router = express.Router();

const{

login,

logout,

getMe

}=require("../controllers/authController");


router.post(

"/login",

login

);

router.post(

"/logout",

logout

);

router.get("/test",(req,res)=>{

res.json({

message:"Auth Route Working"

});

});

router.get(

"/me",

verifyToken,

getMe

); 

module.exports = router;