import { useState } from "react";
import PropTypes from "prop-types";
import { X, Download, ZoomIn } from "lucide-react";

// ─── DOWNLOAD FUNCTION ────────────────────────────────────────────────────────
const handleDownload = async (imageUrl, fileName) => {
    try {
        const response = await fetch(imageUrl);

        const blob = await response.blob();

        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = blobUrl;
        link.download = `${fileName}.jpg`;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error("Download failed:", error);
    }
};

// ─── IMAGE PREVIEW MODAL ──────────────────────────────────────────────────────
const ImagePreviewModal = ({ image, name, onClose }) => {
    const [zoomed, setZoomed] = useState(false);

    return (
        <div
            onClick={onClose}
            className="
                fixed inset-0 z-[99999999]
                bg-black/90 backdrop-blur-md
                flex items-center justify-center
                p-4
            "
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full h-full flex items-center justify-center"
            >
                {/* ACTIONS */}
                <div className="absolute top-4 right-4 z-30 flex gap-3">
                    {/* DOWNLOAD */}
                    <button
                        onClick={() => handleDownload(image, name)}
                        className="
                            w-11 h-11 rounded-full bg-white
                            flex items-center justify-center
                            shadow-lg hover:scale-105 transition
                        "
                    >
                        <Download size={18} />
                    </button>

                    {/* CLOSE */}
                    <button
                        onClick={onClose}
                        className="
                            w-11 h-11 rounded-full bg-white
                            flex items-center justify-center
                            shadow-lg hover:scale-105 transition
                        "
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* IMAGE */}
                <img
                    src={image}
                    alt={name}
                    draggable={false}
                    onClick={() => setZoomed(!zoomed)}
                    className={`
                        max-h-[90vh]
                        object-contain
                        select-none
                        transition-transform duration-300
                        ${
                            zoomed
                                ? "scale-150 cursor-zoom-out"
                                : "scale-100 cursor-zoom-in"
                        }
                    `}
                />
            </div>
        </div>
    );
};

ImagePreviewModal.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

// ─── PRODUCT MODAL ────────────────────────────────────────────────────────────
const ProductModal = ({ product, onClose }) => {
    const [showPreview, setShowPreview] = useState(false);

    const whatsappNumber = "628111616635";

    const whatsappMessage = encodeURIComponent(
        `Halo, saya ingin bertanya produk ${product.name}`,
    );

    return (
        <>
            <div
                className="
                    fixed inset-0 z-[999999]
                    flex items-center justify-center
                    bg-black/70 backdrop-blur-md
                    p-4
                "
                onClick={onClose}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="
                        relative w-full max-w-3xl
                        bg-white rounded-3xl shadow-2xl
                        flex flex-col md:flex-row
                        overflow-hidden
                    "
                >
                    {/* CLOSE */}
                    <button
                        onClick={onClose}
                        className="
                            absolute top-4 right-4
                            w-10 h-10 bg-white rounded-full
                            shadow z-20
                            flex items-center justify-center
                        "
                    >
                        <X size={18} />
                    </button>

                    {/* IMAGE */}
                    <div
                        className="
                            md:w-1/2 bg-gray-100
                            flex items-center justify-center
                            p-6 relative group
                        "
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="
                                max-h-72
                                w-full
                                object-contain
                                transition-transform duration-500
                                group-hover:scale-105
                            "
                        />

                        {/* OVERLAY */}
                        <div
                            onClick={() => setShowPreview(true)}
                            className="
                                absolute inset-0
                                bg-black/0 group-hover:bg-black/20
                                transition
                                flex items-center justify-center
                                cursor-zoom-in
                            "
                        >
                            <div
                                className="
                                    opacity-0 group-hover:opacity-100
                                    transition
                                    bg-white text-black
                                    rounded-full p-3
                                    shadow-xl
                                "
                            >
                                <ZoomIn size={24} />
                            </div>
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="md:w-1/2 p-6 flex flex-col justify-center">
                        <h2 className="text-2xl font-bold mb-5 text-gray-900">
                            {product.name}
                        </h2>

                        <div className="space-y-3 mb-8">
                            {product.descriptions?.map((d, i) => (
                                <p
                                    key={i}
                                    className="text-sm text-gray-700 leading-relaxed"
                                >
                                    • {d}
                                </p>
                            ))}
                        </div>

                        <div className="flex flex-col gap-3">
                            {/* WHATSAPP */}
                            <a
                                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noreferrer"
                                className="
                                    bg-[#000080]
                                    hover:bg-[#000060]
                                    text-white
                                    py-3 rounded-xl
                                    text-center
                                    font-semibold
                                    transition
                                "
                            >
                                Hubungi Kami
                            </a>

                            {/* DOWNLOAD */}
                            <button
                                onClick={() =>
                                    handleDownload(product.image, product.name)
                                }
                                className="
                                    border border-gray-300
                                    hover:bg-gray-100
                                    py-3 rounded-xl
                                    text-center
                                    font-semibold
                                    transition
                                    flex items-center justify-center gap-2
                                "
                            >
                                <Download size={18} />
                                Download Image
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* PREVIEW */}
            {showPreview && (
                <ImagePreviewModal
                    image={product.image}
                    name={product.name}
                    onClose={() => setShowPreview(false)}
                />
            )}
        </>
    );
};

ProductModal.propTypes = {
    product: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};

// ─── PRODUCT CARD ITEM ───────────────────────────────────────────────────────
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
                <div
                    className="
                        relative h-48
                        bg-gradient-to-b from-gray-50 to-gray-100
                        flex items-center justify-center
                        overflow-hidden
                    "
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        className="
                            h-full w-full object-contain
                            transition-transform duration-500
                            group-hover:scale-110
                        "
                    />

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition" />
                </div>

                {/* CONTENT */}
                <div className="p-4 flex flex-col gap-2 flex-1">
                    <h3
                        className="
                            text-sm lg:text-base
                            font-bold text-gray-900
                            line-clamp-2 leading-snug
                        "
                    >
                        {product.name}
                    </h3>

                    <div className="mt-auto flex items-center justify-between">
                        <span
                            className="
                                text-xs font-semibold text-[#000080]
                                group-hover:tracking-wide transition-all
                            "
                        >
                            See details
                        </span>

                        <span
                            className="
                                text-[#000080]
                                group-hover:translate-x-1
                                transition-transform
                            "
                        >
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

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
const ProductCard = ({ product }) => {
    if (product) {
        const descriptionText = product.description
            ? product.description.replace(/<[^>]+>/g, "").trim()
            : "";

        const formatted = {
            id: product.id,
            name: product.name || "Produk",

            image: product.image
                ? `${import.meta.env.VITE_API_URL}/product/image/${product.image}`
                : "/placeholder.png",

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

    return null;
};

ProductCard.propTypes = {
    product: PropTypes.object,
};

export default ProductCard;
