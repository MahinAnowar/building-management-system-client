import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000' // TODO: Update with deployed URL later
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
