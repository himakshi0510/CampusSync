const connection = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const login = (req,res)=>{


const {email,password}=req.body;


const sql =

"SELECT * FROM users WHERE email=?";


connection.query(

sql,

[email],


async(err,result)=>{


if(err){

return res.status(500).json({

message:"Server Error"

});

}


if(result.length===0){

return res.status(404).json({

message:"User not found"

});

}


const user=result[0];


const match=

await bcrypt.compare(

password,

user.password

);


if(!match){

return res.status(401).json({

message:"Invalid Password"

});

}


const token=

jwt.sign(

{

id:user.id,

role:user.role

},

process.env.JWT_SECRET,

{

expiresIn:"1d"

}

);

res.cookie(

"token",

token,

{

httpOnly:true,

sameSite:"lax",

maxAge:24*60*60*1000

}

);


res.json({

id:user.id,

role:user.role,

name:user.name

});


}


);


};

const logout=(req,res)=>{

res.clearCookie(

"token"

);

res.json({

message:"Logged out"

});

};

const getMe=(req,res)=>{

res.json({

id:req.user.id,

role:req.user.role

});

};

module.exports={

login,

logout,

getMe

};