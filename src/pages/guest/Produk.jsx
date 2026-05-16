import { useQuery } from "@tanstack/react-query";
import GuestLayouts from "../../layouts/GuestLayouts";
import ProductCard from "../../components/guest/ProductCard";
import LoadingPage from "../../components/LoadingPage";
import { getAllProduct } from "../../services/product.service";

const Produk = () => {
    const {
        data: products,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["products", "id"],
        queryFn: () => getAllProduct("id"),
        staleTime: 1000 * 60 * 5,
    });

    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <GuestLayouts pageTitle="Produk">
            <section className="relative overflow-hidden bg-gradient-to-br from-[#000080] via-[#0a1a6b] to-[#102a8a] py-20 px-4">
                {/* background glow */}
                <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-400/20 blur-3xl rounded-full" />
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-cyan-300/20 blur-3xl rounded-full" />

                <div className="relative max-w-6xl mx-auto text-center">
                    {/* badge */}
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-semibold tracking-[0.3em] uppercase">
                        Katalog Produk
                    </div>

                    {/* title */}
                    <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                        Produk Kami
                    </h1>

                    {/* subtitle */}
                    <p className="mt-5 text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                        Temukan berbagai produk berkualitas dengan standar
                        terbaik untuk kebutuhan Anda
                    </p>

                    {/* divider accent */}
                    <div className="mt-8 flex justify-center">
                        <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full" />
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {error ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
                        Terjadi kesalahan saat memuat produk. Silakan coba lagi.
                    </div>
                ) : !Array.isArray(products) || products.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center text-gray-700">
                        Produk tidak tersedia saat ini.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </GuestLayouts>
    );
};

export default Produk;
