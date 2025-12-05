import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AgreementRequests = () => {
    const axiosSecure = useAxiosSecure();

    const { data: agreements = [], refetch } = useQuery({
        queryKey: ['agreements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/agreements?status=pending');
            return res.data;
        }
    });

    const handleAccept = (agreement) => {
        // Accept and Change Role to Member
        const updateInfo = {
            status: 'checked',
            role: 'member'
        }
        axiosSecure.put(`/agreements/${agreement._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Accepted!",
                        text: "New member added.",
                        icon: "success"
                    });
                }
            })
    };

    const handleReject = (agreement) => {
        // Reject and just check
        const updateInfo = {
            status: 'checked'
        }
        axiosSecure.put(`/agreements/${agreement._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Rejected!",
                        text: "Agreement request rejected.",
                        icon: "info"
                    });
                }
            })
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8">Agreement Requests</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Floor</th>
                            <th>Block</th>
                            <th>Room No</th>
                            <th>Rent</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agreements.map(agreement => (
                            <tr key={agreement._id}>
                                <td>{agreement.userName}</td>
                                <td>{agreement.userEmail}</td>
                                <td>{agreement.floorNo}</td>
                                <td>{agreement.blockName}</td>
                                <td>{agreement.apartmentNo}</td>
                                <td>${agreement.rent}</td>
                                <td>{new Date(agreement.date).toLocaleDateString()}</td>
                                <td className="flex gap-2">
                                    <button
                                        onClick={() => handleAccept(agreement)}
                                        className="btn btn-sm btn-success text-white"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleReject(agreement)}
                                        className="btn btn-sm btn-error text-white"
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AgreementRequests;
