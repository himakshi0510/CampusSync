"use client"

import {useEffect,useState} from "react";
import axios from "axios";

export default function AdminProfile(){

const [profile,setProfile]=useState({});
const [name,setName]=useState("");
const [editing,setEditing]=useState(false);


useEffect(()=>{

fetchProfile();

},[]);


const fetchProfile=async()=>{

const response=await axios.get(

`${process.env.NEXT_PUBLIC_API_URL}/profile/2`

);

setProfile(response.data);

setName(response.data.name);

};


const saveProfile=async()=>{

await axios.put(

`${process.env.NEXT_PUBLIC_API_URL}/profile/2`,

{

name

}

);

alert("Profile Updated");

setEditing(false);

fetchProfile();

};

return(

<div>

<h1 className="text-3xl font-bold">

Admin Profile

</h1>

<p className="mt-2 text-slate-500">

Manage Your Account

</p>


<div

className="

mt-10

max-w-xl

bg-[#1E1B2E]

border border-[#3A3650]

p-6

rounded-xl

"

>


<p className="text-slate-400">

Name

</p>


{

editing

?

<input

value={name}

onChange={(e)=>setName(e.target.value)}

className="

w-full

bg-slate-900

p-3

rounded-lg

mt-2

mb-5

outline-none

"

/>

:

<p className="text-cyan-400 mt-2 mb-5">

{profile.name}

</p>

}



<p className="text-slate-400">

Email

</p>


<p className="text-cyan-400 mt-2 mb-5">

{profile.email}

</p>



<p className="text-slate-400">

Role

</p>


<p className="text-cyan-400 mt-2 mb-6">

{profile.role}

</p>



<button

onClick={()=>{

editing

?

saveProfile()

:

setEditing(true)

}}

className="

bg-[#8B7FD1]

px-5

py-3

rounded-lg

font-semibold

hover:shadow-[0_0_20px_#8B7FD1]

duration-300

"

>

{

editing

?

"Save Changes"

:

"Edit Profile"

}

</button>


</div>


</div>

)


}