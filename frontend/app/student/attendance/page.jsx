"use client"

import {

Chart as ChartJS,

ArcElement,

Tooltip,

Legend

} from "chart.js";

import {Pie} from "react-chartjs-2";


ChartJS.register(

ArcElement,

Tooltip,

Legend

);

import {useEffect,useState} from "react";
import axios from "axios";

export default function StudentAttendance(){

const [attendance,setAttendance]=useState({});

useEffect(()=>{

getUser();

},[]);


const getUser=async()=>{

try{

const user=await axios.get(

`${process.env.NEXT_PUBLIC_API_URL}/auth/me`,

{

withCredentials:true

}

);

fetchAttendance(

user.data.id

);

}

catch(error){

console.log(error);

alert(

"Unable to get user"

);

}

};



const fetchAttendance=async(id)=>{

try{

const response=await axios.get(

`${process.env.NEXT_PUBLIC_API_URL}/attendance/student/${id}`

);

setAttendance(

response.data

);

}

catch(error){

console.log(error);

alert(

"Unable to fetch attendance"

);

}

};


const chartData={

labels:[

"Present",

"Absent"

],

datasets:[

{

data:[

attendance.present_classes || 0,

(

attendance.total_classes || 0

)

-

(

attendance.present_classes || 0

)

]

}

]

};


return(

<div>

<h1 className="text-3xl font-bold">

Attendance

</h1>


<p className="mt-2 text-slate-500">

Your Attendance Record

</p>



<div className="grid md:grid-cols-2 gap-5 mt-10">


<div

className="

bg-[#1E1B2E]

border border-[#3A3650]

p-5

rounded-xl

"

>

<h2 className="text-xl font-bold">

{

attendance.name ||

"Student"

}

</h2>



<p className="mt-3">

Present Classes :

{

attendance.present_classes ||

0

}

</p>



<p className="mt-2">

Total Classes :

{

attendance.total_classes ||

0

}

</p>



<p className="mt-2">

Attendance :

{

attendance.total_classes

?

(

attendance.present_classes/

attendance.total_classes

*100

).toFixed(1)

:

0

}

%

</p>


</div>


</div>

<div

className="

bg-[#1E1B2E]

border border-[#3A3650]

p-5

rounded-xl

"

>

<Pie data={chartData}/>

</div>


</div>

)

}