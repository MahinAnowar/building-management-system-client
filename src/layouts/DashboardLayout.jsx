import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="flex">
            {/* Sidebar placeholder */}
            <div className="w-64 min-h-screen bg-base-200">
                <ul className="menu p-4">
                    <li><a>Sidebar Item 1</a></li>
                    <li><a>Sidebar Item 2</a></li>
                </ul>
            </div>
            {/* Main Content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardLayout;
