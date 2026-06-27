"use client"

import axios from "axios";
import {useState} from "react";
import {Eye,EyeOff} from "lucide-react";
import {useRouter} from "next/navigation";
export default function LoginPage() {

const router=useRouter();


const[email,setEmail]=useState("");

const[password,setPassword]=useState("");

const[showPassword,setShowPassword]=useState(false);

const login=async()=>{

if(

!email ||

!password

){

alert(

"Please enter email and password"

);

return;

}


try{


const response=await axios.post(

`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,

{

email,

password

},

{

withCredentials:true

}

);


localStorage.setItem(

"userId",

response.data.id

);

localStorage.setItem(

"role",

response.data.role

);

if(response.data.role==="admin"){

router.push("/admin");

}
else{

router.push("/student");

}



}


catch(error){

alert(error.response?.data?.message || "Login Failed");


}



}
return (

<div className="min-h-screen flex items-center justify-center bg-slate-950">


<div className="w-[400px] bg-slate-900 p-8 rounded-2xl">


<h1 className="text-3xl font-bold text-white">

CampusSync

</h1>


<p className="text-slate-400 mt-2">

Login to continue

</p>


<input

type="email"

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

className="w-full p-3 rounded-lg bg-slate-800 mt-8 text-white outline-none"

/>


<div className="relative mt-4">

<input

type={showPassword ? "text" : "password"}

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

className="

w-full

p-3

rounded-lg

bg-slate-800

text-white

outline-none

pr-12

"

/>


<button

type="button"

onClick={()=>setShowPassword(!showPassword)}

className="absolute right-3 top-3 text-slate-400"

>

{

showPassword

?

<EyeOff size={20}/>

:

<Eye size={20}/>

}

</button>

</div>


<button

onClick={login}

className="

w-full

bg-cyan-500

mt-6

py-3

rounded-lg

font-semibold

hover:bg-cyan-600

duration-300

"

>

Login

</button>



</div>

</div>

)

}