import StudentSidebar from "../../components/StudentSidebar";

export default function StudentLayout({children}){

return(

<div className="flex">

<StudentSidebar/>


<div className="flex-1 p-6 lg:ml-72">

{children}

</div>


</div>

)

}