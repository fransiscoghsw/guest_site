import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";

import GuestLayouts from "../../layouts/GuestLayouts";
import ProductCard from "../../components/guest/ProductCard";
import LoadingPage from "../../components/LoadingPage";
import { getAllProduct } from "../../services/product.service";

const Produk = () => {
    const [search, setSearch] = useState("");

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

    // filter products
    const filteredProducts = Array.isArray(products)
        ? products.filter((product) =>
              product.name?.toLowerCase().includes(search.toLowerCase()),
          )
        : [];

    return (
        <GuestLayouts pageTitle="Produk">
            {/* HERO */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#000080] via-[#0a1a6b] to-[#102a8a] py-20 px-4">
                {/* background glow */}
                <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-400/20 blur-3xl rounded-full" />
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-cyan-300/20 blur-3xl rounded-full" />

                <div className="relative max-w-6xl mx-auto text-center">
                    {/* badge */}
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-semibold tracking-[0.3em] uppercase">
                        Product Catalog
                    </div>

                    {/* title */}
                    <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                        Our Products
                    </h1>

                    {/* subtitle */}
                    <p className="mt-5 text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                        Find a variety of high-quality products with modern and
                        hygienic standards for your needs
                    </p>

                    {/* divider accent */}
                    <div className="mt-8 flex justify-center">
                        <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full" />
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* SEARCH */}
                <div className="mb-10 flex justify-center">
                    <div className="relative w-full max-w-xl">
                        <Search
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search product..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-12 pr-4 text-gray-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        />
                    </div>
                </div>

                {error ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
                        An error occurred while loading products. Please try
                        again.
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center text-gray-700">
                        No products found.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </GuestLayouts>
    );
};

export default Produk;
