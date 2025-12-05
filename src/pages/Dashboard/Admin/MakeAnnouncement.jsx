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
        <div>
            <h2 className="text-3xl font-bold mb-8">Make Announcement</h2>
            <form onSubmit={handleSubmit} className="max-w-2xl bg-base-100 shadow-xl p-8 rounded-xl">
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Announcement Title"
                        className="input input-bordered"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-control mb-6">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        className="textarea textarea-bordered h-32"
                        placeholder="Announcement Details"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <button className="btn btn-primary w-full">Post Announcement</button>
            </form>
        </div>
    );
};

export default MakeAnnouncement;
