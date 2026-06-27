"use client"

import {useEffect,useState} from "react";
import axios from "axios";


export default function NoticesPage(){


const[title,setTitle]=useState("");

const[description,setDescription]=useState("");

const[notices,setNotices]=useState([]);

const[editingId,setEditingId]=useState(null);

const[search,setSearch]=useState("");

const fetchNotices=async()=>{


const response=await axios.get(

`${process.env.NEXT_PUBLIC_API_URL}
/notices`

);


setNotices(

response.data

);


};



const createNotice=async()=>{


if(

!title ||

!description

){

alert(

"Please fill all fields"

);

return;

}


await axios.post(

`${process.env.NEXT_PUBLIC_API_URL}/notices/create`,

{

title,
description

}

);



alert(

"Notice Posted"

);


fetchNotices();



setTitle("");

setDescription("");


};



const deleteNotice=async(id)=>{


const confirmDelete=

window.confirm(

"Delete this notice?"

);



if(!confirmDelete){

return;

}



await axios.delete(

`${process.env.NEXT_PUBLIC_API_URL}/notices/${id}`

);



fetchNotices();


};

const editNotice=(notice)=>{


setEditingId(

notice.id

);


setTitle(

notice.title

);


setDescription(

notice.description

);


};



const saveNotice=async()=>{


await axios.put(

`${process.env.NEXT_PUBLIC_API_URL}/notices/${editingId}`,

{

title,

description

}

);


alert(

"Notice Updated"

);


setEditingId(null);


setTitle("");

setDescription("");


fetchNotices();


};

useEffect(()=>{


fetchNotices();


},[]);



return(


<div>


<h1 className="text-3xl font-bold">

Notices

</h1>



<p className="mt-2 text-slate-500">

Manage Notices

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


placeholder="Title"


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




<textarea


placeholder="Description"


value={description}


onChange={(e)=>setDescription(e.target.value)}


className="

w-full

bg-slate-900

p-3

rounded-lg

mb-6

outline-none

"

/>




<button


onClick={


editingId

?

saveNotice

:

createNotice


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

"Post Notice"

}


</button>



</div>



</div>



<div className="mt-12">


<h2 className="text-2xl font-bold mb-6">

Campus Notices

</h2>

<input


type="text"


placeholder="Search Notice"


value={search}


onChange={(e)=>setSearch(

e.target.value

)}


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

notices

.filter(

(notice)=>

notice.title

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

).toLocaleDateString(

'en-GB',

{

day:'numeric',

month:'short',

year:'numeric'

}

)

}

</p>

<button


onClick={()=>editNotice(

notice

)}


className="

mt-4

mr-3

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


onClick={()=>deleteNotice(

notice.id

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