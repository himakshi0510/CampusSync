"use client"

import {useEffect,useState} from "react";
import axios from "axios";

export default function AttendancePage(){

const [students,setStudents]=useState([]);

const [editingId,setEditingId]=useState(null);

const [present,setPresent]=useState(0);

const [total,setTotal]=useState(0);


const fetchAttendance=async()=>{

const response=await axios.get(

`${process.env.NEXT_PUBLIC_API_URL}/attendance`

);

setStudents(response.data);

};



useEffect(()=>{

fetchAttendance();

},[]);



const editAttendance=(student)=>{

setEditingId(

student.student_id

);

setPresent(

student.present_classes

);

setTotal(

student.total_classes

);

};



const saveAttendance=async()=>{

console.log(editingId);
console.log(present);
console.log(total);


if(

present>total

){

alert(

"Present classes cannot exceed total classes"

);

return;

}


await axios.put(

`${process.env.NEXT_PUBLIC_API_URL}/attendance/${editingId}`,

{

present_classes:present,

total_classes:total

}

);


alert(

"Attendance Updated"

);


setEditingId(null);

fetchAttendance();


};




return(

<div>


<h1 className="text-3xl font-bold">

Attendance

</h1>


<p className="mt-2 text-slate-500">

Manage Student Attendance

</p>



<div className="grid md:grid-cols-2 gap-5 mt-10">


{

students.map(

(student)=>(



<div

key={student.student_id}

className="

bg-[#1E1B2E]

border border-[#3A3650]

p-5

rounded-xl

"

>



<h2 className="text-xl font-bold">

{student.name}

</h2>



<p className="mt-3">

Present :

{

editingId===student.student_id

?

<input

type="number"

value={present}

onChange={(e)=>setPresent(

e.target.value

)}

className="bg-slate-900 p-2 rounded-lg ml-2"

/>

:

student.present_classes

}

</p>



<p className="mt-3">

Total :

{

editingId===student.student_id

?

<input

type="number"

value={total}

onChange={(e)=>setTotal(

e.target.value

)}

className="bg-slate-900 p-2 rounded-lg ml-2"

/>

:

student.total_classes

}

</p>



<p className="mt-3">

Percentage :

{

student.total_classes===0

?

0

:

(

student.present_classes/

student.total_classes

*100

).toFixed(1)

}

%

</p>




<button


onClick={()=>{


editingId===student.student_id

?

saveAttendance()

:

editAttendance(student)


}}

className="

mt-5

bg-cyan-600

px-4

py-2

rounded-lg

"

>


{

editingId===student.student_id

?

"Save"

:

"Edit"

}


</button>



</div>



)

)


}


</div>



</div>


)

}