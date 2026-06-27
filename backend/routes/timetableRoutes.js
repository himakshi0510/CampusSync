const express = require("express");

const router = express.Router();

const {

createLecture,

getLectures,

deleteLecture,

updateLecture

} = require("../controllers/timetableController");


router.post(

"/create",

createLecture

);



router.get(

"/",

getLectures

);

router.delete(

"/:id",

deleteLecture

);

router.put(

"/:id",

updateLecture

);


module.exports = router;