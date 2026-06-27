"use client"

import { useEffect, useState } from "react";
import axios from "axios";

export default function AssignmentsPage() {

const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [dueDate, setDueDate] = useState("");
const [pdf, setPdf] = useState(null);

const [assignments, setAssignments] = useState([]);

const [editingId,setEditingId]=useState(null);
const [search,setSearch]=useState("");


const fetchAssignments = async () => {

const response = await axios.get(

`${process.env.NEXT_PUBLIC_API_URL}/assignments`

);

setAssignments(response.data);

};


const createAssignment = async()=>{

try{

console.log("title =",title);

console.log("description =",description);

console.log("dueDate =",dueDate);

console.log("pdf =",pdf);

if(

!title ||

!description ||

!dueDate ||

!pdf

){

alert(

"Please fill all fields"

);

return;

}


const formData = new FormData();

formData.append(

"title",

title

);

formData.append(

"description",

description

);

formData.append(

"due_date",

dueDate

);

formData.append(

"pdf",

pdf

);


await axios.post(

`${process.env.NEXT_PUBLIC_API_URL}/assignments/create`,

formData

);


alert(

"Assignment Created"

);


fetchAssignments();


setTitle("");

setDescription("");

setDueDate("");

setPdf(null);


}

catch(error){

console.log(error);

alert(

"Failed to Create Assignment"

);

}

};


const deleteAssignment = async (id) => {

const confirmDelete = window.confirm(

"Are you sure you want to delete this assignment?"

);


if (!confirmDelete) return;



await axios.delete(

`${process.env.NEXT_PUBLIC_API_URL}/assignments/${id}`

);



alert(

"Assignment deleted successfully"

);


fetchAssignments();

};

const editAssignment=(assignment)=>{


setEditingId(

assignment.id

);


setTitle(

assignment.title

);


setDescription(

assignment.description

);


setDueDate(

assignment.due_date

);


setPdf(null);


}

const saveAssignment = async()=>{

if(

!title ||

!description ||

!dueDate

){

alert(

"Please fill all fields"

);

return;

}


await axios.put(

`${process.env.NEXT_PUBLIC_API_URL}/assignments/${editingId}`,

{

title,

description,

due_date:dueDate

}

);


alert(

"Assignment Updated"

);


setEditingId(null);

setTitle("");

setDescription("");

setDueDate("");

setPdf(null);


fetchAssignments();

};


useEffect(() => {

fetchAssignments();

}, []);

return (

<div>

<h1 className="text-3xl font-bold">
Assignments
</h1>

<p className="mt-2 text-slate-500">
Manage Assignments
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

placeholder="Assignment Title"

value={title}

onChange={(e)=>setTitle(

e.target.value

)}

className="

w-full

bg-slate-900

p-3

rounded-lg

mb-4

outline-none

"

/>

<textarea
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
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
type="date"
value={dueDate}
onChange={(e)=>setDueDate(e.target.value)}
className="
w-full
bg-slate-900
p-3
rounded-lg
mb-4
outline-none
"
/>



{

!editingId && (

<div
className="
bg-slate-900
p-4
rounded-lg
mb-6
"
>

<input
type="file"
accept=".pdf"
id="pdf"
className="hidden"
onChange={(e)=>setPdf(e.target.files[0])}
/>

<label
htmlFor="pdf"
className="cursor-pointer"
>

{
pdf
?
`📄 ${pdf.name}`
:
"Choose PDF"
}

</label>

</div>

)

}



<button

onClick={

editingId
?
saveAssignment
:
createAssignment

}

className="
w-full
bg-[#8B7FD1]
py-3
rounded-lg
font-semibold
hover:-translate-y-1
hover:shadow-[0_0_20px_#8B7FD1]
duration-300
"

>

{
editingId
?
"Save Changes"
:
"Create Assignment"
}

</button>

</div>

</div>





<div className="mt-12">

<h2 className="text-2xl font-bold mb-6">
Assignments
</h2>

<div

className="

bg-[#1E1B2E]

border border-[#3A3650]

p-5

rounded-xl

mb-6

"

>

<input

type="text"

placeholder="Search Assignment"

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="

w-full

bg-slate-900

p-3

rounded-lg

outline-none

"

/>

</div>


<div className="grid grid-cols-1 md:grid-cols-2 gap-5">

{

assignments

.filter(

assignment=>

assignment.title

.toLowerCase()

.includes(

search.toLowerCase()

)

)

.map(

(assignment)=>(

<div

key={assignment.id}

className="
bg-[#1E1B2E]
border border-[#3A3650]
p-5
rounded-xl
hover:-translate-y-1
hover:shadow-[0_0_20px_#8B7FD1]
duration-300
"

>


<h3 className="text-xl font-semibold">
{assignment.title}
</h3>



<p className="mt-3">
{assignment.description}
</p>



<p className="mt-3 text-[#B8B3C9]">

Due :

{

new Date(

assignment.due_date

).toLocaleDateString()

}

</p>



<p className="mt-2 text-slate-400">

📄

{

assignment.pdf_file
.split("_")
.slice(1)
.join("_")

}

</p>




<div className="flex flex-wrap gap-3 mt-5">


<a

href={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${assignment.pdf_file}`}

target="_blank"

download

className="
bg-cyan-600
px-4
py-2
rounded-lg
hover:bg-cyan-700
duration-300
"

>

Download

</a>



<button

onClick={()=>editAssignment(assignment)}

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

onClick={()=>deleteAssignment(

assignment.id

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

)

}


</div>


</div>


</div>

)

}