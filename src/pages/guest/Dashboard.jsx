import { Suspense, lazy, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import GuestLayouts from "../../layouts/GuestLayouts";
import LoadingPage from "../../components/LoadingPage";
import WelcomePage from "../../components/WelcomePage";
import ErrorPage from "../ErrorPage";
import { getDashboardFrontpage } from "../../services/dashboard-frontpage.service";
import { getAllProduct } from "../../services/product.service";
import { getNilaiPerusahaan } from "../../services/nilaiperusahaan.service";
import { getFaqs } from "../../services/faq.service";
import { getTestimoni } from "../../services/testimoni.service";
import { motion, AnimatePresence } from "framer-motion";
import ProductSection from "../../components/guest/ProductSection";
import FaqList from "../../components/guest/FaqList";
import BrandPartnerCarousel from "../../components/BrandPartnerCarousel";
import PartnerCarousel from "../../components/PartnerCarousel";

const Dashboard = () => {
    const [showWelcome, setShowWelcome] = useState(false);
    const [companyValues, setCompanyValues] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const hasVisited = localStorage.getItem("hasVisited");
        if (!hasVisited) {
            setShowWelcome(true);
        }
    }, []);

    useEffect(() => {
        getNilaiPerusahaan((data) => {
            if (Array.isArray(data)) {
                setCompanyValues(data);
            }
        });
    }, []);

    const companyValuesToRender = companyValues.map((item) => ({
        img: item.gambar || item.image || item.img,
        title: item.judul || item.title || item.name || item.nama || "",
        description: item.deskripsi || item.description || item.desc || "",
    }));

    const handleWelcomeClose = () => {
        setShowWelcome(false);
        localStorage.setItem("hasVisited", "true");
    };
    // Artikel tidak dipakai di halaman ini; hapus query untuk mencegah error

    const {
        data: dashboardData,
        isLoading: loadingDashboard,
        error: errorDashboard,
    } = useQuery({
        queryKey: ["dashboard"],
        queryFn: () => getDashboardFrontpage(),
        staleTime: 1000 * 60 * 5,
    });

    const {
        data: productsData,
        isLoading: loadingProducts,
        error: errorProducts,
    } = useQuery({
        queryKey: ["products"],
        queryFn: () => getAllProduct(),
        staleTime: 1000 * 60 * 5,
    });

    const {
        data: faqData = [],
        isLoading: loadingFaqs,
        error: errorFaqs,
    } = useQuery({
        queryKey: ["faqs"],
        queryFn: () => getFaqs(),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });

    const {
        data: testimonialsData = [],
        isLoading: loadingTestimonials,
        error: errorTestimonials,
    } = useQuery({
        queryKey: ["testimoni"],
        queryFn: () =>
            new Promise((resolve, reject) => {
                getTestimoni((data) => {
                    resolve(data);
                });
            }),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });

    // Tidak ada pemrosesan artikel di dashboard saat ini

    // --- Styling helpers for consistent, modern look ---
    const containerClass = "max-w-6xl mx-auto px-4 sm:px-6";
    const sectionTitleClass =
        "text-sm font-semibold uppercase text-[#d67026] mb-2";
    const sectionHeadingClass = "text-3xl sm:text-4xl font-extrabold";
    const cardClass =
        "rounded-2xl bg-white p-6 shadow-lg border border-gray-100";

    const FloatingContactSales = () => {
        const [isOpen, setIsOpen] = useState(false);
        // State baru untuk mengelola tampilan di dalam modal
        const [modalStep, setModalStep] = useState("options"); // 'options' or 'template'

        // --- Detail WhatsApp ---
        const waNumber = "6281110101227";
        const waTemplateMessage =
            "Halo, saya tertarik dengan produk Suka Quail. Bisa tolong berikan informasi lebih lanjut?";
        const encodedMessage = encodeURIComponent(waTemplateMessage);
        const waLink = `https://wa.me/${waNumber}?text=${encodedMessage}`;

        // Efek untuk me-reset langkah modal saat ditutup
        useEffect(() => {
            if (!isOpen) {
                // Beri jeda sedikit agar transisi 'exit' selesai
                // sebelum me-reset tampilan internalnya
                const timer = setTimeout(() => {
                    setModalStep("options");
                }, 300); // 300ms
                return () => clearTimeout(timer);
            }
        }, [isOpen]);

        // Varian animasi (disederhanakan karena hanya 1 item)
        const itemVariant = {
            hidden: { y: 20, opacity: 0 },
            visible: {
                y: 0,
                opacity: 1,
                transition: { type: "spring", stiffness: 100, delay: 0.1 },
            },
        };

        return (
            <>
                {/* Floating Button */}
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-30 bg-gradient-to-r from-[#43583B] via-[#2d3a28] to-[#43583B] text-white rounded-full shadow-2xl hover:shadow-[#43583B]/70 transition-all duration-300 flex items-center gap-2 sm:gap-3 pr-4 sm:pr-6 pl-3 sm:pl-5 py-3 sm:py-4 border-2 border-[#d67026]"
                    style={{
                        boxShadow: "0 8px 32px rgba(67, 88, 59, 0.5)",
                    }}
                >
                    {/* Pulse */}
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-[#d67026]"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 0, 0.7],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    {/* Ikon */}
                    <motion.div className="relative flex items-center gap-2 z-10">
                        <>
                            <motion.div
                                className="relative"
                                animate={{
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                            >
                                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                            </motion.div>
                            <motion.svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                animate={{
                                    y: [0, -3, 0],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                />
                            </motion.svg>{" "}
                            {/* <-- PERBAIKAN DI SINI: Tag ditutup */}
                        </>
                    </motion.div>
                    {/* Teks */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative z-10 flex flex-col items-start"
                    >
                        <span className="font-bold text-base">
                            Hubungi Kami
                        </span>
                        <span className="text-xs text-green-300">
                            Online - Siap Membantu
                        </span>
                    </motion.div>
                </motion.button>

                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Overlay Latar Belakang */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
                            />

                            {/* Contact Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                                transition={{ duration: 0.4, type: "spring" }}
                                className={`fixed bottom-24 right-4 left-4 sm:bottom-32 sm:right-8 sm:left-auto z-[9999] bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-100 w-auto sm:w-96 lg:w-[420px] pointer-events-auto`}
                                style={{
                                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                                }}
                            >
                                {/* Header */}
                                <div className="bg-gradient-to-r from-[#43583B] via-[#2d3a28] to-[#43583B] p-5 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <motion.div
                                            className="relative"
                                            animate={{
                                                scale: [1, 1.2, 1],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                            }}
                                        >
                                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                            <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                                        </motion.div>
                                        <div>
                                            <h3 className="text-white font-bold text-xl">
                                                💬 Hubungi Kami
                                            </h3>
                                            <p className="text-green-200 text-xs">
                                                Online - Siap Membantu
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                {/* KONTEN MODAL 2 LANGKAH */}
                                <div className="p-6 max-h-[calc(100vh-250px)] overflow-y-auto">
                                    <AnimatePresence mode="wait">
                                        {/* LANGKAH 1: Tampilkan Tombol Opsi */}
                                        {modalStep === "options" && (
                                            <motion.div
                                                key="options"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, x: -50 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <motion.div
                                                    initial={{
                                                        y: 10,
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        y: 0,
                                                        opacity: 1,
                                                    }}
                                                    transition={{ delay: 0.1 }}
                                                    className="mb-6 text-center"
                                                >
                                                    <p className="text-gray-700 text-base font-medium mb-2">
                                                        🎯 Tertarik dengan
                                                        produk kami?
                                                    </p>
                                                    <p className="text-gray-500 text-sm">
                                                        Hubungi kontak di bawah
                                                        untuk informasi lebih
                                                        lanjut dan penawaran
                                                        terbaik!
                                                    </p>
                                                </motion.div>

                                                {/* Tombol WhatsApp (diubah jadi <button>) */}
                                                <motion.button
                                                    variants={itemVariant}
                                                    initial="hidden"
                                                    animate="visible"
                                                    whileHover={{
                                                        scale: 1.05,
                                                        x: 8,
                                                    }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() =>
                                                        setModalStep("template")
                                                    } // Ganti langkah
                                                    className="flex items-center w-full gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-2xl transition-all duration-0 group shadow-md hover:shadow-lg"
                                                >
                                                    <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                                                        <svg
                                                            className="w-6 h-6 text-white"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                                        </svg>
                                                    </div>
                                                    <div className="flex-1 text-left">
                                                        <p className="font-bold text-gray-800 text-base">
                                                            WhatsApp
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            Chat langsung dengan
                                                            kami
                                                        </p>
                                                    </div>
                                                    <svg
                                                        className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 5l7 7-7 7"
                                                        />
                                                    </svg>
                                                </motion.button>
                                            </motion.div>
                                        )}

                                        {/* LANGKAH 2: Tampilkan Template Pesan */}
                                        {modalStep === "template" && (
                                            <motion.div
                                                key="template"
                                                initial={{ opacity: 0, x: 50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 50 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {/* Tombol Kembali */}
                                                <button
                                                    onClick={() =>
                                                        setModalStep("options")
                                                    }
                                                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-4 transition-colors"
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 19l-7-7 7-7"
                                                        />
                                                    </svg>
                                                    Kembali
                                                </button>

                                                {/* Preview Template */}
                                                <p className="text-sm text-gray-600 mb-2 font-medium">
                                                    Pesan Template (otomatis
                                                    terisi):
                                                </p>
                                                <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 text-gray-800 text-base mb-6 min-h-[100px]">
                                                    {waTemplateMessage}
                                                </div>

                                                {/* Tombol Lanjutkan ke WA (Link Asli) */}
                                                <motion.a
                                                    href={waLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full flex items-center justify-center gap-3 py-3 px-5 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-green-500/50 transition-all duration-300"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    Lanjutkan ke WhatsApp
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                                    </svg>
                                                </motion.a>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </>
        );
    };
    return (
        <>
            {showWelcome && <WelcomePage onClose={handleWelcomeClose} />}
            {!showWelcome && (
                <GuestLayouts pageTitle={"Beranda"}>
                    <div className="w-full h-full mx-auto mt-0 overflow-x-hidden">
                        {/* Hero Section */}
                        <section className="relative min-h-screen overflow-hidden">
                            {/* Background Image */}
                            <div className="absolute inset-0 w-full h-full">
                                <img
                                    src={`${
                                        import.meta.env.VITE_API_URL
                                    }/homepage/image/${dashboardData?.image}`}
                                    alt="Jumbotron Background"
                                    className="
                    block
                    w-full
                    h-full
                    object-cover
                    object-[50%_40%]
                    sm:object-[50%_40%]
                    md:object-[50%_35%]
                    lg:object-[50%_28%]
                    scale-105
                "
                                />

                                {/* Dark Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#000080]/90 via-[#000080]/70 to-black/40" />

                                {/* Blur Glow */}
                                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl" />
                                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-300/10 rounded-full blur-3xl" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex items-center min-h-screen px-6 sm:px-10 lg:px-24">
                                <div className="max-w-3xl">
                                    {/* Badge */}
                                    <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-5 py-2 text-sm font-medium text-white mb-6 shadow-lg">
                                        Welcome To Our Company
                                    </div>

                                    {/* Heading */}
                                    <h1
                                        className="
                        font-bold
                        text-white
                        text-4xl
                        sm:text-5xl
                        lg:text-7xl
                        leading-tight
                        tracking-tight
                        drop-shadow-xl
                    "
                                    >
                                        {dashboardData?.title}
                                    </h1>

                                    {/* Subtitle */}
                                    <p
                                        className="
                        text-white/90
                        text-base
                        sm:text-lg
                        lg:text-xl
                        mt-6
                        leading-relaxed
                        max-w-2xl
                    "
                                    >
                                        {dashboardData?.subTitle}
                                    </p>

                                    {/* Buttons */}
                                    <div className="flex flex-wrap items-center gap-4 mt-10">
                                        <Link
                                            to={"/tentang-kami"}
                                            className="
                            inline-flex
                            items-center
                            gap-3
                            rounded-2xl
                            bg-[#F8AD44]
                            hover:bg-[#f5a028]
                            px-7
                            py-4
                            text-sm
                            lg:text-base
                            font-semibold
                            text-black
                            shadow-[0_10px_30px_rgba(248,173,68,0.35)]
                            hover:shadow-[0_20px_50px_rgba(248,173,68,0.45)]
                            transition-all
                            duration-300
                            hover:-translate-y-1
                        "
                                        >
                                            Lebih lanjut
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </Link>

                                        <Link
                                            to={"/kontak"}
                                            className="
                            inline-flex
                            items-center
                            gap-3
                            rounded-2xl
                            border
                            border-white/20
                            bg-white/10
                            backdrop-blur-md
                            hover:bg-white/20
                            px-7
                            py-4
                            text-sm
                            lg:text-base
                            font-semibold
                            text-white
                            transition-all
                            duration-300
                            hover:-translate-y-1
                        "
                                        >
                                            Contact Us
                                        </Link>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex flex-wrap gap-8 mt-14">
                                        <div>
                                            <h3 className="text-3xl font-bold text-white">
                                                100+
                                            </h3>
                                            <p className="text-white/70 text-sm mt-1">
                                                Professional Clients
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-3xl font-bold text-white">
                                                24/7
                                            </h3>
                                            <p className="text-white/70 text-sm mt-1">
                                                Customer Support
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-3xl font-bold text-white">
                                                10+
                                            </h3>
                                            <p className="text-white/70 text-sm mt-1">
                                                Years Experience
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Fade */}
                            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-10" />

                            {/* Floating Contact */}
                            <FloatingContactSales />
                        </section>
                    </div>

                    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-[#f5f7ff] to-[#eef2ff] py-24">
                        {/* Background Blur */}
                        <div className="absolute top-0 left-0 w-72 h-72 bg-[#000080]/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#000080]/10 rounded-full blur-3xl" />

                        <div className="relative z-10 w-[90%] max-w-7xl mx-auto">
                            {/* Header */}
                            <div className="text-center mb-16">
                                <span className="inline-flex items-center rounded-full bg-[#000080]/10 border border-[#000080]/10 px-5 py-2 text-sm font-semibold text-[#000080] mb-5">
                                    Company Values
                                </span>

                                <h2 className="font-bold text-3xl lg:text-5xl tracking-tight text-slate-900 leading-tight">
                                    Why Choose Us
                                </h2>

                                <p className="mt-5 max-w-2xl mx-auto text-slate-600 text-base lg:text-lg leading-relaxed">
                                    Nilai perusahaan yang menjadi fondasi dalam
                                    memberikan layanan profesional, terpercaya,
                                    dan berkualitas.
                                </p>
                            </div>

                            {/* Mobile */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:hidden">
                                {companyValuesToRender.map((item, i) => {
                                    const imageSrc = item.img
                                        ? typeof item.img === "string"
                                            ? item.img.startsWith("http")
                                                ? item.img
                                                : `${import.meta.env.VITE_API_URL}/nilai-nilai-perusahaan/image/${item.img}`
                                            : null
                                        : null;

                                    const title = item.title;
                                    const description = item.description;

                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 0.5,
                                                delay: i * 0.1,
                                            }}
                                            whileTap={{ scale: 0.97 }}
                                            className="
                            group
                            relative
                            overflow-hidden
                            rounded-[28px]
                            border
                            border-white/40
                            bg-white/80
                            backdrop-blur-xl
                            shadow-[0_10px_40px_rgba(0,0,128,0.08)]
                            p-6
                        "
                                        >
                                            {/* Glow */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#000080]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            <motion.div
                                                whileTap={{
                                                    rotate: 8,
                                                    scale: 1.08,
                                                }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 300,
                                                }}
                                                className="
                                w-14
                                h-14
                                rounded-2xl
                                bg-[#000080]/10
                                flex
                                items-center
                                justify-center
                                mb-5
                            "
                                            >
                                                <img
                                                    src={imageSrc ?? item.img}
                                                    alt={title}
                                                    className="w-8 h-8 object-contain"
                                                />
                                            </motion.div>

                                            <div>
                                                <p className="font-bold text-base text-slate-900">
                                                    {title}
                                                </p>

                                                {description ? (
                                                    <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                                                        {description}
                                                    </p>
                                                ) : null}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Desktop */}
                            <div className="hidden md:grid md:grid-cols-3 gap-8">
                                {companyValuesToRender.map((item, i) => {
                                    const imageSrc = item.img
                                        ? typeof item.img === "string"
                                            ? item.img.startsWith("http")
                                                ? item.img
                                                : `${import.meta.env.VITE_API_URL}/nilai-nilai-perusahaan/image/${item.img}`
                                            : null
                                        : null;

                                    const title = item.title;
                                    const description = item.description;

                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 40 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 0.6,
                                                delay: i * 0.12,
                                            }}
                                            whileHover={{
                                                y: -10,
                                                scale: 1.02,
                                            }}
                                            className="
                            group
                            relative
                            overflow-hidden
                            rounded-[36px]
                            border
                            border-white/40
                            bg-white/75
                            backdrop-blur-2xl
                            p-10
                            shadow-[0_10px_50px_rgba(0,0,128,0.08)]
                            hover:shadow-[0_25px_80px_rgba(0,0,128,0.16)]
                            transition-all
                            duration-500
                        "
                                        >
                                            {/* Hover Glow */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#000080]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Icon */}
                                            <motion.div
                                                whileHover={{
                                                    rotate: [0, -8, 8, 0],
                                                    scale: 1.08,
                                                }}
                                                transition={{
                                                    duration: 0.5,
                                                    ease: "easeInOut",
                                                }}
                                                className="
                                relative
                                w-20
                                h-20
                                rounded-3xl
                                bg-[#000080]/10
                                flex
                                items-center
                                justify-center
                                mb-8
                            "
                                            >
                                                <img
                                                    src={imageSrc ?? item.img}
                                                    alt={title}
                                                    className="w-10 h-10 object-contain"
                                                />
                                            </motion.div>

                                            {/* Content */}
                                            <div className="relative">
                                                <p className="font-bold text-2xl text-slate-900 group-hover:text-[#000080] transition-colors duration-300">
                                                    {title}
                                                </p>

                                                {description ? (
                                                    <p className="text-slate-600 mt-4 leading-relaxed text-base">
                                                        {description}
                                                    </p>
                                                ) : null}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    <section className="w-full bg-[#000080] py-14">
                        <div className="w-[92%] mx-auto">
                            {/* HEADER */}
                            <div className="mb-10 flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6">
                                <div>
                                    <span className="inline-block px-4 py-1 text-xs bg-white/10 border border-white/20 text-white rounded-full mb-3">
                                        Produk Kami
                                    </span>

                                    <h2 className="text-white text-3xl lg:text-5xl font-bold">
                                        Produk Kami
                                    </h2>

                                    <p className="text-blue-100 mt-3 max-w-xl">
                                        Berbagai jenis produk berkualitas yang
                                        kami produksi
                                    </p>
                                </div>

                                <a
                                    href="/produk"
                                    className="hidden md:inline-flex bg-[#F8AD44] hover:bg-[#e09a35] text-black font-semibold px-6 py-3 rounded-xl transition shadow-lg"
                                >
                                    Lihat semua produk
                                </a>
                            </div>

                            {/* GRID */}
                            {productsData && productsData.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {productsData.slice(0, 4).map((product) => (
                                        <div
                                            key={product.id}
                                            onClick={() => navigate("/produk")}
                                            className="
                            group
                            bg-white
                            rounded-2xl
                            overflow-hidden
                            shadow-md
                            hover:shadow-2xl
                            transition-all duration-300
                            cursor-pointer
                        "
                                        >
                                            {/* IMAGE */}
                                            <div className="h-44 bg-gray-100 flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={
                                                        product.image
                                                            ? `${import.meta.env.VITE_API_URL}/product/image/${product.image}`
                                                            : ""
                                                    }
                                                    alt={product.name}
                                                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>

                                            {/* TEXT */}
                                            <div className="p-4">
                                                <h3 className="text-sm font-bold text-gray-900 line-clamp-2">
                                                    {product.name}
                                                </h3>

                                                <p className="text-xs text-[#000080] font-semibold mt-2 group-hover:tracking-wide transition-all">
                                                    Klik untuk lihat detail →
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-white py-16 bg-white/10 rounded-2xl border border-white/10">
                                    Belum ada produk tersedia
                                </div>
                            )}
                        </div>
                    </section>

                    <BrandPartnerCarousel />

                    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#000080] via-[#02026d] to-[#04045a] py-24">
                        {/* Background Blur */}
                        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl" />

                        <div className={`${containerClass} relative z-10`}>
                            {/* Header */}
                            <div className="text-center mb-16">
                                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-5 py-2 text-sm font-semibold text-white mb-5">
                                    Testimonials
                                </span>

                                <h2
                                    className={`${sectionHeadingClass} text-white leading-tight`}
                                >
                                    Apa Kata Mereka?
                                </h2>

                                <p className="mt-5 max-w-2xl mx-auto text-blue-100 text-base lg:text-lg leading-relaxed">
                                    Pendapat dan pengalaman pelanggan kami
                                    setelah menggunakan layanan perusahaan.
                                </p>
                            </div>

                            {/* Testimonial Grid */}
                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {loadingTestimonials ? (
                                    Array.from({ length: 3 }).map((_, idx) => (
                                        <div
                                            key={idx}
                                            className="
                            rounded-[32px]
                            bg-white/10
                            backdrop-blur-xl
                            border
                            border-white/10
                            p-7
                            animate-pulse
                        "
                                        >
                                            <div className="h-14 w-14 rounded-full bg-white/20 mb-5" />
                                            <div className="h-5 bg-white/20 rounded-md mb-4" />
                                            <div className="h-4 bg-white/20 rounded-md w-5/6 mb-2" />
                                            <div className="h-4 bg-white/20 rounded-md w-4/6" />
                                        </div>
                                    ))
                                ) : errorTestimonials ? (
                                    <div className="col-span-full text-center">
                                        <div className="inline-flex rounded-2xl border border-red-300/20 bg-red-400/10 px-6 py-4 text-sm text-red-100 backdrop-blur-md">
                                            Gagal memuat testimoni. Silakan muat
                                            ulang halaman.
                                        </div>
                                    </div>
                                ) : testimonialsData &&
                                  testimonialsData.length > 0 ? (
                                    testimonialsData.map((testimonial) => {
                                        const imageUrl = testimonial.foto
                                            ? testimonial.foto.startsWith(
                                                  "http",
                                              )
                                                ? testimonial.foto
                                                : `${import.meta.env.VITE_API_URL}/testimoni/image/${testimonial.foto}`
                                            : null;

                                        return (
                                            <div
                                                key={
                                                    testimonial.id ||
                                                    testimonial.nama
                                                }
                                                className="
                                group
                                relative
                                rounded-[32px]
                                border
                                border-white/10
                                bg-white/10
                                backdrop-blur-2xl
                                p-7
                                shadow-[0_10px_40px_rgba(0,0,0,0.18)]
                                hover:shadow-[0_25px_70px_rgba(0,0,0,0.28)]
                                hover:-translate-y-2
                                transition-all
                                duration-500
                                overflow-hidden
                            "
                                            >
                                                {/* Glow Effect */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                                {/* Quote Icon */}
                                                <div className="absolute top-6 right-6 text-5xl text-white/10 font-serif">
                                                    ”
                                                </div>

                                                {/* User */}
                                                <div className="relative flex items-center gap-4 mb-6">
                                                    <div className="h-16 w-16 rounded-2xl overflow-hidden bg-white/10 border border-white/10 shadow-lg">
                                                        {imageUrl ? (
                                                            <img
                                                                src={imageUrl}
                                                                alt={
                                                                    testimonial.nama
                                                                }
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="h-full w-full bg-white/10" />
                                                        )}
                                                    </div>

                                                    <div>
                                                        <p className="font-semibold text-lg text-white">
                                                            {testimonial.nama}
                                                        </p>

                                                        <p className="text-sm text-blue-100">
                                                            {
                                                                testimonial.pekerjaan
                                                            }
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Message */}
                                                <p className="relative text-sm text-slate-100 leading-relaxed">
                                                    {testimonial.pesan}
                                                </p>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="col-span-full text-center">
                                        <div className="inline-flex rounded-2xl border border-white/10 bg-white/10 px-6 py-4 text-sm text-blue-100 backdrop-blur-md">
                                            Belum ada testimoni tersedia.
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#f4f7ff] via-white to-[#eef2ff] py-24">
                        {/* Background Blur */}
                        <div className="absolute top-0 left-0 w-72 h-72 bg-[#000080]/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#000080]/10 rounded-full blur-3xl" />

                        <div className={`${containerClass} relative z-10`}>
                            {/* Header */}
                            <div className="text-center mb-14">
                                <span className="inline-flex items-center rounded-full bg-[#000080]/10 px-4 py-2 text-sm font-semibold text-[#000080] mb-5 border border-[#000080]/10">
                                    FAQ
                                </span>

                                <h2
                                    className={`${sectionHeadingClass} text-slate-900 leading-tight`}
                                >
                                    Frequently Asked Questions
                                </h2>

                                <p className="mt-4 max-w-2xl mx-auto text-slate-600 text-base sm:text-lg leading-relaxed">
                                    Temukan jawaban atas pertanyaan yang paling
                                    sering ditanyakan mengenai layanan dan
                                    informasi perusahaan kami.
                                </p>
                            </div>

                            {/* Content */}
                            <div className="max-w-4xl mx-auto">
                                <div className="rounded-[32px] border border-[#000080]/10 bg-white/90 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,128,0.12)] p-6 sm:p-10">
                                    {loadingFaqs ? (
                                        <div className="space-y-5">
                                            <div className="h-16 bg-[#000080]/10 rounded-2xl animate-pulse"></div>
                                            <div className="h-16 bg-[#000080]/10 rounded-2xl animate-pulse"></div>
                                            <div className="h-16 bg-[#000080]/10 rounded-2xl animate-pulse"></div>
                                        </div>
                                    ) : errorFaqs ? (
                                        <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-5 text-center">
                                            <p className="text-sm text-red-600">
                                                Gagal memuat FAQ. Silakan muat
                                                ulang halaman.
                                            </p>
                                        </div>
                                    ) : faqData && faqData.length > 0 ? (
                                        <FaqList faqs={faqData} />
                                    ) : (
                                        <div className="rounded-2xl border border-dashed border-[#000080]/20 bg-[#000080]/5 px-6 py-10 text-center">
                                            <p className="text-sm text-slate-500">
                                                Belum ada FAQ tersedia.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    <PartnerCarousel />
                </GuestLayouts>
            )}
        </>
    );
};

export default Dashboard;
