const connection=require("../config/db");

const createNote=(req,res)=>{

const {title}=req.body;

const pdf_file=req.file.filename;

connection.query(

"INSERT INTO notes(title,pdf_file) VALUES(?,?)",

[title,pdf_file],

(err,result)=>{

if(err){

return res.status(500).json(err);

}

res.json({

message:"Note Uploaded"

});

}

);

};


const getNotes=(req,res)=>{


connection.query(

"SELECT * FROM notes ORDER BY created_at DESC",


(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json(result);


}


);


};



const deleteNote=(req,res)=>{


const{id}=req.params;



connection.query(

"DELETE FROM notes WHERE id=?",

[id],


(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json({

message:"Note Deleted"

});


}


);


};

const updateNote=(req,res)=>{

const{id}=req.params;

const{title}=req.body;

connection.query(

"UPDATE notes SET title=? WHERE id=?",

[title,id],

(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json({

message:"Note Updated"

});


}

);

};



module.exports={

createNote,

getNotes,

deleteNote,

updateNote

};