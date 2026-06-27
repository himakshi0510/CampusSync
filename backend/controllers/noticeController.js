const connection=require("../config/db");


const createNotice=(req,res)=>{


const{

title,
description

}=req.body;



const sql=`

INSERT INTO notices

(title,description)

VALUES(?,?)

`;



connection.query(

sql,

[

title,
description

],


(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.status(201).json({

message:"Notice Posted"

});


}

);


};



const getNotices=(req,res)=>{


const sql=

"SELECT * FROM notices ORDER BY created_at DESC";



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



const deleteNotice=(req,res)=>{


const{id}=req.params;



const sql=

"DELETE FROM notices WHERE id=?";



connection.query(

sql,

[id],


(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json({

message:"Notice Deleted"

});


}


);


};

const updateNotice=(req,res)=>{

const{id}=req.params;

const{

title,
description

}=req.body;


const sql=`

UPDATE notices

SET

title=?,

description=?

WHERE id=?


`;


connection.query(

sql,

[

title,
description,
id

],


(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json({

message:"Notice Updated"

});


}


);


};

module.exports={

createNotice,

getNotices,

deleteNotice,

updateNotice

};