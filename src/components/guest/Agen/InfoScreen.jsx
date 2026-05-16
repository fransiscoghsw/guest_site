import placeholderImage from "../../../assets/images/tray telur puyuh.jpg";
import logoImage from "../../../assets/images/New SQI Logo-Transparent.png";
import WelcomeScreen from "./WelcomeScreen";
import CategoryScreen from "./CategoryScreen";
import { useState } from "react";

const InfoScreen = () => {
    const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);
    const [showCategoryScreen, setShowCategoryScreen] = useState(false);

    const handleButtonBackClick = () => {
        setShowWelcomeScreen(true);
    };

    if (showWelcomeScreen) {
        return <WelcomeScreen />;
    }

    const handleButtonNextClick = () => {
        setShowCategoryScreen(true);
    };

    if (showCategoryScreen) {
        return <CategoryScreen />;
    }

    return (
        <div className="flex flex-col md:flex-row animate-fadeIn">
            <div className="w-full md:w-1/2">
                <img
                    src={placeholderImage}
                    alt="Landscape"
                    className="w-full h-full object-cover min-h-[400px]"
                />
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-12">
                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <img
                            src={logoImage}
                            alt="Kembar Bersaudara Group Indonesia"
                            className="h-12 w-auto mx-auto"
                        />
                    </div>

                    <div className="text-center mb-8 space-y-4">
                        <p className="text-lg leading-relaxed">
                            Terima kasih atas minat Anda untuk bergabung sebagai
                            agen telur puyuh kami! Dengan menjadi agen, Anda
                            memiliki kesempatan untuk bekerja sama langsung
                            dengan peternak terpercaya dan menyediakan produk
                            berkualitas tinggi kepada pelanggan Anda.
                        </p>
                        <p className="text-lg leading-relaxed">
                            Silakan isi formulir ini dengan lengkap dan benar.
                            Informasi yang Anda berikan akan membantu kami
                            memproses pendaftaran Anda dan memastikan kelancaran
                            dalam kerjasama ke depan.
                        </p>
                        <p className="text-lg leading-relaxed">
                            Mari bersama membangun bisnis yang sukses dan saling
                            menguntungkan! 😊
                        </p>
                    </div>

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={handleButtonBackClick}
                            className="px-8 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                        >
                            KEMBALI
                        </button>
                        <button
                            onClick={handleButtonNextClick}
                            className="px-8 py-2 bg-[#8B4513] text-white rounded hover:bg-[#723A0F] transition-colors"
                        >
                            DAFTAR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoScreen;
