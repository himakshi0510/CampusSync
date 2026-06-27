"use client"

import {useEffect,useState} from "react";
import axios from "axios";

export default function TimetablePage(){

const [lectures,setLectures]=useState([]);

const fetchLectures=async()=>{

const response=await axios.get(

`${process.env.NEXT_PUBLIC_API_URL}/timetable`

);

setLectures(

response.data

);

};

useEffect(()=>{

fetchLectures();

},[]);


return(

<div>

<h1 className="text-3xl font-bold">

Timetable

</h1>


<p className="mt-2 text-slate-500">

Your Weekly Schedule

</p>



<div className="grid grid-cols-1 md:grid-cols-2 gap-5">

{

lectures.map(

(lecture)=>(

<div

key={lecture.id}

className="

bg-[#1E1B2E]

border border-[#3A3650]

p-5

rounded-xl

"

>

<h3 className="text-xl font-semibold">

{lecture.subject}

</h3>


<p className="mt-3 text-slate-400">

📅 {lecture.day}

</p>


<p className="mt-2">

🕒

{

lecture.start_time.slice(0,5)

}

→

{

lecture.end_time.slice(0,5)

}

</p>


<p className="mt-2">

🏫 Room {lecture.room}

</p>


</div>

)

)

}

</div>

</div>

)

}