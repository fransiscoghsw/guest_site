import LogoSQI from "../../assets/images/logo.png";
import MenuItem from "./MenuItem";
import { guestMenus } from "./MenuList";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-[#000080] w-full sticky top-0 z-50 shadow-md">
            <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto px-4 lg:px-14 py-3">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                    <NavLink to="/" className="flex items-center space-x-3">
                        <img
                            src={LogoSQI}
                            className="h-10 sm:h-12 lg:h-14"
                            alt="Logo"
                        />
                        <span className="text-white font-bold text-lg sm:text-xl">
                            PT Kembar Bersaudara
                        </span>
                    </NavLink>
                </div>

                {/* Hamburger Toggle */}
                <div className="lg:hidden flex items-center">
                    <button
                        onClick={handleToggle}
                        type="button"
                        className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/20 transition-colors"
                        aria-controls="navbar-sticky"
                        aria-expanded={isOpen}
                    >
                        <span className="sr-only">Toggle menu</span>
                        {isOpen ? (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Menu Items */}
                <div
                    className={`w-full lg:flex lg:w-auto lg:ml-auto transition-all duration-300 ${
                        isOpen ? "block" : "hidden"
                    }`}
                    id="navbar-sticky"
                >
                    <ul className="flex flex-col lg:flex-row lg:space-x-6 lg:items-center text-white text-sm font-medium">
                        {guestMenus.map((guestMenu, index) => (
                            <MenuItem key={index} {...guestMenu} />
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
