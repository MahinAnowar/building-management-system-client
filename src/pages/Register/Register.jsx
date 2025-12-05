import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import PageTitle from "../../components/Shared/PageTitle";

const Register = () => {
    const { createUser, updateUserProfile, googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Password Validation
        const password = data.password;
        const regex = /(?=.*[A-Z])(?=.*[a-z]).{6,}/;
        if (!regex.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Password",
                text: "Password must have at least one uppercase, one lowercase letter and be at least 6 characters long.",
            });
            return;
        }

        createUser(data.email, password)
            .then(result => {
                const loggedUser = result.user;
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // Create User Entry in Database
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Error',
                    text: error.message
                });
            })
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        navigate('/');
                    })
            })
    };

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4 font-sans text-gray-800">
            <PageTitle title="Register" />
            <div className="card w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-center text-emerald-600 mb-2">Create Account</h2>
                    <p className="text-center text-gray-500 mb-8">Join us for a better living experience.</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} placeholder="Full Name" className="input input-bordered w-full bg-white text-gray-900 border-gray-300 focus:outline-none focus:border-emerald-500" />
                            {errors.name && <span className="text-red-500 text-sm mt-1">Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Photo URL</span>
                            </label>
                            <input type="text" {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered w-full bg-white text-gray-900 border-gray-300 focus:outline-none focus:border-emerald-500" />
                            {errors.photoURL && <span className="text-red-500 text-sm mt-1">Photo URL is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })} placeholder="email@example.com" className="input input-bordered w-full bg-white text-gray-900 border-gray-300 focus:outline-none focus:border-emerald-500" />
                            {errors.email && <span className="text-red-500 text-sm mt-1">Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Password</span>
                            </label>
                            <input type="password" {...register("password", { required: true })} placeholder="******" className="input input-bordered w-full bg-white text-gray-900 border-gray-300 focus:outline-none focus:border-emerald-500" />
                            {errors.password && <span className="text-red-500 text-sm mt-1">Password is required</span>}
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn bg-emerald-500 hover:bg-emerald-600 text-white border-none w-full text-lg">Register</button>
                        </div>
                    </form>

                    <div className="divider my-6">OR</div>

                    <div className="text-center">
                        <button onClick={handleGoogleSignIn} className="btn btn-outline border-gray-300 hover:bg-gray-50 hover:border-gray-400 w-full flex items-center justify-center gap-2 text-gray-700">
                            <FaGoogle className="text-red-500" />
                            Sign up with Google
                        </button>
                    </div>

                    <p className="text-center mt-6 text-sm text-gray-600">
                        Already have an account? <Link to="/login" className="text-emerald-600 font-bold hover:underline">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
