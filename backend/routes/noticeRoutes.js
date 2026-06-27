const express=require("express");

const router=express.Router();


const{

createNotice,

getNotices,

deleteNotice,

updateNotice

}=require(

"../controllers/noticeController"

);



router.post(

"/create",

createNotice

);


router.get(

"/",

getNotices

);


router.delete(

"/:id",

deleteNotice

);

router.put(

"/:id",

updateNotice

);


module.exports=router;