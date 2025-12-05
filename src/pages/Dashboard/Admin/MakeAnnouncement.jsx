import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MakeAnnouncement = () => {
    const axiosSecure = useAxiosSecure();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const announcement = {
            title,
            description,
            date: new Date().toISOString()
        }

        try {
            const res = await axiosSecure.post('/announcements', announcement);
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Announcement Posted",
                    showConfirmButton: false,
                    timer: 1500
                });
                setTitle('');
                setDescription('');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-8 text-white">Make Announcement</h2>
            <div className="max-w-3xl bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                <div className="bg-emerald-500 p-4">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                        Create New Announcement
                    </h3>
                </div>
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold text-gray-700">Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Maintenance Schedule"
                            className="input input-bordered w-full focus:outline-none focus:border-emerald-500 bg-gray-50 text-gray-900"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold text-gray-700">Description</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered h-40 focus:outline-none focus:border-emerald-500 bg-gray-50 text-gray-900 text-base"
                            placeholder="Write the details of the announcement here..."
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-control mt-4">
                        <button className="btn bg-emerald-500 hover:bg-emerald-600 text-white border-none w-full text-lg shadow-md">
                            Post Announcement
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MakeAnnouncement;
