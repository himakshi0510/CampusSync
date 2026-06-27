const express=require("express");

const router=express.Router();


const{

createStudent,

getStudents,

deleteStudent,

updateStudent

}=require("../controllers/studentController");



router.post(

"/create",

createStudent

);


router.get(

"/",

getStudents

);


router.delete(

"/:id",

deleteStudent

);

router.put(

"/:id",

updateStudent

);


module.exports=router;