import Topbar from "../../components/Topbar";
import AdminSidebar from "../../components/AdminSidebar";


export default function AdminLayout({ children }) {

return(

<>

<div className="flex">

<AdminSidebar/>

<div className="flex-1 lg:ml-72">

<Topbar/>

<div className="p-6">

{children}

</div>

</div>

</div>

</>

)

}