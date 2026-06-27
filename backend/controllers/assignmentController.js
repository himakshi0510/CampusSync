const connection=require("../config/db");


const createAssignment=(req,res)=>{


const{

title,
description,
due_date

}=req.body;



const pdf_file=req.file.filename;



const sql=`

INSERT INTO assignments

(title,description,due_date,pdf_file)

VALUES(?,?,?,?)

`;



connection.query(

sql,

[

title,
description,
due_date,
pdf_file

],


(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.status(201).json({

message:"Assignment Created"

});


}

);


};

const getAssignments=(req,res)=>{


const sql=

"SELECT * FROM assignments ORDER BY due_date";


connection.query(

sql,


(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json(result);


}


);


}

const deleteAssignment=(req,res)=>{


const{id}=req.params;


const sql=

"DELETE FROM assignments WHERE id=?";


connection.query(

sql,

[id],


(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json({

message:"Assignment Deleted"

});


}


);


}

const updateAssignment=(req,res)=>{

const{id}=req.params;


const{

title,
description,
due_date

}=req.body;


const sql=`

UPDATE assignments

SET

title=?,

description=?,

due_date=?

WHERE id=?


`;


connection.query(

sql,

[

title,
description,
due_date,
id

],


(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json({

message:"Assignment Updated"

});


}


);


}

module.exports={

createAssignment,

getAssignments,

deleteAssignment,

updateAssignment

}