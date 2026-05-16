import placeholderImage from "../../../assets/images/tray telur puyuh.jpg";
import logoImage from "../../../assets/images/New SQI Logo-Transparent.png";
import InfoScreen from "./InfoScreen";
// import FormScreen from "./Packaging/FormScreen";
// import OrdererDataScreen from "./Tray/OrdererDataScreen";
import { useState } from "react";

const CategoryScreen = () => {
    const [showInfoScreen, setShowInfoScreen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleButtonBackClick = () => {
        setShowInfoScreen(true);
    };

    if (showInfoScreen) {
        return <InfoScreen />;
    }

    if (selectedCategory === "kemasan") {
        window.open(
            "https://docs.google.com/forms/d/e/1FAIpQLSdPqMYdeLTLncRG2It2Wt8h0H2xM2EMvJgXTpqglizbjF9l3A/viewform",
        );
        // return null;
    }

    if (selectedCategory === "tray") {
        window.open(
            "https://bit.ly/link-pemesanan-telurpuyuh-dalam-tray-PTSQI",
        );
        // return null;
    }

    return (
        <div className="flex flex-col md:flex-row bg-gray-100 animate-fadeIn">
            <div className="w-full md:w-1/2">
                <img
                    src={placeholderImage}
                    alt="Landscape"
                    className="w-full h-full object-cover shadow-lg"
                />
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-12 bg-white shadow-md">
                <div className="w-full max-w-md text-center">
                    <div className="mb-6">
                        <img
                            src={logoImage}
                            alt="Kembar Bersaudara Group Indonesia"
                            className="h-16 w-auto mx-auto"
                        />
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Pilih Kategori Pendaftaran
                    </h2>

                    <div className="flex flex-col items-center space-y-4 m-10">
                        <button
                            onClick={() => setSelectedCategory("kemasan")}
                            className={`px-8 py-3 w-full rounded-lg text-lg font-medium transition-all shadow-md mb-6 ${
                                selectedCategory === "kemasan"
                                    ? "bg-[#8B4513] text-white"
                                    : "bg-[#8B4513] text-white hover:bg-[#723A0F]"
                            }`}
                        >
                            Kemasan
                        </button>
                        <button
                            onClick={() => setSelectedCategory("tray")}
                            className={`px-8 py-3 w-full rounded-lg text-lg font-medium transition-all shadow-md ${
                                selectedCategory === "tray"
                                    ? "bg-[#8B4513] text-white"
                                    : "bg-[#8B4513] text-white hover:bg-[#723A0F]"
                            }`}
                        >
                            Tray
                        </button>
                    </div>

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={handleButtonBackClick}
                            className="px-8 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                        >
                            KEMBALI
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryScreen;
