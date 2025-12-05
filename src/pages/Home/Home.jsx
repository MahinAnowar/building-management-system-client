import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Home = () => {
    const axiosPublic = useAxiosPublic();

    const { data: coupons = [] } = useQuery({
        queryKey: ['coupons-public'],
        queryFn: async () => {
            const res = await axiosPublic.get('/coupons');
            return res.data;
        }
    });

    return (
        <div className="space-y-24">
            {/* Banner Section */}
            <section>
                <Swiper
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    modules={[Pagination, Autoplay]}
                    className="h-[500px] lg:h-[600px] w-full"
                >
                    <SwiperSlide>
                        <div className="relative w-full h-full">
                            <img src="https://i.ibb.co/60mn14N/building-1.jpg" alt="Building 1" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white">
                                <h1 className="text-4xl lg:text-6xl font-bold mb-4">Experience Luxury Living</h1>
                                <p className="text-lg lg:text-2xl max-w-2xl">Discover modern apartments tailored for your lifestyle.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative w-full h-full">
                            <img src="https://i.ibb.co/hK5Xj0H/building-2.jpg" alt="Building 2" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white">
                                <h1 className="text-4xl lg:text-6xl font-bold mb-4">Prime Location</h1>
                                <p className="text-lg lg:text-2xl max-w-2xl">Located in the heart of the city, close to everything you need.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative w-full h-full">
                            <img src="https://i.ibb.co/K2sJ12L/building-3.jpg" alt="Building 3" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white">
                                <h1 className="text-4xl lg:text-6xl font-bold mb-4">State of the Art Facilities</h1>
                                <p className="text-lg lg:text-2xl max-w-2xl">Gym, Pool, Community Hall, and 24/7 Security.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </section>

            {/* About Section */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">About The Building</h2>
                    <div className="w-24 h-1 bg-emerald-500 mx-auto rounded"></div>
                </div>
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <img
                            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop"
                            alt="About Building"
                            className="rounded-xl shadow-2xl w-full object-cover h-96"
                        />
                    </div>
                    <div className="flex-1 space-y-6">
                        <h3 className="text-3xl font-semibold text-gray-700">Redefining Urban Living</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Welcome to a sanctuary of sophistication and comfort. Our building stands as a testament to modern architectural excellence, offering a harmonious blend of style and functionality.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            From spacious interiors to breathtaking views, every detail has been meticulously crafted to provide an unparalleled living experience. Enjoy access to premium amenities including a rooftop garden, fitness center, and dedicated concierge services.
                        </p>
                    </div>
                </div>
            </section>

            {/* Coupon Section */}
            {coupons.length > 0 && (
                <section className="bg-base-200 py-16">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-800 mb-4">Exclusive Offers</h2>
                            <p className="text-gray-600">Use these coupons to get amazing discounts on your rent!</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {coupons.map(coupon => (
                                <div key={coupon._id} className="card bg-white shadow-xl hover:-translate-y-2 transition-transform duration-300">
                                    <div className="card-body items-center text-center">
                                        <h3 className="card-title text-3xl text-emerald-600 font-extrabold">{coupon.discount}% OFF</h3>
                                        <p className="font-medium text-gray-500">{coupon.description}</p>
                                        <div className="badge badge-lg badge-outline p-4 mt-4 text-xl font-mono">{coupon.code}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Map Section */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Find Us</h2>
                    <p className="text-gray-600">Conveniently located in the city center.</p>
                </div>
                <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-lg border-4 border-white z-0 relative">
                    <MapContainer center={[23.8103, 90.4125]} zoom={13} scrollWheelZoom={false} className="h-full w-full">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[23.8103, 90.4125]}>
                            <Popup>
                                We are here! <br /> Come visit us.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </section>
        </div>
    );
};

export default Home;
