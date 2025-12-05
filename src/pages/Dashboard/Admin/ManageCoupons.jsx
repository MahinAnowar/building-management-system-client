import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const ManageCoupons = () => {
    const axiosSecure = useAxiosSecure();

    const [modalOpen, setModalOpen] = useState(false);
    const [code, setCode] = useState('');
    const [discount, setDiscount] = useState('');
    const [description, setDescription] = useState('');

    const { data: coupons = [], isLoading, refetch } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/coupons');
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const couponData = {
            code,
            discount: parseFloat(discount),
            description,
            isAvailable: true
        };

        try {
            const res = await axiosSecure.post('/coupons', couponData);
            if (res.data.insertedId) {
                refetch();
                setModalOpen(false);
                setCode('');
                setDiscount('');
                setDescription('');
                Swal.fire({
                    title: "Success!",
                    text: "Coupon Added Successfully",
                    icon: "success"
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Manage Coupons</h2>
                <button className="btn btn-primary" onClick={() => setModalOpen(true)}>Add Coupon</button>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Code</th>
                            <th>Discount (%)</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map((coupon, index) => (
                            <tr key={coupon._id}>
                                <th>{index + 1}</th>
                                <td>{coupon.code}</td>
                                <td>{coupon.discount}%</td>
                                <td>{coupon.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {modalOpen && (
                <dialog open className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Add New Coupon</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-control mb-2">
                                <label className="label">Code</label>
                                <input
                                    type="text"
                                    className="input input-bordered"
                                    required
                                    value={code}
                                    onChange={e => setCode(e.target.value)}
                                />
                            </div>
                            <div className="form-control mb-2">
                                <label className="label">Discount %</label>
                                <input
                                    type="number"
                                    className="input input-bordered"
                                    required
                                    value={discount}
                                    onChange={e => setDiscount(e.target.value)}
                                />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">Description</label>
                                <input
                                    type="text"
                                    className="input input-bordered"
                                    required
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button type="button" className="btn" onClick={() => setModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default ManageCoupons;
