"use client"

import {useEffect,useState} from "react";
import axios from "axios";


export default function TimetablePage(){


const [subject,setSubject]=useState("");

const [days,setDays]=useState([]);

const [start_time,setStartTime]=useState("");

const [end_time,setEndTime]=useState("");

const [room,setRoom]=useState("");

const [lectures,setLectures]=useState([]);

const [editingId,setEditingId]=useState(null);

const createLecture = async()=>{

try{

if(

!subject ||

days.length===0 ||

!start_time ||

!end_time ||

!room

){

alert(

"Please fill all fields"

);

return;

}


if(

end_time<=start_time

){

alert(

"End time should be after start time"

);

return;

}

const alreadyExists=lectures.some(

lecture=>

lecture.subject===subject

&&

lecture.day===days.join(", ")

&&

lecture.start_time===start_time

);


if(alreadyExists){


alert(

"Lecture already exists"

);


return;


}


await axios.post(

`${process.env.NEXT_PUBLIC_API_URL}/timetable/create`,

{

subject,

day:days.join(", "),

start_time,

end_time,

room

}

);


alert("Lecture Added");

fetchLectures();

setSubject("");

setDays([]);

setStartTime("");

setEndTime("");

setRoom("");


}


catch(error){

console.log(error);

alert("Failed to Add Lecture");

}

}

const deleteLecture = async(id)=>{


await axios.delete(

`${process.env.NEXT_PUBLIC_API_URL}/timetable/${id}`

);


fetchLectures();


}

const editLecture=(lecture)=>{


setEditingId(

lecture.id

);


setSubject(

lecture.subject

);


setDays(

lecture.day

.split(",")

.map(

d=>d.trim()

)

);

setStartTime(

lecture.start_time

);


setEndTime(

lecture.end_time

);


setRoom(

lecture.room

);


}

const saveLecture=async()=>{


await axios.put(

`${process.env.NEXT_PUBLIC_API_URL}/timetable/${editingId}`,

{

subject,

day:days.join(", "),

start_time,

end_time,

room

}

);


alert(

"Lecture Updated"

);


setEditingId(null);


setSubject("");

setDays([]);

setStartTime("");

setEndTime("");

setRoom("");


fetchLectures();


}

const handleDayChange=(selectedDay)=>{

if(days.includes(selectedDay)){

setDays(

days.filter(

day=>day!==selectedDay

)

);

}

else{

setDays(

[

...days,

selectedDay

]

);

}

}

const fetchLectures = async()=>{


const response = await axios.get(

`${process.env.NEXT_PUBLIC_API_URL}/timetable`

);


setLectures(

response.data

);


}

useEffect(()=>{


fetchLectures();


},[]);

return (

<div>

<h1 className="text-3xl font-bold">
Timetable
</h1>

<p className="mt-2 text-slate-500">
Manage lectures
</p>


<div className="mt-10 max-w-xl">

<div className="bg-[#1E1B2E] border border-[#3A3650] p-6 rounded-xl">


<input
type="text"
placeholder="Subject"
value={subject}
onChange={(e)=>setSubject(e.target.value)}
className="w-full bg-slate-900 p-3 rounded-lg mb-4 outline-none"
/>

<div className="mb-4">

<p className="mb-3 text-slate-400">

Select Days

</p>


<div className="grid grid-cols-1 md:grid-cols-2 gap-5">


{

[

"Monday",

"Tuesday",

"Wednesday",

"Thursday",

"Friday",

"Saturday"

]

.map(

(day)=>(


<label

key={day}

className="flex items-center gap-2"

>


<input

type="checkbox"

className="

w-4

h-4

accent-[#8B7FD1]

"

checked={

days.includes(day)

}

onChange={()=>handleDayChange(day)}

/>


{day}


</label>


)

)

}


</div>


</div>

<input
type="time"
value={start_time}
onChange={(e)=>setStartTime(e.target.value)}
className="w-full bg-slate-900 p-3 rounded-lg mb-4 outline-none"
/>


<input
type="time"
value={end_time}
onChange={(e)=>setEndTime(e.target.value)}
className="w-full bg-slate-900 p-3 rounded-lg mb-4 outline-none"
/>


<input
type="text"
placeholder="Room"
value={room}
onChange={(e)=>setRoom(e.target.value)}
className="w-full bg-slate-900 p-3 rounded-lg mb-6 outline-none"
/>


<button
onClick={


editingId

?

saveLecture

:

createLecture


}
className="w-full bg-[#8B7FD1] py-3 rounded-lg font-semibold hover:-translate-y-1 hover:shadow-[0_0_20px_#8B7FD1] duration-300"
>

{

editingId

?

"Save Changes"

:

"Add Lecture"

}

</button>

</div>

</div>



<div className="mt-12">

<h2 className="text-2xl font-bold mb-6">

Lectures

</h2>


<div className="grid md:grid-cols-2 gap-5">


{

lectures.map((lecture)=>{

return(

<div

key={lecture.id}

className="bg-[#1E1B2E] border border-[#3A3650] p-5 rounded-xl hover:-translate-y-1 hover:shadow-[0_0_20px_#8B7FD1] duration-300"

>


<h3 className="text-xl font-semibold">


{


lecture.subject


||


"No Subject"


}


</h3>


<p className="text-[#B8B3C9] mt-3">

{lecture.day}

</p>


<p className="mt-2">

{


lecture.start_time

.slice(0,5)

}


{" → "}


{


lecture.end_time

.slice(0,5)

}

</p>


<p className="mt-2">

Room

{" "}

{lecture.room}

</p>



<div className="flex flex-wrap gap-3 mt-5">


<button


onClick={()=>editLecture(

lecture

)}


className="

bg-cyan-600

px-4

py-2

rounded-lg


hover:bg-cyan-700


duration-300

"

>


Edit


</button>



<button


onClick={()=>deleteLecture(

lecture.id

)}


className="

bg-red-500

px-4

py-2

rounded-lg


hover:bg-red-600


duration-300

"

>


Delete


</button>



</div>


</div>

)

})

}


</div>

</div>

</div>

);

}