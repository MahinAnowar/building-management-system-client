import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // Added secure hook
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Apartment = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure(); // Use secure for agreement
    const { user } = useAuth();
    const navigate = useNavigate();

    // Limit 6 per page
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    // Filter State
    const [minRent, setMinRent] = useState('');
    const [maxRent, setMaxRent] = useState('');
    const [searchParams, setSearchParams] = useState({ min: '', max: '' });

    // Modal State
    const [selectedApartment, setSelectedApartment] = useState(null);

    // Fetch Apartments
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['apartments', currentPage, itemsPerPage, searchParams],
        queryFn: async () => {
            const params = {
                page: currentPage,
                size: itemsPerPage,
            };
            if (searchParams.min) params.min = searchParams.min;
            if (searchParams.max) params.max = searchParams.max;

            const res = await axiosPublic.get('/apartments', { params });
            return res.data;
        },
        keepPreviousData: true
    });

    // Check Agreement Status for User
    const { data: agreementData } = useQuery({
        queryKey: ['agreement', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/agreements/${user.email}`); // Assuming endpoint
            return res.data;
        }
    });

    const hasAgreement = !!agreementData; // If data exists, disable button

    const handleSearch = () => {
        setCurrentPage(1);
        setSearchParams({ min: minRent, max: maxRent });
        refetch(); // Ensure refetch
    };

    const handleAgreementClick = (apt) => {
        if (!user) {
            navigate('/login');
            return;
        }
        setSelectedApartment(apt);
        document.getElementById('agreement_modal').showModal();
    };

    const handleConfirmAgreement = async () => {
        const agreementInfo = {
            userName: user.displayName,
            userEmail: user.email,
            floorNo: selectedApartment.floorNo,
            blockName: selectedApartment.blockName,
            apartmentNo: selectedApartment.apartmentNo,
            rent: selectedApartment.rent,
            status: 'pending',
            date: new Date().toISOString()
        };

        try {
            await axiosSecure.post('/agreements', agreementInfo);
            // Close modal
            document.getElementById('agreement_modal').close();
            // Show feedback (could use toast)
            console.log("Agreement Request Sent!");
            // Refetch or update state 
            // In a real app we would invalidate the 'agreement' query to update disabled state immediately if we navigate somewhere else.
            // But here we likely navigate to payment or just disable button.
            // Let's refetch agreement status? (Though it might depend on backend returning it immediately)
        } catch (error) {
            console.error("Agreement failed", error);
        }
    };

    const count = data?.count || 0;
    const totalPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(totalPages).keys()].map(i => i + 1);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">Available Apartments</h2>

            {/* Filter Section */}
            <div className="flex justify-center gap-4 mb-8">
                <input
                    type="number"
                    placeholder="Min Rent"
                    className="input input-bordered w-full max-w-xs"
                    value={minRent}
                    onChange={(e) => setMinRent(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max Rent"
                    className="input input-bordered w-full max-w-xs"
                    value={maxRent}
                    onChange={(e) => setMaxRent(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSearch}>Search</button>
            </div>

            {/* Loading State */}
            {isLoading && <div className="text-center"><span className="loading loading-spinner loading-lg"></span></div>}

            {/* Grid */}
            {!isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data?.result?.map(apt => (
                        <div key={apt._id} className="card bg-base-100 shadow-xl">
                            <figure><img src={apt.image} alt={`Apartment ${apt.apartmentNo}`} className="h-48 w-full object-cover" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Apartment {apt.apartmentNo}</h2>
                                <p>Floor: {apt.floorNo}, Block: {apt.blockName}</p>
                                <p className="text-lg font-semibold text-primary">${apt.rent} / month</p>
                                <div className="card-actions justify-end">
                                    <button
                                        onClick={() => handleAgreementClick(apt)}
                                        className="btn btn-primary"
                                        disabled={hasAgreement}
                                    >
                                        {hasAgreement ? "Already Requested" : "Agreement"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-12">
                <div className="join">
                    <button
                        className="join-item btn"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        «
                    </button>
                    {pages.map(page => (
                        <button
                            key={page}
                            className={`join-item btn ${currentPage === page ? 'btn-active' : ''}`}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        className="join-item btn"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        »
                    </button>
                </div>
            </div>

            {/* Agreement Modal */}
            <dialog id="agreement_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Confirm Agreement</h3>
                    <div className="py-4 space-y-2">
                        <p><strong>User:</strong> {user?.displayName}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <div className="divider"></div>
                        <p><strong>Floor:</strong> {selectedApartment?.floorNo}</p>
                        <p><strong>Block:</strong> {selectedApartment?.blockName}</p>
                        <p><strong>Room:</strong> {selectedApartment?.apartmentNo}</p>
                        <p><strong>Rent:</strong> ${selectedApartment?.rent}</p>
                    </div>
                    <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <form method="dialog">
                            <button className="btn mr-2">Cancel</button>
                        </form>
                        <button className="btn btn-success text-white" onClick={handleConfirmAgreement}>Confirm</button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Apartment;
