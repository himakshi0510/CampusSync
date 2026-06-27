"use client"

import {usePathname} from "next/navigation";
import {Menu,X} from "lucide-react";
import {useState} from "react";

import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/navigation";

import{
LayoutDashboard,
CalendarDays,
ClipboardList,
Bell,
BookOpen,
BarChart3,
User
}from"lucide-react";

export default function Sidebar(){

const pathname=usePathname();

const router=useRouter();
const [open,setOpen]=useState(false);

const toggleSidebar=()=>{

setOpen(

!open

);

};

const logout=async()=>{


await axios.post(

`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,

{},

{

withCredentials:true

}

);


router.push("/login");


}

return(

<>

<button

onClick={toggleSidebar}

className="

fixed

top-4

left-4

z-50

lg:hidden

bg-cyan-600

p-2

rounded-lg

shadow-lg

"

>

{

open

?

<X size={22}/>

:

<Menu size={22}/>

}

</button>



{

open && (

<div

onClick={()=>setOpen(false)}

className="

fixed

inset-0

bg-black/50

z-30

lg:hidden

"

/>

)

}

<div

className={`

fixed

top-0

left-0

z-40


w-64

lg:w-72


h-screen overflow-y-auto


bg-slate-950


border-r


border-slate-800


text-white


p-6


flex


flex-col


transition-transform


duration-300


${

open

?

"translate-x-0"

:

"-translate-x-full lg:translate-x-0"

}


`}

>

<div>

<div className="w-10 h-10 rounded-full bg-cyan-500 mb-4"></div>

<h1 className="text-3xl font-bold">

CampusSync

</h1>

<p className="text-slate-400 mt-1">

Smart Campus Utility

</p>

</div>



{/* Menu */}

<div className="mt-12 space-y-3">


<Link

href="/student"

className={`

flex items-center gap-3 p-3 rounded-xl duration-300

${
pathname==="/student"

?

"bg-cyan-500/20 text-cyan-400"

:

"hover:bg-slate-800"

}

`}

>

<LayoutDashboard size={20}/>

<p>Dashboard</p>

</Link>



<Link

href="/student/timetable"

className={`

flex items-center gap-3 p-3 rounded-xl duration-300

${
pathname==="/student/timetable"

?

"bg-cyan-500/20 text-cyan-400"

:

"hover:bg-slate-800"

}

`}

>

<CalendarDays size={20}/>

<p>Timetable</p>

</Link>

<Link
href="/student/attendance"
className={`

flex items-center gap-3 p-3 rounded-xl duration-300

${
pathname==="/student/attendance"

?

"bg-cyan-500/20 text-cyan-400"

:

"hover:bg-slate-800"

}

`}
>

<BarChart3 size={20}/>

<p>Attendance</p>

</Link>

<Link

href="/student/assignments"

className={`

flex items-center gap-3 p-3 rounded-xl duration-300

${
pathname==="/student/assignments"

?

"bg-cyan-500/20 text-cyan-400"

:

"hover:bg-slate-800"

}

`}

>

<ClipboardList size={20}/>

<p>Assignments</p>

</Link>



<Link

href="/student/notes"

className={`

flex items-center gap-3 p-3 rounded-xl duration-300

${
pathname==="/student/notes"

?

"bg-cyan-500/20 text-cyan-400"

:

"hover:bg-slate-800"

}

`}

>

<BookOpen size={20}/>

<p>Notes</p>

</Link>



<Link

href="/student/notices"

className={`

flex items-center gap-3 p-3 rounded-xl duration-300

${
pathname==="/student/notices"

?

"bg-cyan-500/20 text-cyan-400"

:

"hover:bg-slate-800"

}

`}

>

<Bell size={20}/>

<p>Notices</p>

</Link>

<Link
href="/student/profile"
className={`

flex items-center gap-3 p-3 rounded-xl duration-300

${
pathname==="/student/profile"

?

"bg-cyan-500/20 text-cyan-400"

:

"hover:bg-slate-800"

}

`}
>

<User size={20}/>

<p>Profile</p>

</Link>


</div>



{/* Bottom */}

<div className="mt-auto pb-6">

<hr className="border-slate-700"/>


<div className="mt-5">

<p className="font-semibold">

Student User

</p>

<p className="text-sm text-slate-400">

Student 

</p>

<button

onClick={logout}

className="

mt-5

w-full

bg-red-500

py-2

rounded-lg

hover:bg-red-600

duration-300

"

>

Logout

</button>

</div>

</div>

</div>

</>

)

}