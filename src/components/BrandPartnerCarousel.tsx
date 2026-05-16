import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getCustomers } from "../services/customer.service";

interface Brand {
    id: number;
    nama: string;
    image: string;
}

interface BrandPartnerCarouselProps {
    brands?: Brand[];
}

const BrandPartnerCarousel = ({ brands }: BrandPartnerCarouselProps) => {
    const [brandsState, setBrandsState] = useState<Brand[]>(brands ?? []);
    const [itemWidth, setItemWidth] = useState(0);

    // Triple brands for infinite scroll
    const duplicatedBrands = [...brandsState, ...brandsState, ...brandsState];

    useEffect(() => {
        const calculateWidth = () => {
            const isDesktop = window.innerWidth >= 1024;
            const width = isDesktop ? 240 : 170;
            const gap = isDesktop ? 28 : 18;

            setItemWidth(width + gap);
        };

        calculateWidth();

        window.addEventListener("resize", calculateWidth);

        return () => window.removeEventListener("resize", calculateWidth);
    }, []);

    // Fetch customer data
    useEffect(() => {
        if (brands && brands.length > 0) return;

        let mounted = true;

        getCustomers((data) => {
            if (!mounted) return;

            const mapped: Brand[] = Array.isArray(data)
                ? data.map((item: any) => ({
                      id: item.id,
                      nama: item.nama || "",
                      image: item.image || "",
                  }))
                : [];

            setBrandsState(mapped);
        });

        return () => {
            mounted = false;
        };
    }, [brands]);

    if (itemWidth === 0 || brandsState.length === 0) return null;

    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-[#f5f7ff] to-[#eef2ff] py-24">
            {/* Background Blur */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-[#000080]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#000080]/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-flex items-center rounded-full bg-[#000080]/10 border border-[#000080]/10 px-5 py-2 text-sm font-semibold text-[#000080] mb-5">
                        Customers
                    </span>

                    <h2 className="font-bold text-3xl lg:text-5xl text-slate-900 tracking-tight">
                        Our Trusted Customers
                    </h2>

                    <p className="mt-5 max-w-2xl mx-auto text-slate-600 text-base lg:text-lg leading-relaxed">
                        Kepercayaan pelanggan menjadi bukti kualitas layanan dan
                        profesionalitas yang kami berikan.
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative overflow-hidden">
                    {/* Left Gradient */}
                    <div className="absolute left-0 top-0 z-20 h-full w-20 bg-gradient-to-r from-white to-transparent" />

                    {/* Right Gradient */}
                    <div className="absolute right-0 top-0 z-20 h-full w-20 bg-gradient-to-l from-[#eef2ff] to-transparent" />

                    {/* Motion Container */}
                    <motion.div
                        className="flex gap-5 lg:gap-7"
                        animate={{
                            x: [0, -(itemWidth * brandsState.length)],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: brandsState.length * 3,
                                ease: "linear",
                            },
                        }}
                    >
                        {duplicatedBrands.map((brand, index) => (
                            <motion.div
                                key={`${brand.id}-${index}`}
                                className="
                                    group
                                    flex-shrink-0
                                    w-[170px]
                                    h-[110px]
                                    lg:w-[240px]
                                    lg:h-[140px]
                                    rounded-[30px]
                                    border
                                    border-white/40
                                    bg-white/80
                                    backdrop-blur-xl
                                    shadow-[0_10px_40px_rgba(0,0,128,0.08)]
                                    hover:shadow-[0_25px_70px_rgba(0,0,128,0.16)]
                                    transition-all
                                    duration-500
                                    flex
                                    items-center
                                    justify-center
                                    p-6
                                    overflow-hidden
                                "
                                whileHover={{
                                    y: -8,
                                    scale: 1.03,
                                }}
                            >
                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#000080]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <img
                                    src={
                                        brand.image
                                            ? `${import.meta.env.VITE_API_URL}/customer/image/${brand.image}`
                                            : ""
                                    }
                                    alt={brand.nama}
                                    className="
                                        relative
                                        max-w-full
                                        max-h-full
                                        object-contain
                                        grayscale
                                        opacity-70
                                        group-hover:grayscale-0
                                        group-hover:opacity-100
                                        transition-all
                                        duration-500
                                    "
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default BrandPartnerCarousel;
