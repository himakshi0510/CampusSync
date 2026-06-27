const express=require("express");

const router=express.Router();


const{

createAssignment,

getAssignments,

deleteAssignment,

updateAssignment

}=require(

"../controllers/assignmentController"

);

const upload=require(

"../middleware/upload"

);



router.post(

"/create",

upload.single("pdf"),

createAssignment

);

router.get(

"/",

getAssignments

);

router.delete(

"/:id",

deleteAssignment

);

router.put(

"/:id",

updateAssignment

);



module.exports=router;