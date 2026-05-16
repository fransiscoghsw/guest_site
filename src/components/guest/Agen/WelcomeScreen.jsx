import { useState } from "react";
import placeholderImage from "../../../assets/images/tray telur puyuh.jpg";
import logoImage from "../../../assets/images/New SQI Logo-Transparent.png";
import InfoScreen from "./InfoScreen";

const WelcomeScreen = () => {
    const [showInfoScreen, setShowInfoScreen] = useState(false);

    const handleButtonClick = () => {
        setShowInfoScreen(true);
    };

    if (showInfoScreen) {
        return <InfoScreen />;
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
                    <div className="mb-12">
                        <img
                            src={logoImage}
                            alt="Kembar Bersaudara Group Indonesia"
                            className="h-12 w-auto mx-auto"
                        />
                    </div>

                    <div className="text-center mb-12">
                        <h1 className="text-2xl font-bold mb-5">
                            SELAMAT DATANG
                        </h1>
                        <h1 className="text-2xl font-bold mb-1">
                            FORMULIR KERJA SAMA AGEN
                        </h1>
                        <h1 className="text-2xl font-bold">TELUR PUYUH</h1>
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={handleButtonClick}
                            className="px-12 py-2 bg-[#8B4513] text-white rounded hover:bg-[#723A0F] transition-colors"
                        >
                            LANJUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;
