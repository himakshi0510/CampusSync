"use client"

import {useEffect,useState} from "react";
import axios from "axios";

export default function ProfilePage(){


const [profile,setProfile]=useState({});
const [name,setName]=useState("");
const [userId,setUserId]=useState(null);
const [editing,setEditing]=useState(false);
const[currentPassword,setCurrentPassword]=useState("");
const[newPassword,setNewPassword]=useState("");
const[showPassword,setShowPassword]=useState(false);

useEffect(()=>{

getUser();

},[]);

const getUser=async()=>{

const response=await axios.get(

`${process.env.NEXT_PUBLIC_API_URL}/auth/me`,

{

withCredentials:true

}

);

setUserId(

response.data.id

);

fetchProfile(

response.data.id

);

}


const fetchProfile=async(id)=>{

const response=await axios.get(

`${process.env.NEXT_PUBLIC_API_URL}/profile/${id}`

);
setProfile(response.data);

setName(response.data.name);

};


const saveProfile=async()=>{

if(!name){

alert("Name cannot be empty");

return;

}

await axios.put(

`${process.env.NEXT_PUBLIC_API_URL}/profile/${userId}`,

{

name

}

);

alert("Profile Updated");

setEditing(false);

fetchProfile(userId);

};

const updatePassword=async()=>{

if(

!currentPassword ||

!newPassword

){

alert(

"Fill both password fields"

);

return;

}


try{

await axios.put(

`${process.env.NEXT_PUBLIC_API_URL}/profile/password/${userId}`,

{

currentPassword,

newPassword

}

);


alert(

"Password Updated"

);


setCurrentPassword("");

setNewPassword("");


}

catch(error){

alert(

error.response?.data?.message ||

"Failed to update password"

);

}


};


return(

<div>

<h1 className="text-3xl font-bold">

Profile

</h1>


<p className="mt-2 text-slate-500">

Manage Your Profile

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


<p className="mb-4">

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

mb-6

outline-none

"

/>

:

<p className="text-cyan-400 mb-6">

{profile.name || "Student"}

</p>

}



<p className="mb-4">

Email

</p>


<p className="text-cyan-400 mb-6">

{profile.email || "No Email"}

</p>



<p className="mb-4">

Role

</p>


<p className="text-cyan-400 mb-6">

{profile.role || "Student"}

</p>

<div className="flex gap-4 mt-4">

<button

onClick={()=>setShowPassword(

!showPassword

)}

className="

bg-cyan-600

px-5

py-3

rounded-lg

hover:bg-cyan-700

duration-300

"

>

Change Password

</button>



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

{

showPassword && (

<div className="mt-6">

<p className="text-slate-400">

Current Password

</p>


<input

type="password"

value={currentPassword}

onChange={(e)=>setCurrentPassword(

e.target.value

)}

className="

w-full

bg-slate-900

p-3

rounded-lg

mt-2

mb-4

outline-none

"

/>


<p className="text-slate-400">

New Password

</p>


<input

type="password"

value={newPassword}

onChange={(e)=>setNewPassword(

e.target.value

)}

className="

w-full

bg-slate-900

p-3

rounded-lg

mt-2

mb-4

outline-none

"

/>


<button

onClick={updatePassword}

className="

bg-green-600

px-5

py-3

rounded-lg

hover:bg-green-700

duration-300

"

>

Update Password

</button>


</div>

)

} 

</div>


</div>

)

}