const connection = require("../config/db");
const bcrypt = require("bcryptjs");

const createStudent = async(req,res)=>{

try{

const{name,email,password}=req.body;


connection.query(

"SELECT * FROM users WHERE email=?",

[email],

async(err,result)=>{


if(err){

return res.status(500).json(err);

}


if(result.length>0){

return res.status(400).json({

message:"Email already exists"

});

}


const hashedPassword=

await bcrypt.hash(

password,

10

);


const sql=`

INSERT INTO users

(name,email,password,role)

VALUES(?,?,?,?)

`;


connection.query(

sql,

[

name,

email,

hashedPassword,

"student"

],


(err,result)=>{


if(err){

return res.status(500).json(err);

}


const studentId=

result.insertId;



connection.query(

`

INSERT INTO attendance

(

student_id,

present_classes,

total_classes

)

VALUES(?,?,?)

`,

[

studentId,

0,

0

]

);



res.status(201).json({

message:"Student Created"

});


}

);


}

);


}

catch(error){

res.status(500).json(error);

}

};


const getStudents=(req,res)=>{


const sql=

"SELECT id,name,email FROM users WHERE role='student'";


connection.query(

sql,

(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json(result);


}


);


};



const deleteStudent=(req,res)=>{


const{id}=req.params;


const sql=

"DELETE FROM users WHERE id=?";


connection.query(

sql,

[id],


(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json({

message:"Student Deleted"

});


}


);


};

const updateStudent=(req,res)=>{

const{id}=req.params;

const{

name,
email

}=req.body;


const sql=`

UPDATE users

SET

name=?,

email=?

WHERE id=?


`;


connection.query(

sql,

[

name,
email,
id

],


(err,result)=>{


if(err){

return res.status(500).json(err);

}

connection.query(

"SELECT * FROM users WHERE email=?",

[email],

async(err,result)=>{

if(result.length>0){

return res.status(400).json({

message:"Email already exists"

});

}


/* INSERT USER QUERY HERE */

}

);

connection.query(

"INSERT INTO attendance(student_id,present_classes,total_classes) VALUES(?,?,?)",

[

result.insertId,

0,

0

]

);

res.json({

message:"Student Updated"

});


}


);


};


module.exports={

createStudent,

getStudents,

deleteStudent,

updateStudent

};