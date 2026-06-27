require("dotenv").config();

const express = require("express");
const cors = require("cors");

require("./config/db");

const app = express();

const authRoutes=require("./routes/authRoutes");
const studentRoutes=require("./routes/studentRoutes");
const timetableRoutes=require("./routes/timetableRoutes");
const assignmentRoutes=require("./routes/assignmentRoutes");
const noticeRoutes=require("./routes/noticeRoutes");
const noteRoutes=require("./routes/noteRoutes");
const attendanceRoutes=require("./routes/attendanceRoutes");
const profileRoutes=require("./routes/profileRoutes");

const cookieParser=require("cookie-parser");

app.use(

cors(

{

origin:"http://localhost:3000",

credentials:true

}

)

);
app.use(express.json());
app.use(cookieParser());
app.use(

"/students",

studentRoutes

);

app.use(

"/auth",

authRoutes

);
app.use(

"/timetable",

timetableRoutes

);
app.use(

"/assignments",

assignmentRoutes

);

app.use(

"/notices",

noticeRoutes

);

app.use(

"/uploads",

express.static("uploads")

);


app.use(

"/notes",

noteRoutes

);

app.use(

"/attendance",

attendanceRoutes

);

app.use(

"/profile",

profileRoutes

);


app.get("/", (req, res) => {

res.send("CampusSync Backend Running");

});


app.listen(5000, () => {

console.log("Server running on port 5000");

});