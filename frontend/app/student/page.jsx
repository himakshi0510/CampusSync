"use client"

import {useEffect,useState} from "react";
import axios from "axios";

export default function StudentDashboard() {

const [lectureCount,setLectureCount]=useState(0);
const [assignmentCount,setAssignmentCount]=useState(0);
const [noticeCount,setNoticeCount]=useState(0);
const [noteCount,setNoteCount]=useState(0); 
const [attendancePercentage,setAttendancePercentage]=useState(0);  

useEffect(()=>{


const loadData=async()=>{

const user=await axios.get(

`${process.env.NEXT_PUBLIC_API_URL}/auth/me`,

{

withCredentials:true

}

);

const attendance=await axios.get(

`${process.env.NEXT_PUBLIC_API_URL}/attendance/student/${user.data.id}`

);


if(attendance.data){

const a=attendance.data;


setAttendancePercentage(

a.total_classes===0

?

0

:

(

a.present_classes/

a.total_classes

*100

).toFixed(1)

);

}

const assignments=await axios.get(

`${process.env.NEXT_PUBLIC_API_URL}/assignments`

);


const notices=await axios.get(

`${process.env.NEXT_PUBLIC_API_URL}/notices`

);


const notes=await axios.get(

`${process.env.NEXT_PUBLIC_API_URL}/notes`

);

const timetable=await axios.get(
`${process.env.NEXT_PUBLIC_API_URL}/timetable`
);

setLectureCount(
timetable.data.length
);


setAssignmentCount(

assignments.data.length

);


setNoticeCount(

notices.data.length

);


setNoteCount(

notes.data.length

);


};


loadData();


},[]);

return (

<div>

<h1 className="text-3xl font-bold">

Student Dashboard

</h1>

<p className="mt-2 text-slate-500">

Welcome back Student

</p>


<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mt-10">


<div className="bg-[#1E1B2E] border border-[#3A3650] p-5 rounded-xl hover:border-[#8B7FD1] hover:-translate-y-1 duration-300">

<h2 className="text-3xl font-bold text-[#F8F5F0]">

{lectureCount}

</h2>

<p className="text-[#B8B3C9] mt-2">

Timetable

</p>

</div>

<div className="bg-[#1E1B2E] border border-[#3A3650] p-5 rounded-xl hover:border-[#8B7FD1] hover:-translate-y-1 duration-300">

<h2 className="text-3xl font-bold text-[#F8F5F0]">

{

attendancePercentage

?

attendancePercentage

:

0

}%

</h2>

<p className="text-[#B8B3C9] mt-2">

Attendance

</p>

</div>

<div className="bg-[#1E1B2E] border border-[#3A3650] p-5 rounded-xl hover:border-[#8B7FD1] hover:-translate-y-1 duration-300">

<h2 className="text-3xl font-bold text-[#F8F5F0]">

{assignmentCount}

</h2>

<p className="text-[#B8B3C9] mt-2">

Assignments

</p>

</div>



<div className="bg-[#1E1B2E] border border-[#3A3650] p-5 rounded-xl hover:border-[#8B7FD1] hover:-translate-y-1 duration-300">

<h2 className="text-3xl font-bold text-[#F8F5F0]">

{noteCount}

</h2>

<p className="text-[#B8B3C9] mt-2">

Notes

</p>

</div>



<div className="bg-[#1E1B2E] border border-[#3A3650] p-5 rounded-xl hover:border-[#8B7FD1] hover:-translate-y-1 duration-300">

<h2 className="text-3xl font-bold text-[#F8F5F0]">

{noticeCount}

</h2>

<p className="text-[#B8B3C9] mt-2">

Notices

</p>

</div>




</div>

</div>

)

}