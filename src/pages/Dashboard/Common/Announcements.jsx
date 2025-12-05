import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const Announcements = () => {
    const axiosSecure = useAxiosSecure();

    const { data: announcements = [], isLoading } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/announcements');
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8 text-center">Announcements</h2>
            <div className="space-y-6">
                {announcements.map(announcement => (
                    <div key={announcement._id} className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-primary">{announcement.title}</h2>
                            <p>{announcement.description}</p>
                            <div className="card-actions justify-end">
                                <div className="badge badge-outline">{new Date(announcement.date).toLocaleDateString()}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Announcements;
