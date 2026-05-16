import { useState } from "react";
import PropTypes from "prop-types";

// ─── Modal Detail ─────────────────────────────────────────────────────────────
const ProductModal = ({ product, onClose }) => {
    const whatsappNumber = "6281110101227";
    const whatsappMessage = encodeURIComponent(
        `Halo, saya ingin bertanya produk ${product.name}`,
    );

    return (
        <div
            className="modal-open fixed inset-0 z-[999999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden"
            >
                {/* close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full shadow z-20"
                >
                    ✕
                </button>

                {/* image */}
                <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-64 object-contain"
                    />
                </div>

                {/* content */}
                <div className="md:w-1/2 p-6 flex flex-col justify-center">
                    <h2 className="text-xl font-bold mb-4">{product.name}</h2>

                    <div className="space-y-2 mb-6">
                        {product.descriptions?.map((d, i) => (
                            <p key={i} className="text-sm text-gray-700">
                                • {d}
                            </p>
                        ))}
                    </div>

                    <a
                        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                        className="bg-[#000080] text-white py-3 rounded-xl text-center font-semibold"
                    >
                        Hubungi Kami
                    </a>
                </div>
            </div>
        </div>
    );
};

ProductModal.propTypes = {
    product: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};

// ─── Card Item ────────────────────────────────────────────────────────────────
const ProductCardItem = ({ product }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div
                onClick={() => setShowModal(true)}
                className="
                    group cursor-pointer
                    bg-white rounded-3xl
                    border border-gray-100
                    shadow-sm hover:shadow-2xl
                    transition-all duration-300
                    overflow-hidden
                    hover:-translate-y-1
                    flex flex-col
                "
            >
                {/* IMAGE */}
                <div className="relative h-48 bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="
                            h-full w-full object-contain
                            transition-transform duration-500
                            group-hover:scale-110
                        "
                    />

                    {/* subtle overlay hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition" />
                </div>

                {/* CONTENT */}
                <div className="p-4 flex flex-col gap-2 flex-1">
                    <h3 className="text-sm lg:text-base font-bold text-gray-900 line-clamp-2 leading-snug">
                        {product.name}
                    </h3>

                    <div className="mt-auto flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#000080] group-hover:tracking-wide transition-all">
                            Lihat detail
                        </span>

                        <span className="text-[#000080] group-hover:translate-x-1 transition-transform">
                            →
                        </span>
                    </div>
                </div>
            </div>

            {showModal && (
                <ProductModal
                    product={product}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
};

ProductCardItem.propTypes = {
    product: PropTypes.object.isRequired,
};

// ─── Main Export ──────────────────────────────────────────────────────────────
// Bisa dipanggil 2 cara:
// 1. <ProductCard product={product} /> — render 1 card (dari Dashboard/ProductSection)
// 2. <ProductCard /> — render grid semua 6 produk statis (dari halaman Produk)
const ProductCard = ({ product }) => {
    if (product) {
        // Gunakan data dari API langsung tanpa pencarian di static data
        const descriptionText = product.description
            ? product.description.replace(/<[^>]+>/g, "").trim()
            : "";
        const formatted = {
            id: product.id,
            name: product.name || "Produk",
            image: product.image
                ? `${import.meta.env.VITE_API_URL}/product/image/${product.image}`
                : null,
            quantities: product.quantity ? [`${product.quantity}`] : [],
            descriptions:
                Array.isArray(product.descriptions) &&
                product.descriptions.length
                    ? product.descriptions
                    : descriptionText
                      ? [descriptionText]
                      : [],
        };
        return <ProductCardItem product={formatted} />;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((p) => (
                <ProductCardItem key={p.id} product={p} />
            ))}
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        image: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
        quantity: PropTypes.number,
        unitId: PropTypes.string,
    }),
};

ProductCard.defaultProps = {
    product: null,
};

export default ProductCard;
