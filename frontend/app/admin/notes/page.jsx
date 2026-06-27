"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function NotesPage() {

const [title, setTitle] = useState("");
const [pdf, setPdf] = useState(null);
const [notes, setNotes] = useState([]);
const [editingId,setEditingId]=useState(null);




const fetchNotes = async () => {

const response = await axios.get(

`${process.env.NEXT_PUBLIC_API_URL}/notes`

);

setNotes(response.data);

};




const createNote = async () => {

try {
if(!title || !pdf){

alert("Please enter title and select a PDF");

return;

}

const formData = new FormData();

formData.append("title", title);
formData.append("pdf", pdf);

console.log(title);
console.log(pdf);

await axios.post(

`${process.env.NEXT_PUBLIC_API_URL}/notes/create`,

formData

);


alert("Note Uploaded");

fetchNotes();

setTitle("");
setPdf(null);


}

catch(error){

console.log(error);

alert("Failed to Upload Note");

}

};




const deleteNote = async(id) => {


const confirmDelete = window.confirm(

"Delete this note?"

);


if(!confirmDelete){

return;

}



await axios.delete(

`${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`

);



alert("Note Deleted");


fetchNotes();


};

const editNote=(note)=>{

setEditingId(

note.id

);

setTitle(

note.title

);

};

const saveNote=async()=>{


await axios.put(

`${process.env.NEXT_PUBLIC_API_URL}/notes/${editingId}`,

{

title

}

);


alert(

"Note Updated"

);


setEditingId(null);

setTitle("");


fetchNotes();


}


useEffect(()=>{


fetchNotes();


},[]);





return(

<div>



<h1 className="text-3xl font-bold">

Notes

</h1>



<p className="mt-2 text-slate-500">

Manage Study Notes

</p>






<div className="mt-10 max-w-xl">


<div

className="

bg-[#1E1B2E]

border border-[#3A3650]

p-6

rounded-xl

"

>



<input

type="text"

placeholder="Note Title"

value={title}

onChange={(e)=>setTitle(e.target.value)}

className="

w-full

bg-slate-900

p-3

rounded-lg

mb-4

outline-none

"

/>





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

id="note"

className="hidden"

onChange={(e)=>setPdf(

e.target.files[0]

)}

/>




<label

htmlFor="note"

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



<button

onClick={

editingId

?

saveNote

:

createNote

}

className="

w-full

bg-cyan-600

py-3

rounded-lg

font-semibold

hover:bg-cyan-700

duration-300

"

>

{

editingId

?

"Save Changes"

:

"Upload Note"

}

</button>




</div>


</div>








<div className="mt-12">


<h2 className="text-2xl font-bold mb-6">

Study Notes

</h2>





<div className="grid grid-cols-1 md:grid-cols-2 gap-5">


{

notes.map((note)=>(



<div


key={note.id}


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

{note.title}

</h3>





<p className="mt-3 text-slate-400">


📄


{

note.pdf_file

?

note.pdf_file

.split("_")

.slice(1)

.join("_")

:

"No File"

}


</p>






<div className="flex flex-wrap gap-3 mt-5">



<a

href={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${note.pdf_file}`}

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


onClick={()=>editNote(

note

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

onClick={()=>deleteNote(

note.id

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



))

}



</div>



</div>





</div>

);


}