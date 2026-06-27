"use client"
import {useState,useEffect} from "react";
import axios from "axios";
export default function StudentsPage() {

const [name,setName]=useState("");

const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [showPassword,setShowPassword]=useState(false);

const [editingId,setEditingId]=useState(null);

const [students,setStudents]=useState([]);

const [search,setSearch]=useState("");

const createStudent = async()=>{

try{

if(

!name ||

!email ||

!password

){

alert(

"Please fill all fields"

);

return;

}


if(

!email.includes("@")

){

alert(

"Invalid Email"

);

return;

}


if(

password.length<6

){

alert(

"Password should contain at least 6 characters"

);

return;

}

await axios.post(

`${process.env.NEXT_PUBLIC_API_URL}/students/create`,

{

name,

email,

password

}

);


alert("Student Created");


setName("");

setEmail("");

setPassword("");

fetchStudents();

}

catch(error){

console.log(error);

}

}

const fetchStudents=async()=>{

const response=await axios.get(

`${process.env.NEXT_PUBLIC_API_URL}/students`

);

setStudents(

response.data

);

}


const deleteStudent=async(id)=>{

const confirmDelete=window.confirm(

"Delete this student?"

);

if(!confirmDelete){

return;

}

await axios.delete(

`${process.env.NEXT_PUBLIC_API_URL}/students/${id}`

);

fetchStudents();

}

const editStudent=(student)=>{


setEditingId(

student.id

);


setName(

student.name

);


setEmail(

student.email

);


setPassword("");


}

const saveStudent=async()=>{


await axios.put(

`${process.env.NEXT_PUBLIC_API_URL}/students/${editingId}`,

{

name,
email

}

);


alert(

"Student Updated"

);


setEditingId(null);

setName("");

setEmail("");

setPassword("");


fetchStudents();


}

useEffect(()=>{

fetchStudents();

},[]);


return(

<div>

<h1 className="text-3xl font-bold">

Students

</h1>


<p className="mt-2 text-slate-500">

Create student accounts

</p>



<div className="mt-10 max-w-xl">


<div className="
bg-[#1E1B2E]
border border-[#3A3650]
p-6
rounded-xl
">


<input

type="text"

placeholder="Student Name"

value={name}

onChange={(e)=>setName(e.target.value)}

className="
w-full
bg-slate-900
p-3
rounded-lg
mb-4
outline-none
"

/>


<input

type="email"

placeholder="Student Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

className="
w-full
bg-slate-900
p-3
rounded-lg
mb-4
outline-none
"

/>



<div className="relative">


<input

type={

showPassword

?

"text"

:

"password"

}

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

className="

w-full

bg-slate-900

p-3

rounded-lg

mb-6

outline-none

pr-12

"

/>



<button

type="button"

onClick={()=>setShowPassword(

!showPassword

)}

className="

absolute

right-4

top-3

text-slate-400

"

>


{

showPassword

?

"🙈"

:

"👁️"

}


</button>



</div>



<button

onClick={


editingId

?

saveStudent

:

createStudent


}

className="
w-full
bg-[#8B7FD1]
py-3
rounded-lg
font-semibold

hover:shadow-[0_0_20px_#8B7FD1]

duration-300
"

>

{


editingId

?

"Save Changes"

:

"Create Student"

}

</button>

</div>

</div>



<div className="mt-12">


<h2 className="text-2xl font-bold mb-6">

Students

</h2>

<input


type="text"


placeholder="Search Student"


value={search}


onChange={(e)=>setSearch(e.target.value)}


className="

w-full

bg-slate-900

p-3

rounded-lg

mb-6

outline-none

"


/>



<div className="grid grid-cols-1 md:grid-cols-2 gap-5">


{

students

.filter(

(student)=>


student.name

.toLowerCase()

.includes(

search.toLowerCase()

)


)

.map(

(student)=>(


<div


key={student.id}


className="

bg-[#1E1B2E]

border border-[#3A3650]

p-5

rounded-xl

"


>


<h3 className="text-xl font-semibold">

{

student.name

}

</h3>



<p className="mt-3 text-slate-400">

{

student.email

}

</p>

<button


onClick={()=>editStudent(

student

)}


className="

mr-3

mt-4

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


onClick={()=>deleteStudent(

student.id

)}

className="

mt-4

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


)


)


}


</div>


</div>



</div>

)

}