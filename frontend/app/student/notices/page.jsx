"use client"

import {useEffect,useState} from "react";
import axios from "axios";

export default function NoticesPage(){

const [search,setSearch]=useState("");

const [notices,setNotices]=useState([]);


const fetchNotices=async()=>{

const response=await axios.get(

`${process.env.NEXT_PUBLIC_API_URL}/notices`

);

setNotices(

response.data

);

};


useEffect(()=>{

fetchNotices();

},[]);


return(

<div>

<h1 className="text-3xl font-bold">

Campus Notices

</h1>

<input

type="text"

placeholder="Search Notices"

value={search}

onChange={(e)=>setSearch(

e.target.value

)}

className="

w-full

md:w-80

bg-slate-900

p-3

rounded-lg

mb-6

outline-none

"

/>


<p className="mt-2 text-slate-500">

Latest Announcements

</p>



<div className="grid grid-cols-1 md:grid-cols-2 gap-5">


{

notices

.filter(

notice=>

notice.title

.toLowerCase()

.includes(

search.toLowerCase()

)

||

notice.description

.toLowerCase()

.includes(

search.toLowerCase()

)

)

.map(

(notice)=>(


<div

key={notice.id}

className="

bg-[#1E1B2E]

border border-[#3A3650]

p-5

rounded-xl

"

>


<h3 className="text-xl font-semibold">

{notice.title}

</h3>



<p className="mt-3">

{notice.description}

</p>



<p className="mt-3 text-slate-400">

{

new Date(

notice.created_at

)

.toLocaleDateString()

}

</p>


</div>

)

)

}


</div>

</div>

)

}