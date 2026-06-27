require("dotenv").config();

const bcrypt = require("bcryptjs");

const connection = require("./config/db");


async function seedAdmin(){


const hashedPassword = await bcrypt.hash(

"admin123",

10

);


const sql = `

INSERT INTO users

(name,email,password,role)

VALUES(?,?,?,?)

`;


connection.query(

sql,

[

"Admin",

"admin@campussync.com",

hashedPassword,

"admin"

],


(err,result)=>{


if(err){

console.log(err);

}


else{

console.log(

"Admin Created Successfully"

);

}


process.exit();


}


);


}



seedAdmin();