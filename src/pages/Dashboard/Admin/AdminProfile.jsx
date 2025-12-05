import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaUser, FaBuilding, FaPercentage, FaUsers } from "react-icons/fa";

const AdminProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8">Admin Profile: {user?.displayName}</h2>
            <div className="flex gap-4 items-center mb-8">
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={user?.photoURL} alt="admin" />
                    </div>
                </div>
                <div>
                    <p className="text-xl font-semibold">Name: {user?.displayName}</p>
                    <p className="text-gray-500">Email: {user?.email}</p>
                </div>
            </div>

            <div className="stats shadow w-full">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaBuilding className="text-3xl"></FaBuilding>
                    </div>
                    <div className="stat-title">Total Rooms</div>
                    <div className="stat-value">{stats.totalRooms || 0}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaPercentage className="text-3xl"></FaPercentage>
                    </div>
                    <div className="stat-title">Available Rooms</div>
                    <div className="stat-value">{stats.percentAvailable || 0}%</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaPercentage className="text-3xl"></FaPercentage>
                    </div>
                    <div className="stat-title">Booked Rooms</div>
                    <div className="stat-value">{stats.percentBooked || 0}%</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUser className="text-3xl"></FaUser>
                    </div>
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value">{stats.totalUsers || 0}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUsers className="text-3xl"></FaUsers>
                    </div>
                    <div className="stat-title">Total Members</div>
                    <div className="stat-value">{stats.totalMembers || 0}</div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
