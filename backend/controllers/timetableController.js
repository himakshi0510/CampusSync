const connection = require("../config/db");


const createLecture = (req,res)=>{

const {

subject,
day,
start_time,
end_time,
room

}=req.body;



const sql = `

INSERT INTO timetable

(subject,day,start_time,end_time,room)

VALUES(?,?,?,?,?)

`;



connection.query(

sql,

[

subject,
day,
start_time,
end_time,
room

],


(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.status(201).json({

message:"Lecture Added"

});


}


);


};

const getLectures=(req,res)=>{


const sql=

"SELECT * FROM timetable ORDER BY start_time";


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

const deleteLecture=(req,res)=>{

const{id}=req.params;


const sql=

"DELETE FROM timetable WHERE id=?";


connection.query(

sql,

[id],


(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json({

message:"Lecture Deleted"

});


}


);


}

const updateLecture=(req,res)=>{

const{id}=req.params;

const{

subject,
day,
start_time,
end_time,
room

}=req.body;


const sql=`

UPDATE timetable

SET

subject=?,

day=?,

start_time=?,

end_time=?,

room=?

WHERE id=?


`;


connection.query(

sql,

[

subject,
day,
start_time,
end_time,
room,
id

],

(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json({

message:"Lecture Updated"

});


}

);


};

module.exports={

createLecture,

getLectures,

deleteLecture,

updateLecture

}