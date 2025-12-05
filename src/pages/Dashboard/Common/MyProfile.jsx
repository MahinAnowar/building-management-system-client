import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: agreements = [], isLoading } = useQuery({
        queryKey: ['agreement', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/agreements/${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    // Find the valid accepted agreement
    const agreement = agreements.find(a => a.status === 'checked');
    const isMember = !!agreement;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8">My Profile</h2>

            {/* User Info Card */}
            <div className="card card-side bg-base-100 shadow-xl mb-8 items-center p-8">
                <figure className="w-48 h-48 rounded-full overflow-hidden">
                    <img src={user?.photoURL} alt="User" className="w-full h-full object-cover" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-2xl">Name: {user?.displayName}</h2>
                    <p className="text-lg text-gray-600">Email: {user?.email}</p>
                </div>
            </div>

            {/* Agreement Info */}
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h3 className="card-title text-xl mb-4 text-primary">Apartment Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                            <span className="font-bold">Floor No:</span> {isMember ? agreement.floorNo : 'None'}
                        </div>
                        <div className="p-4 border rounded-lg">
                            <span className="font-bold">Block Name:</span> {isMember ? agreement.blockName : 'None'}
                        </div>
                        <div className="p-4 border rounded-lg">
                            <span className="font-bold">Room No:</span> {isMember ? agreement.apartmentNo : 'None'}
                        </div>
                        <div className="p-4 border rounded-lg">
                            <span className="font-bold">Agreement Date:</span> {isMember ? new Date(agreement.date).toLocaleDateString() : 'None'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
