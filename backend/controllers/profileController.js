const connection=require("../config/db");


const getProfile=(req,res)=>{

const{id}=req.params;


connection.query(

"SELECT id,name,email,role FROM users WHERE id=?",

[id],

(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json(result[0]);


}

);


};



const updateProfile=(req,res)=>{


const{id}=req.params;

const{name}=req.body;


connection.query(

"UPDATE users SET name=? WHERE id=?",

[name,id],

(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json({

message:"Profile Updated"

});


}


);


};

const bcrypt=require("bcryptjs");

const changePassword=async(req,res)=>{

const{id}=req.params;

const{

currentPassword,

newPassword

}=req.body;


connection.query(

"SELECT password FROM users WHERE id=?",

[id],

async(err,result)=>{


if(err){

return res.status(500).json(err);

}


const match=await bcrypt.compare(

currentPassword,

result[0].password

);


if(!match){

return res.status(400).json({

message:"Current password incorrect"

});

}


const hashedPassword=

await bcrypt.hash(

newPassword,

10

);


connection.query(

"UPDATE users SET password=? WHERE id=?",

[

hashedPassword,

id

],

(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json({

message:"Password Changed"

});


}

);


}

);

};


module.exports={

getProfile,

updateProfile,

changePassword

};