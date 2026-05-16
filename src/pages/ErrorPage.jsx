import Footer from "../layouts/GuestLayouts/Footer";
import Image404 from "../assets/images/404-not-found.svg";

const ErrorPage = () => {
    return (
        <>
            <main className="min-h-screen bg-[#FAEFE4] py-12 lg:py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-col items-center">
                        <div className="text-center text-black space-y-2 mb-4">
                            <h2 className="text-3xl font-semibold">
                                Opss... gak ketemu nih🔎
                            </h2>
                            <p>
                                Aku sudah coba cari kemana-mana, tapi sepertinya
                                halaman yang kamu tuju tidak ada.
                            </p>
                        </div>
                        <div className="w-full max-w-xl p-5 rounded-2xl bg-white shadow-lg">
                            <img
                                src={Image404}
                                alt="404 not found"
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ErrorPage;
