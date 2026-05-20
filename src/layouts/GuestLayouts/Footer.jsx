import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { getSocialMedia } from "../../services/social-media.service";

const footerMenus = [
    { label: "Beranda", link: "/" },
    { label: "Produk", link: "/produk" },
    { label: "Profil", link: "/profil" },
    { label: "Kontak", link: "/kontak" },
];

// ICONS tetap kamu pakai (tidak diubah)
const IconLocation = () => (
    <svg
        className="w-5 h-5 shrink-0 mt-0.5 opacity-80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2C8.686 2 6 4.686 6 8c0 4.418 6 13 6 13s6-8.582 6-13c0-3.314-2.686-6-6-6z"
        />
        <circle cx="12" cy="8" r="2.5" fill="currentColor" stroke="none" />
    </svg>
);

const IconPhone = () => (
    <svg
        className="w-5 h-5 shrink-0 opacity-80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.72 13.06l-2.3.9a.75.75 0 01-.76-.14 10.07 10.07 0 01-3.48-3.48.75.75 0 01-.14-.76l.9-2.3a.75.75 0 00-.14-.8L9.1 4.72a.75.75 0 00-.83-.17C5.96 5.7 4.3 8.22 5.07 10.9a14.08 14.08 0 008.03 8.03c2.68.77 5.2-.89 6.35-3.2a.75.75 0 00-.17-.83l-1.76-1.76a.75.75 0 00-.8-.08z"
        />
    </svg>
);

const Footer = () => {
    const [socialMedias, setSocialMedias] = useState([]);

    useEffect(() => {
        getSocialMedia().then(setSocialMedias).catch(console.error);
    }, []);

    return (
        <footer className="relative overflow-hidden bg-gradient-to-b from-[#000080] via-[#000080] to-[#000040] text-white">
            {/* Glow background */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#000080]/20 blur-3xl rounded-full" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#000080]/10 blur-3xl rounded-full" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 py-14">
                {/* TOP GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* LEFT */}
                    <div className="space-y-5">
                        <div className="inline-block rounded-full bg-white p-0.1">
                            <img
                                src={Logo}
                                alt="logo"
                                className="h-10 lg:h-12"
                            />
                        </div>

                        <p className="text-sm text-white/70 leading-relaxed max-w-sm">
                            PT KEMBAR MEDIKA SAFETY — perusahaan yang bergerak
                            di bidang produk berkualitas dengan standar modern
                            dan higienis.
                        </p>

                        <div className="space-y-3 text-white/70 text-sm">
                            <div className="flex gap-3">
                                <IconLocation />
                                <span>
                                    Jl. Masjid 1 No.24 Sudimara Selatan,
                                    Ciledug, Tangerang
                                </span>
                            </div>

                            <div className="flex gap-3 items-center">
                                <IconPhone />
                                <a
                                    href="tel:+6281110101227"
                                    className="hover:text-[#F8AD44] transition"
                                >
                                    +62 821 - 9494 - 4632
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* MIDDLE MENU */}
                    <div className="md:flex md:justify-center">
                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-white/90 mb-2">
                                Navigasi
                            </h4>

                            {footerMenus.map((menu, idx) => (
                                <Link
                                    key={idx}
                                    to={menu.link}
                                    className="block text-sm text-white/70 hover:text-[#F8AD44] transition"
                                >
                                    {menu.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="md:text-right space-y-4">
                        <h4 className="text-sm font-semibold text-white/90">
                            Hubungi Kami
                        </h4>

                        <a
                            href="mailto:kembarmedikasafety.pt@gmail.com"
                            className="text-sm text-white/70 hover:text-[#F8AD44] transition break-all"
                        >
                            kembarmedikasafety.pt@gmail.com
                        </a>

                        <div className="flex gap-3 md:justify-end pt-2">
                            {socialMedias.map((social) => (
                                <a
                                    key={social.id}
                                    href={social.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition"
                                >
                                    <img
                                        src={`${import.meta.env.VITE_API_URL}/sosial-media/image/${social.icon}`}
                                        alt={social.nama}
                                        className="w-5 h-5 object-contain"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* BOTTOM */}
                <div className="mt-12 pt-6 border-t border-white/10 text-center">
                    <p className="text-xs text-white/50">
                        © 2026 PT KEMBAR MEDIKA SAFETY. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
