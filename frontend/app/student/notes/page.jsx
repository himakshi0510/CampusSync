"use client"

import {useEffect,useState} from "react";
import axios from "axios";

export default function NotesPage(){

const [notes,setNotes]=useState([]);


const fetchNotes=async()=>{

const response=await axios.get(

`${process.env.NEXT_PUBLIC_API_URL}/notes`

);

setNotes(

response.data

);

};


useEffect(()=>{

fetchNotes();

},[]);


return(

<div>

<h1 className="text-3xl font-bold">

Study Notes

</h1>


<p className="mt-2 text-slate-500">

Download Study Material

</p>



<div className="grid grid-cols-1 md:grid-cols-2 gap-5">


{

notes.map(

(note)=>(


<div

key={note.id}

className="

bg-[#1E1B2E]

border border-[#3A3650]

p-5

rounded-xl

"

>


<h3 className="text-xl font-semibold">

{note.title}

</h3>



<a

href={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${note.pdf_file}`}

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

Download

</a>


</div>

)

)

}


</div>

</div>

)

}