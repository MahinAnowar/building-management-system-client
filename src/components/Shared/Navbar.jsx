import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/');
            })
            .catch(error => console.log(error));
    }

    const navOptions = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/apartment">Apartment</NavLink></li>
        {user && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
    </>

    return (
        <div className="navbar bg-base-100 container mx-auto sticky top-0 z-50 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl text-emerald-600 font-bold">BMS</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-medium">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-emerald-500 border-2">
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} alt="user" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52">
                                <li className="disabled"><a className="font-bold text-gray-600">{user?.displayName}</a></li>
                                <li><Link to="/dashboard/my-profile">Profile</Link></li>
                                <li>
                                    <button onClick={handleLogOut} className="text-red-500 font-semibold">Logout</button>
                                </li>
                            </ul>
                        </div>
                    </> : <>
                        <Link to="/login" className="btn btn-ghost hover:text-emerald-500">Login</Link>
                        <Link to="/register" className="btn bg-emerald-500 text-white hover:bg-emerald-600 ml-2">Register</Link>
                    </>
                }
            </div>
        </div>
    );
};

export default Navbar;
