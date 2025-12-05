import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'https://building-management-system-server-eight.vercel.app/',
    withCredentials: true
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                // Token is sent via HttpOnly cookie, so no standard header attachment here needed
                // unless using Bearer token in headers. 
                // User said "POST /jwt for signing and storing tokens in an HttpOnly cookie" in context.
                // So likely we rely on credentials: true.
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error.response ? error.response.status : null;
                const originalRequest = error.config;

                // Handle 401/403 with simple retry to account for cookie mounting delay
                if ((status === 401 || status === 403) && !originalRequest._retry) {
                    originalRequest._retry = true;
                    // Wait 500ms and retry
                    await new Promise(resolve => setTimeout(resolve, 500));
                    return axiosSecure(originalRequest);
                }

                // If fails again or not a retryable error, log out
                if (status === 401 || status === 403) {
                    console.warn('Logout Triggered by API Error (DISABLED FOR DEBUG):', error);
                    // await logOut();
                    // navigate('/login');
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        }
    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
