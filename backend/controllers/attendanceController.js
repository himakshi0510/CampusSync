const connection=require("../config/db");


const getAttendance=(req,res)=>{

connection.query(

`
SELECT
attendance.*,
users.name,
users.email

FROM attendance

JOIN users

ON attendance.student_id=users.id

`,

(err,result)=>{

if(err){

return res.status(500).json(err);

}

res.json(result);

}

);

};



const updateAttendance=(req,res)=>{


const{id}=req.params;

const{

present_classes,

total_classes

}=req.body;

connection.query(

"UPDATE attendance SET present_classes=?, total_classes=? WHERE student_id=?",

[
Number(present_classes),

Number(total_classes),

Number(id)

],


(err,result)=>{


if(err){

console.log(err);

return res.status(500).json(err);

}


console.log(result);


res.json({

message:"Attendance Updated"

});


}

);


};

const getStudentAttendance=(req,res)=>{

const{id}=req.params;

connection.query(

`
SELECT attendance.*,
users.name

FROM attendance

JOIN users

ON users.id=attendance.student_id

WHERE student_id=?
`,

[id],

(err,result)=>{

if(err){

return res.status(500).json(err);

}

res.json(result[0]);

}

);

};


module.exports={

getAttendance,

updateAttendance,

getStudentAttendance

};