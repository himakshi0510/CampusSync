"use client"

import {useEffect,useState} from "react";
import axios from "axios";

export default function AssignmentsPage(){

const [assignments,setAssignments]=useState([]);


const fetchAssignments=async()=>{

const response=await axios.get(

`${process.env.NEXT_PUBLIC_API_URL}/assignments`

);

setAssignments(

response.data

);

};


useEffect(()=>{

fetchAssignments();

},[]);


return(

<div>

<h1 className="text-3xl font-bold">

Assignments

</h1>


<p className="mt-2 text-slate-500">

Your Assignments

</p>



<div className="grid grid-cols-1 md:grid-cols-2 gap-5">


{

assignments.map(

(assignment)=>(


<div

key={assignment.id}

className="

bg-[#1E1B2E]

border border-[#3A3650]

p-5

rounded-xl

"

>


<h3 className="text-xl font-semibold">

{assignment.title}

</h3>



<p className="mt-3">

{assignment.description}

</p>



<p className="mt-3 text-slate-400">

📅 Due :

{

new Date(

assignment.due_date

).toLocaleDateString()

}

</p>



<a

href={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${assignment.pdf_file}`}

target="_blank"

download

className="

inline-block

mt-5

bg-cyan-600

px-4

py-2

rounded-lg

hover:bg-cyan-700

duration-300

"

>

Download PDF

</a>


</div>

)

)

}


</div>

</div>

)

}