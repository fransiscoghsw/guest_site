import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFounder } from "../../../services/about.service";
import GuestLayouts from "../../../layouts/GuestLayouts";

const Founder = () => {
    const { t } = useTranslation();
    const [selectedFounder, setSelectedFounder] = useState(null);

    const {
        data: founders,
        isLoading: loadingFounder,
        error: errorFounder,
    } = useQuery({
        queryKey: ["founder"],
        queryFn: () => getFounder(),
        staleTime: 1000 * 60 * 5,
    });

    const openModal = (founder) => {
        setSelectedFounder(founder);
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setSelectedFounder(null);
        document.body.style.overflow = "auto";
    };

    if (loadingFounder) return null;
    if (errorFounder) return null;

    return (
        <GuestLayouts>
            <div className="w-[90%] max-w-6xl mx-auto mt-12 lg:mt-32 pb-16">
                <h1 className="font-bold text-3xl lg:text-4xl mb-4 lg:mb-12 text-center tracking-wide">
                    {t("about.founder")}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {founders && founders.length > 0 ? (
                        founders.map((founder) => (
                            <div
                                key={founder.id}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
                                onClick={() => openModal(founder)}
                            >
                                <div className="aspect-square w-full bg-[#43583B] relative overflow-hidden">
                                    <img
                                        src={`${import.meta.env.VITE_API_URL}/founder/image/${
                                            founder.gambar
                                        }`}
                                        alt={founder.nama}
                                        className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500 object-[50%_0%]"
                                        onError={(e) => {
                                            e.target.src =
                                                "https://placehold.co/400x400/43583B/ffffff?text=Photo";
                                        }}
                                    />
                                </div>
                                <div className="p-6 bg-gradient-to-b from-[#43583B] to-[#5a7652] text-white">
                                    <h3 className="text-xl font-bold mb-1 uppercase">
                                        {founder.nama}
                                    </h3>
                                    <h4 className="text-lg font-quicksand opacity-90">
                                        {founder.jabatan}
                                    </h4>
                                    <p
                                        className="mt-2 text-sm opacity-80 line-clamp-2"
                                        dangerouslySetInnerHTML={{
                                            __html: founder.deskripsi,
                                        }}
                                    />
                                    <button className="mt-4 px-4 py-2 bg-white text-[#43583B] rounded-lg font-medium text-sm hover:bg-opacity-90 transition-colors">
                                        {t("menu.submenu.readMore") ||
                                            "Baca Selengkapnya"}
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8 text-gray-500">
                            Data founder tidak ditemukan
                        </div>
                    )}
                </div>

                {/* Modal */}
                {selectedFounder && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                        onClick={closeModal}
                    >
                        <div
                            className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-end p-4">
                                <button
                                    onClick={closeModal}
                                    className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300 transition-colors"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="px-8 pb-8 flex flex-col md:flex-row gap-8">
                                <div className="flex-shrink-0 flex items-center justify-center md:block">
                                    <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#43583B]">
                                        <img
                                            src={`${import.meta.env.VITE_API_URL}/founder/image/${
                                                selectedFounder.gambar
                                            }`}
                                            alt={selectedFounder.nama}
                                            className="absolute inset-0 w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src =
                                                    "https://placehold.co/400x400/43583B/ffffff?text=Photo";
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="bg-[#43583B] text-white px-6 py-4 rounded-xl mb-4">
                                        <h2 className="text-2xl font-bold uppercase">
                                            {selectedFounder.nama}
                                        </h2>
                                        <h3 className="text-xl opacity-90">
                                            {selectedFounder.jabatan}
                                        </h3>
                                    </div>

                                    <div className="prose max-w-none">
                                        <p
                                            className="text-gray-800 leading-relaxed text-justify"
                                            dangerouslySetInnerHTML={{
                                                __html: selectedFounder.deskripsi,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </GuestLayouts>
    );
};

export default Founder;
