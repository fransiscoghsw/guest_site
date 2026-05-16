import { motion } from "framer-motion";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import { useRef, useEffect, useState } from "react";

const ProductSection = ({
    title = "Produk Kami",
    subtitle = "Berbagai jenis produk berkualitas yang kami produksi",
    products = [],
}) => {
    const sliderRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // LOCK BODY SCROLL WHEN MODAL OPEN (SAFE GLOBAL FIX)
    useEffect(() => {
        const handleModalOpen = () => {
            const hasModal = document.querySelector(".modal-open");
            document.body.style.overflow = hasModal ? "hidden" : "auto";
        };

        handleModalOpen();
        const observer = new MutationObserver(handleModalOpen);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, []);

    const handleScroll = (direction) => {
        if (!sliderRef.current) return;

        const card = sliderRef.current.querySelector(".product-card-item");
        if (!card) return;

        const cardWidth = card.offsetWidth;
        const scrollAmount =
            direction === "next"
                ? sliderRef.current.scrollLeft + cardWidth
                : sliderRef.current.scrollLeft - cardWidth;

        sliderRef.current.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    const scrollToIndex = (index) => {
        if (!sliderRef.current) return;

        const card = sliderRef.current.querySelector(".product-card-item");
        if (!card) return;

        const cardWidth = card.offsetWidth;

        sliderRef.current.scrollTo({
            left: index * cardWidth,
            behavior: "smooth",
        });

        setCurrentIndex(index);
    };

    return (
        <section className="relative w-full overflow-x-hidden overflow-y-visible bg-gradient-to-b from-[#000080] via-[#02026d] to-[#050552] py-24">
            {/* Glow Background */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl" />

            {/* IMPORTANT: isolate fixes modal stacking bug */}
            <div className="relative z-10 w-[92%] mx-auto isolate">
                {/* HEADER */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center rounded-full bg-white/10 border border-white/20 px-5 py-2 text-sm font-semibold text-white mb-5">
                            Our Products
                        </span>

                        <h2 className="font-bold text-3xl lg:text-5xl text-white">
                            {title}
                        </h2>

                        <p className="mt-4 text-blue-100">{subtitle}</p>
                    </div>

                    <a
                        href="/produk"
                        className="hidden md:inline-flex items-center gap-2 bg-[#F8AD44] hover:bg-[#f5a028] text-black font-semibold px-6 py-3 rounded-xl shadow-lg transition"
                    >
                        Lihat semua produk
                    </a>
                </div>

                {products.length > 0 ? (
                    <>
                        {/* MOBILE */}
                        <div className="md:hidden">
                            <div
                                ref={sliderRef}
                                className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-4"
                            >
                                {products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="product-card-item w-[280px] flex-shrink-0 snap-center"
                                    >
                                        <div className="bg-white/10 border border-white/10 rounded-2xl p-3 backdrop-blur-md">
                                            <ProductCard
                                                product={product}
                                                isMobileView
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* NAV */}
                            <div className="flex justify-between items-center mt-4">
                                <button
                                    onClick={() => handleScroll("prev")}
                                    className="w-10 h-10 rounded-full bg-white/10 text-white"
                                >
                                    ←
                                </button>

                                <div className="flex gap-2">
                                    {products.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => scrollToIndex(i)}
                                            className={`h-2 rounded-full ${
                                                currentIndex === i
                                                    ? "w-6 bg-white"
                                                    : "w-2 bg-white/40"
                                            }`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={() => handleScroll("next")}
                                    className="w-10 h-10 rounded-full bg-white/10 text-white"
                                >
                                    →
                                </button>
                            </div>
                        </div>

                        {/* DESKTOP */}
                        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.map((product, i) => (
                                <motion.div
                                    key={product.id}
                                    className="relative z-10"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -8 }}
                                >
                                    <div className="bg-white/10 border border-white/10 rounded-2xl backdrop-blur-md p-3">
                                        <ProductCard product={product} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-white text-center py-20">
                        Belum ada produk
                    </div>
                )}
            </div>
        </section>
    );
};

ProductSection.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    products: PropTypes.array,
};

export default ProductSection;
