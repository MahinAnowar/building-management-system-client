import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://building-management-system-server-eight.vercel.app/' // TODO: Update with deployed URL later
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
