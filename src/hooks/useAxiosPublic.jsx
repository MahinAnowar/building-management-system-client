import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://building-management-system-server-eight.vercel.app/',
    withCredentials: true
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
