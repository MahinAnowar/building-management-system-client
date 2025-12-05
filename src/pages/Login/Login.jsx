import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import PageTitle from "../../components/Shared/PageTitle";

const Login = () => {
    const { signIn, googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                Swal.fire({
                    title: "Login Successful",
                    showClass: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: error.message
                });
            })
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        navigate(from, { replace: true });
                    })
            })
    };

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4 font-sans text-gray-800">
            <PageTitle title="Login" />
            <div className="card w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-center text-emerald-600 mb-2">Welcome Back</h2>
                    <p className="text-center text-gray-500 mb-8">Sign in to access your account.</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email@example.com" className="input input-bordered w-full bg-white text-gray-900 border-gray-300 focus:outline-none focus:border-emerald-500" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="******" className="input input-bordered w-full bg-white text-gray-900 border-gray-300 focus:outline-none focus:border-emerald-500" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover text-emerald-600">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-emerald-500 hover:bg-emerald-600 text-white border-none w-full text-lg">Login</button>
                        </div>
                    </form>

                    <div className="divider my-6">OR</div>

                    <div className="text-center">
                        <button onClick={handleGoogleSignIn} className="btn btn-outline border-gray-300 hover:bg-gray-50 hover:border-gray-400 w-full flex items-center justify-center gap-2 text-gray-700">
                            <FaGoogle className="text-red-500" />
                            Sign in with Google
                        </button>
                    </div>

                    <p className="text-center mt-6 text-sm text-gray-600">
                        Don't have an account? <Link to="/register" className="text-emerald-600 font-bold hover:underline">Register here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
