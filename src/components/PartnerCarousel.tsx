import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getPartners } from "../services/partner.service";

interface Partner {
    id: number;
    nama: string;
    image: string;
}

const PartnerCarousel = () => {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [itemWidth, setItemWidth] = useState(0);

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

    useEffect(() => {
        let mounted = true;

        getPartners((data) => {
            if (!mounted) return;

            const mapped: Partner[] = Array.isArray(data)
                ? data.map((item: any) => ({
                      id: item.id,
                      nama: item.nama || "",
                      image: item.image || "",
                  }))
                : [];

            setPartners(mapped);
        });

        return () => {
            mounted = false;
        };
    }, []);

    if (itemWidth === 0 || partners.length === 0) return null;

    const duplicated = [...partners, ...partners, ...partners];

    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#f8faff] via-white to-[#eef2ff] py-24">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-[#000080]/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#000080]/10 blur-3xl rounded-full" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6">
                {/* Header */}
                <div className="text-center mb-14">
                    <span className="inline-flex items-center rounded-full bg-[#000080]/10 px-5 py-2 text-sm font-semibold text-[#000080] border border-[#000080]/10 mb-5">
                        Partnership
                    </span>

                    <h2 className="font-bold text-3xl lg:text-5xl text-slate-900 tracking-tight">
                        Our Trusted Partners
                    </h2>

                    <p className="mt-5 max-w-2xl mx-auto text-slate-600 text-base lg:text-lg leading-relaxed">
                        Kami bekerja sama dengan berbagai partner terpercaya
                        untuk memberikan layanan terbaik dan profesional.
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative overflow-hidden">
                    {/* Fade Left */}
                    <div className="absolute left-0 top-0 z-20 h-full w-20 bg-gradient-to-r from-[#f8faff] to-transparent" />

                    {/* Fade Right */}
                    <div className="absolute right-0 top-0 z-20 h-full w-20 bg-gradient-to-l from-[#eef2ff] to-transparent" />

                    <motion.div
                        className="flex gap-5 lg:gap-7"
                        animate={{
                            x: [0, -(itemWidth * partners.length)],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: partners.length * 3,
                                ease: "linear",
                            },
                        }}
                    >
                        {duplicated.map((p, idx) => (
                            <motion.div
                                key={`${p.id}-${idx}`}
                                className="
                                    flex-shrink-0
                                    w-[170px]
                                    h-[110px]
                                    lg:w-[240px]
                                    lg:h-[140px]
                                    rounded-3xl
                                    bg-white/80
                                    backdrop-blur-xl
                                    border border-white/40
                                    shadow-[0_10px_40px_rgba(0,0,128,0.08)]
                                    hover:shadow-[0_20px_60px_rgba(0,0,128,0.18)]
                                    transition-all
                                    duration-500
                                    flex
                                    items-center
                                    justify-center
                                    p-6
                                    group
                                "
                                whileHover={{
                                    y: -8,
                                    scale: 1.03,
                                }}
                            >
                                <img
                                    src={
                                        p.image
                                            ? `${import.meta.env.VITE_API_URL}/partner/image/${p.image}`
                                            : ""
                                    }
                                    alt={p.nama}
                                    className="
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

export default PartnerCarousel;
