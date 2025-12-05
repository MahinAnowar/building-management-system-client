import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const MakePayment = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // Fetch Agreement
    const { data: agreements = [], isLoading } = useQuery({
        queryKey: ['agreement', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/agreements/${user.email}`);
            return res.data;
        }
    });

    const [month, setMonth] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [couponApplied, setCouponApplied] = useState(false);

    if (isLoading) return <LoadingSpinner />;

    // Find the accepted agreement
    const agreement = agreements.find(a => a.status === 'checked');

    const rent = parseFloat(agreement?.rent || 0); // Ensure number
    const finalAmount = rent - discount;

    const handleApplyCoupon = async () => {
        if (!couponCode) {
            Swal.fire("Error", "Please enter a coupon code", "error");
            return;
        }
        try {
            const res = await axiosSecure.post('/coupons/validate', { coupon: couponCode });
            if (res.data.valid) {
                const discountPercentage = parseFloat(res.data.discount); // Ensure number
                const discountAmount = (parseFloat(rent) * discountPercentage) / 100;
                setDiscount(discountAmount);
                setCouponApplied(true);
                Swal.fire("Success", `Coupon Applied! ${discountPercentage}% Off`, "success");
            } else {
                Swal.fire("Invalid", "Coupon is not valid", "error");
                setDiscount(0);
                setCouponApplied(false);
            }
        } catch (error) {
            Swal.fire("Error", "Could not validate coupon", "error");
        }
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!month) {
            Swal.fire("Error", "Please select a month", "error");
            return;
        }

        const paymentInfo = {
            email: user?.email,
            transactionId: `txn_${Date.now()}`, // Simulated
            amount: finalAmount,
            month: month,
            date: new Date().toISOString()
        };

        try {
            const res = await axiosSecure.post('/payments', paymentInfo);
            if (res.data.insertedId || res.data._id || res.data.success) { // Accommodate typical backend response
                Swal.fire("Payment Successful", `Transaction ID: ${paymentInfo.transactionId}`, "success");
                navigate('/dashboard/paymentHistory');
            }
        } catch (error) {
            Swal.fire("Error", "Payment failed", "error");
        }
    };

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    if (!agreement) return <div>Loading agreement details...</div>;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8">Make Payment</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form */}
                <form onSubmit={handlePayment} className="space-y-4">
                    <div className="form-control">
                        <label className="label">Member Email</label>
                        <input type="text" value={user?.email} disabled className="input input-bordered" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="form-control">
                            <label className="label">Floor</label>
                            <input type="text" value={agreement.floorNo} disabled className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">Block</label>
                            <input type="text" value={agreement.blockName} disabled className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">Room</label>
                            <input type="text" value={agreement.apartmentNo} disabled className="input input-bordered" />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">Rent</label>
                        <input type="text" value={`$${rent}`} disabled className="input input-bordered font-bold" />
                    </div>

                    <div className="form-control">
                        <label className="label">Month</label>
                        <select
                            className="select select-bordered"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                        >
                            <option value="" disabled>Select Month</option>
                            {months.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>

                    <div className="form-control">
                        <button className="btn btn-primary w-full">Pay ${finalAmount}</button>
                    </div>
                </form>

                {/* Coupon Section */}
                <div className="card bg-base-100 shadow-xl h-fit">
                    <div className="card-body">
                        <h3 className="card-title">Apply Coupon</h3>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Coupon Code"
                                className="input input-bordered w-full"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                disabled={couponApplied}
                            />
                            <button
                                className="btn btn-secondary"
                                onClick={handleApplyCoupon}
                                disabled={couponApplied}
                            >
                                Apply
                            </button>
                        </div>
                        {couponApplied && (
                            <div className="text-success font-semibold mt-2">
                                Discount of ${discount} applied!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakePayment;
