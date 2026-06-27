"use client"

import Link from "next/link";

export default function Home(){

return(

<div className="

min-h-screen

bg-[#0F172A]

text-white

flex

items-center

justify-center

p-6

">

<div className="text-center">


<h1 className="text-6xl font-bold">

CampusSync

</h1>


<div className="mt-5 text-slate-400 text-lg">

Smart Campus Management System

<p className="mt-6 text-slate-400">

Admin Demo

<br/>

Email : admin@gmail.com

<br/>

Password : admin123


</p>

</div>


<p className="mt-2 text-slate-500">

Manage Students, Assignments, Notes and Notices

</p>



<div className="mt-10 flex flex-wrap justify-center gap-4">


<Link

href="/login"

>

<button

className="

bg-[#8B7FD1]

px-8

py-3

rounded-xl

font-semibold


hover:shadow-[0_0_20px_#8B7FD1]


duration-300

"

>

Login

</button>

</Link>



</div>



</div>

</div>

)

}