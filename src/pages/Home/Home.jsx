import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import PageTitle from "../../components/Shared/PageTitle";

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Home = () => {
    const axiosPublic = useAxiosPublic();

    const { data: coupons = [] } = useQuery({
        queryKey: ['coupons-public'],
        queryFn: async () => {
            const res = await axiosPublic.get('/coupons');
            return res.data;
        }
    });

    const bannerImages = [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000"

    ];

    return (
        <div className="font-sans text-gray-800">
            <PageTitle title="Home" />
            {/* Banner Section */}
            <section className="relative">
                <Swiper
                    pagination={{ clickable: true, dynamicBullets: true }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    effect={'fade'}
                    modules={[Pagination, Autoplay, EffectFade]}
                    className="h-[600px] lg:h-[750px] w-full"
                >
                    {bannerImages.map((img, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="relative w-full h-full">
                                <img src={img} alt={`Luxury Building ${idx + 1}`} className="w-full h-full object-cover" />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-center items-center text-center text-white p-4">
                                    <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight drop-shadow-lg" style={{ fontFamily: '"Playfair Display", serif' }}>Experience Luxury Living</h1>
                                    <p className="text-xl lg:text-2xl max-w-2xl mb-8 font-light drop-shadow-md">Find your dream sanctuary in the heart of the city.</p>
                                    <Link to="/apartment" className="btn btn-lg bg-emerald-500 hover:bg-emerald-600 border-none text-white px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105">
                                        Find Apartment
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* About Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-emerald-600 font-bold uppercase tracking-widest text-sm mb-2">About Us</h4>
                                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
                                    Redefining Urban <br /> Sophistication
                                </h2>
                            </div>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Welcome to a world where elegance meets convenience. Our architectural masterpiece offers a harmonious blend of modern design and timeless luxury. From the moment you step into our grand lobby, you'll feel a sense of belonging.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Whether you're relaxing by the rooftop pool or working out in our state-of-the-art gym, every amenity is curated to elevate your lifestyle.
                            </p>
                            <button className="btn btn-outline border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-full px-8">Learn More</button>
                        </div>
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-full h-full bg-emerald-100 rounded-xl z-0"></div>
                            <img
                                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000"
                                alt="Building Exterior"
                                className="relative rounded-xl shadow-2xl w-full object-cover h-[500px] z-10"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Coupon Section */}
            {coupons.length > 0 && (
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>Exclusive Privileges</h2>
                            <p className="text-gray-500 text-lg">Use these limited-time offers to make your move even sweeter.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {coupons.map(coupon => (
                                <div key={coupon._id} className="relative bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg p-1 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                    <div className="bg-white rounded-lg p-6 h-full flex flex-col justify-between relative overflow-hidden">
                                        {/* Dashed Border Effect */}
                                        <div className="absolute top-0 left-0 w-full h-full border-2 border-dashed border-emerald-200 rounded-lg pointer-events-none"></div>

                                        <div className="text-center z-10">
                                            <h3 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mb-2">{coupon.discount}%</h3>
                                            <p className="text-sm uppercase tracking-wide text-gray-400 font-semibold mb-6">Discount Details</p>
                                            <p className="font-medium text-gray-600 text-lg leading-snug mb-6">{coupon.description}</p>
                                        </div>
                                        <div className="bg-gray-100 rounded-lg p-3 text-center z-10">
                                            <p className="text-xs text-gray-500 mb-1">COUPON CODE</p>
                                            <p className="text-xl font-mono font-bold text-gray-800 tracking-wider select-all">{coupon.code}</p>
                                        </div>
                                        {/* Decorative Circles for Ticket Look */}
                                        <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full"></div>
                                        <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Map Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>Prime Location</h2>
                        <p className="text-gray-500 text-lg">Situated in the vibrant heart of the city, everything you need is just steps away.</p>
                    </div>
                    <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-100 relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14607.60742188164!2d90.4125!3d23.8103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c62fb95f16c1%3A0xb333248370356ca7!2sGulshan%2C%20Dhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1642857467329!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Building Location"
                        ></iframe>
                        {/* Overlay Card */}
                        <div className="absolute bottom-8 left-8 bg-white p-6 rounded-lg shadow-lg max-w-xs hidden md:block">
                            <h4 className="font-bold text-lg mb-2">The Emerald Suites</h4>
                            <p className="text-gray-600 text-sm">123 Gulshan Avenue</p>
                            <p className="text-gray-600 text-sm">Dhaka, Bangladesh</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
