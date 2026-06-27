const express=require("express");
const router=express.Router();

const{

getAttendance,
updateAttendance,
getStudentAttendance

}=require("../controllers/attendanceController");


router.get(
"/",
getAttendance
);

router.get(
"/student/:id",
getStudentAttendance
);

router.put(
"/:id",
updateAttendance
);

module.exports=router;