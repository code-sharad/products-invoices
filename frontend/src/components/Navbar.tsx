import { Link, Outlet } from "react-router"
import Header from "./Header"
import { Separator } from "@/components/ui/separator"

export default function Navbar() {
    return (
        <>
            <Header />
            <div className="flex gap-6 ">
                <nav className=" w-44 flex flex-col text-md pl-4 pt-8 gap-6 ">
                    <Link to={"/"}>Dashboard</Link>
                    <Link to={"/inventory"}>Inventory</Link>
                    <Link to={"/billing"}>Billing History</Link>
                    <Link to={"/invoice"}>Create Invoice</Link>
                </nav>
                <Separator orientation="vertical" />
                <Outlet />
            </div>
        </>
    )
}