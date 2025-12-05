import { FaFacebook, FaInstagram, FaTwitter, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white py-14">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Column 1: Logo & Intro */}
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-emerald-500 font-serif">The Emerald Suites</h2>
                    <p className="text-gray-400 leading-relaxed">
                        Providing luxury living and exceptional community experiences since 2024. Redefining modern urban lifestyle with comfort and elegance.
                    </p>
                </div>

                {/* Column 2: Contact Info */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-200">Contact Us</h3>
                    <div className="space-y-3">
                        <p className="flex items-center gap-3 text-gray-400">
                            <FaMapMarkerAlt className="text-emerald-500" />
                            123 Gulshan Avenue, Dhaka
                        </p>
                        <p className="flex items-center gap-3 text-gray-400">
                            <FaEnvelope className="text-emerald-500" />
                            contact@emeraldsuites.com
                        </p>
                        <p className="flex items-center gap-3 text-gray-400">
                            <FaPhoneAlt className="text-emerald-500" />
                            +880 123 456 7890
                        </p>
                    </div>
                </div>

                {/* Column 3: Socials */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-200">Follow Us</h3>
                    <p className="text-gray-400">Stay connected with our community on social media.</p>
                    <div className="flex gap-4 mt-4">
                        <a href="#" className="text-3xl hover:text-emerald-500 transition-colors duration-300">
                            <FaFacebook />
                        </a>
                        <a href="#" className="text-3xl hover:text-emerald-500 transition-colors duration-300">
                            <FaTwitter />
                        </a>
                        <a href="#" className="text-3xl hover:text-emerald-500 transition-colors duration-300">
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} The Emerald Suites. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
