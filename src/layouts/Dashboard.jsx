import { NavLink, Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";
import { FaAd, FaBook, FaCalendar, FaHome, FaList, FaSearch, FaUser, FaUsers, FaUtensils, FaWallet } from 'react-icons/fa';
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
    const [role, roleLoading] = useRole();
    const { user, logOut } = useAuth();

    // While loading role, we might show a spinner or nothing.
    // For smoother UX, maybe show skeleton.

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col p-8">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden mb-4">Open Menu</label>
                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content space-y-2">
                    {/* Sidebar content here */}
                    {
                        role === 'admin' ? <>
                            <li><NavLink to="/dashboard/adminProfile"><FaUser></FaUser> Admin Profile</NavLink></li>
                            <li><NavLink to="/dashboard/manageMembers"><FaUsers></FaUsers> Manage Members</NavLink></li>
                            <li><NavLink to="/dashboard/makeAnnouncement"><FaCalendar></FaCalendar> Make Announcement</NavLink></li>
                            <li><NavLink to="/dashboard/agreementRequests"><FaBook></FaBook> Agreement Requests</NavLink></li>
                            <li><NavLink to="/dashboard/manageCoupons"><FaList></FaList> Manage Coupons</NavLink></li>
                        </>
                            : role === 'member' ? <>
                                <li><NavLink to="/dashboard/myProfile"><FaUser></FaUser> My Profile</NavLink></li>
                                <li><NavLink to="/dashboard/makePayment"><FaWallet></FaWallet> Make Payment</NavLink></li>
                                <li><NavLink to="/dashboard/paymentHistory"><FaList></FaList> Payment History</NavLink></li>
                                <li><NavLink to="/dashboard/announcements"><FaCalendar></FaCalendar> Announcements</NavLink></li>
                            </>
                                : <>
                                    <li><NavLink to="/dashboard/myProfile"><FaUser></FaUser> My Profile</NavLink></li>
                                    <li><NavLink to="/dashboard/announcements"><FaCalendar></FaCalendar> Announcements</NavLink></li>
                                </>
                    }

                    <div className="divider"></div>
                    <li><NavLink to="/"><FaHome></FaHome> Home</NavLink></li>
                    <li><NavLink to="/apartment"><FaSearch></FaSearch> Apartments</NavLink></li>
                    <li><button onClick={logOut}>Logout</button></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;
