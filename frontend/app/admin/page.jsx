"use client"

import {useEffect,useState} from "react";
import axios from "axios";

export default function AdminDashboard() {
const [studentCount,setStudentCount]=useState(0);
const [assignmentCount,setAssignmentCount]=useState(0);
const [noteCount,setNoteCount]=useState(0);
const [noticeCount,setNoticeCount]=useState(0);

useEffect(()=>{

const loadData=async()=>{

const students=await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/students`);

const assignments=await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/assignments`);

const notes=await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notes`);

const notices=await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notices`);


setStudentCount(students.data.length);

setAssignmentCount(assignments.data.length);

setNoteCount(notes.data.length);

setNoticeCount(notices.data.length);

};

loadData();

},[]);

return (

<div>

<h1 className="text-3xl font-bold">

Admin Dashboard

</h1>

<p className="mt-2 text-slate-500">

Welcome back Admin

</p>


<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">


<div className="bg-[#1E1B2E] border border-[#3A3650] p-5 rounded-xl hover:border-[#8B7FD1] hover:-translate-y-1 duration-300">

<h2 className="text-3xl font-bold text-[#F8F5F0]">

{studentCount}

</h2>

<p className="text-[#B8B3C9] mt-2">

Students

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