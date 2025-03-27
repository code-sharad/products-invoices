import { Link, Outlet, useLocation } from "react-router-dom"
import Header from "./Header"

export default function Navbar() {
    const location = useLocation()
    return (
        <div className="flex">
            <div className="fixed inset-y-0 z-[1000] left-0 w-52 border-r bg-zinc-50">
                <Header />
                <nav className="flex flex-col text-md pl-4 pt-8 gap-6 ">
                    <Link className={`${location.pathname === '/dashboard' ? 'font-semibold underline' : 'text-neutral-500'}`} to={"/"}>Dashboard</Link>
                    <Link className={`${location.pathname === '/inventory' ? 'font-semibold ' : 'text-neutral-500'}`} to={"/inventory"}>Inventory</Link>
                    <Link className={`${location.pathname === '/billing' ? 'font-semibold' : 'text-neutral-500'}`} to={"/billing"}>Billing History</Link>
                    <Link className={`${location.pathname === '/invoice' ? 'font-semibold' : 'text-neutral-500'}`} to={"/invoice"}>Create Invoice</Link>
                </nav>
            </div>
            <div className="ml-56 flex-1 min-h-screen">
                <div className="m-4 pt-12 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}