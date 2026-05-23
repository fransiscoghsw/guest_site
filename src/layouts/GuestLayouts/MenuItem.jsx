import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import PropTypes from "prop-types";

const MenuItem = ({ link, label, subMenu }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    if (subMenu) {
        return (
            <li className="relative group" ref={dropdownRef}>
                <button
                    onClick={toggleMenu}
                    className="flex items-center justify-between w-full px-4 py-2 text-white font-medium rounded-md hover:text-[#F8AD44] hover:bg-white/10 transition-colors duration-200"
                >
                    {label}
                    {isOpen ? (
                        <IoIosArrowUp className="ml-2 w-4 h-4" />
                    ) : (
                        <IoIosArrowDown className="ml-2 w-4 h-4" />
                    )}
                </button>

                <ul
                    className={`absolute left-0 z-20 w-56 p-2 mt-2 space-y-1 bg-white rounded-md shadow-lg transition-all duration-200 ease-in-out ${
                        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                >
                    {subMenu.map((subItem) => (
                        <li key={subItem.link}>
                            <NavLink
                                to={subItem.link}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `block px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
                                        isActive
                                            ? "font-semibold text-[#000080] bg-gray-100"
                                            : "font-medium text-gray-800 hover:text-[#F8AD44] hover:bg-gray-50"
                                    }`
                                }
                                end
                            >
                                {subItem.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </li>
        );
    }

    return (
        <li>
            <NavLink
                to={link}
                end={link === "/"}
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-md transition-colors duration-200 font-medium ${
                        isActive
                            ? "text-[#F8AD44] font-semibold"
                            : "text-white hover:text-[#F8AD44]"
                    }`
                }
            >
                {label}
            </NavLink>
        </li>
    );
};

MenuItem.propTypes = {
    link: PropTypes.string,
    label: PropTypes.string.isRequired,
    subMenu: PropTypes.arrayOf(
        PropTypes.shape({
            link: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        }),
    ),
};

export default MenuItem;
