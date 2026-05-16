import { useState } from "react";
import GuestLayouts from "../../../layouts/GuestLayouts";
import BgDecor from "../../../assets/images/BG About.png";
import MapHeroImg from "../../../assets/images/Map Hero.png";

import cikembarImage1 from "../../../assets/images/Peternakan Cikembar/Cikembar 1.png";
import cikembarImage2 from "../../../assets/images/Peternakan Cikembar/Cikembar 2.png";
import cijerukImage1 from "../../../assets/images/Peternakan Cijeruk/Cijeruk Farm 7.jpeg";
import cijerukImage2 from "../../../assets/images/Peternakan Cijeruk/Cijeruk Farm 1.jpeg";
import cijerukImage3 from "../../../assets/images/Peternakan Cijeruk/Cijeruk Farm 2.jpeg";
import cijerukImage4 from "../../../assets/images/Peternakan Cijeruk/Cijeruk Farm 5.jpeg";
import cijerukImage5 from "../../../assets/images/Peternakan Cijeruk/Cijeruk Farm 6.jpeg";
import indramayuImage1 from "../../../assets/images/Peternakan Indramayu/Indramayu Farm 1.jpeg";
import indramayuImage2 from "../../../assets/images/Peternakan Indramayu/Indramayu Farm 5.jpeg";
import indramayuImage3 from "../../../assets/images/Peternakan Indramayu/Indramayu Farm 4.jpeg";
import indramayuImage4 from "../../../assets/images/Peternakan Indramayu/Indramayu Farm 2.jpeg";
import indramayuImage5 from "../../../assets/images/Peternakan Indramayu/Indramayu Farm 3.jpeg";

const locations = [
    {
        id: 1,
        name: "Peternakan Cijeruk, Bogor, Jawa Barat",
        luasLahan: "2 hektar",
        jumlahKandang: "10 kandang",
        totalKapasitas: "± 135.000 ekor",
        alamat: "Jl. Masjid 1 No.24 Sudimara Selatan Ciledug, Tangerang",
        images: [
            { src: cijerukImage1 },
            { src: cijerukImage2 },
            { src: cijerukImage3 },
            { src: cijerukImage4 },
            { src: cijerukImage5 },
        ],
        inProgress: false,
        mapEmbed:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d851.9609117444376!2d106.7778584527106!3d-6.665152851594796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69cf03f2e70d4f%3A0xca1a6f86a5ce87ca!2s8QMH%2BQ5V%2C%20Jl.%20Cijulang%2C%20Sukaharja%2C%20Kec.%20Cijeruk%2C%20Kabupaten%20Bogor%2C%20Jawa%20Barat%2016740!5e0!3m2!1sid!2sid!4v1740040906081!5m2!1sid!2sid",
    },
    {
        id: 2,
        name: "Peternakan Cikembar, Sukabumi, Jawa Barat",
        luasLahan: "1,5 hektar",
        jumlahKandang: "4 kandang",
        totalKapasitas: "± 50.000 ekor",
        alamat: "Desa Cilangkap, Kecamatan Cikembar, Kabupaten Sukabumi, Jawa Barat, 43157, Indonesia",
        images: [{ src: cikembarImage1 }, { src: cikembarImage2 }],
        inProgress: false,
        mapEmbed:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.416010549809!2d106.7878496751018!3d-6.960154193040282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e683a7466b95bfd%3A0xfa59aaabf74caf24!2sP4S!5e0!3m2!1sid!2sid!4v1740053341388!5m2!1sid!2sid",
    },
    {
        id: 3,
        name: "Peternakan Bangodua, Indramayu, Jawa Barat",
        luasLahan: "20 hektar",
        jumlahKandang: "120 kandang",
        totalKapasitas: "± 300.000 ekor",
        alamat: "Desa Rancasari, Bangodua, Kabupaten Indramayu, Jawa Barat, 45272, Indonesia",
        images: [
            { src: indramayuImage1 },
            { src: indramayuImage2 },
            { src: indramayuImage3 },
            { src: indramayuImage4, pos: "50% center" },
            { src: indramayuImage5, pos: "80% center" },
        ],
        inProgress: true,
        mapEmbed:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63445.76544057917!2d108.25172829828792!3d-6.347364974964256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6eb951a07812b7%3A0x9f2e03cfbf1b0b2f!2sIndramayu%2C%20Kec.%20Indramayu%2C%20Kabupaten%20Indramayu%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1740055373185!5m2!1sid!2sid",
    },
];

const FarmLocation = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const openModal = (location) => {
        setSelectedLocation(location);
        setActiveImageIndex(0);
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setSelectedLocation(null);
        document.body.style.overflow = "auto";
    };

    const nextImage = () => {
        if (selectedLocation)
            setActiveImageIndex((i) =>
                i === selectedLocation.images.length - 1 ? 0 : i + 1,
            );
    };

    const prevImage = () => {
        if (selectedLocation)
            setActiveImageIndex((i) =>
                i === 0 ? selectedLocation.images.length - 1 : i - 1,
            );
    };

    return (
        <GuestLayouts pageTitle="Lokasi Peternakan">
            {/* ── HERO: 2 KOLOM — peta kiri, teks merah kanan ─────────────────── */}
            <section className="grid grid-cols-1 lg:grid-cols-2 h-[65vh] md:h-[65vh]">
                {/* Kiri — gambar peta */}
                <div className="relative overflow-hidden">
                    <img
                        src={MapHeroImg}
                        alt="Peta Jaringan Peternakan Kembar Bersaudara Group"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ objectPosition: "5% center" }}
                    />
                </div>

                {/* Kanan — teks di atas background merah */}
                <div className="bg-[#000080] flex flex-col justify-center px-10 lg:px-16 py-14">
                    <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-4">
                        Jaringan
                        <br />
                        Peternakan
                        <br />
                        Kembar Bersaudara Group
                    </h1>
                    <p className="text-white text-lg lg:text-xl opacity-90 font-medium">
                        Bogor • Sukabumi • Indramayu
                    </p>
                </div>
            </section>

            {/* ── DETAIL LOKASI ─────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden py-16 bg-[#F5F5F5]">
                {/* Dekorasi background */}
                <img
                    src={BgDecor}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                />

                <div className="relative z-10 max-w-5xl mx-auto px-6">
                    <h2 className="text-2xl lg:text-3xl font-bold text-center mb-10">
                        Detail Lokasi Peternakan
                    </h2>

                    <div className="space-y-6">
                        {locations.map((loc) => (
                            <div
                                key={loc.id}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row cursor-pointer hover:shadow-md transition-shadow duration-200"
                                onClick={() => openModal(loc)}
                            >
                                {/* Gambar kiri */}
                                <div className="relative flex-shrink-0 w-full md:w-64 lg:w-72">
                                    <img
                                        src={loc.images[0].src}
                                        alt={loc.name}
                                        className="w-full h-full object-cover"
                                        style={{
                                            maxHeight: "260px",
                                            minHeight: "200px",
                                            objectPosition:
                                                loc.images[0].pos || "center",
                                        }}
                                    />
                                    {loc.inProgress && (
                                        <div className="absolute top-3 left-3 bg-[#F8AD44] text-black text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                                            🚧 Dalam pembangunan
                                        </div>
                                    )}
                                </div>

                                {/* Info kanan */}
                                <div className="p-6 flex flex-col justify-center flex-1">
                                    <h3 className="text-lg lg:text-xl font-bold mb-4 text-gray-900">
                                        {loc.name}
                                    </h3>

                                    <table className="text-sm text-gray-700 w-full">
                                        <tbody>
                                            {[
                                                {
                                                    label: "Luas Lahan",
                                                    value: loc.luasLahan,
                                                },
                                                {
                                                    label: "Jumlah Kandang",
                                                    value: loc.jumlahKandang,
                                                },
                                                {
                                                    label: "Total kapasitas",
                                                    value: loc.totalKapasitas,
                                                },
                                                {
                                                    label: "Alamat",
                                                    value: loc.alamat,
                                                },
                                            ].map((row) => (
                                                <tr
                                                    key={row.label}
                                                    className="align-top"
                                                >
                                                    <td className="font-medium w-40 py-1 pr-2 whitespace-nowrap">
                                                        {row.label}
                                                    </td>
                                                    <td className="py-1 pr-2 text-gray-500 w-4">
                                                        :
                                                    </td>
                                                    <td className="py-1 text-gray-700">
                                                        {row.value}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── MODAL DETAIL ──────────────────────────────────────────────────── */}
            {selectedLocation && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Tombol tutup */}
                        <div className="flex justify-end p-4">
                            <button
                                onClick={closeModal}
                                className="bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                            >
                                <svg
                                    className="h-4 w-4"
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

                        <div className="px-8 pb-8">
                            {/* Gambar utama */}
                            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-4">
                                {selectedLocation.inProgress && (
                                    <div className="absolute top-3 left-3 z-10 bg-[#F8AD44] text-black text-xs font-semibold px-3 py-1 rounded-full">
                                        🚧 Dalam pembangunan
                                    </div>
                                )}
                                <img
                                    src={
                                        selectedLocation.images[
                                            activeImageIndex
                                        ].src
                                    }
                                    alt={`${selectedLocation.name} ${activeImageIndex + 1}`}
                                    className="w-full h-full object-cover"
                                    style={{
                                        objectPosition:
                                            selectedLocation.images[
                                                activeImageIndex
                                            ].pos || "center",
                                    }}
                                />
                                {selectedLocation.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                prevImage();
                                            }}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 transition-all"
                                        >
                                            <svg
                                                className="h-5 w-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 19l-7-7 7-7"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                nextImage();
                                            }}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 transition-all"
                                        >
                                            <svg
                                                className="h-5 w-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </button>
                                        <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded-lg">
                                            {activeImageIndex + 1} /{" "}
                                            {selectedLocation.images.length}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Thumbnail */}
                            {selectedLocation.images.length > 1 && (
                                <div className="flex gap-2 mb-6">
                                    {selectedLocation.images.map((img, i) => (
                                        <div
                                            key={i}
                                            onClick={() =>
                                                setActiveImageIndex(i)
                                            }
                                            className={`h-16 flex-1 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                                                activeImageIndex === i
                                                    ? "border-[#000080]"
                                                    : "border-transparent opacity-60"
                                            }`}
                                        >
                                            <img
                                                src={img.src}
                                                alt={`Thumbnail ${i + 1}`}
                                                className="w-full h-full object-cover"
                                                style={{
                                                    objectPosition:
                                                        img.pos || "center",
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Info */}
                            <div className="bg-[#000080] text-white px-6 py-4 rounded-xl mb-6">
                                <h2 className="text-xl font-bold mb-3">
                                    {selectedLocation.name}
                                </h2>
                                <table className="text-sm w-full">
                                    <tbody>
                                        {[
                                            {
                                                label: "Luas Lahan",
                                                value: selectedLocation.luasLahan,
                                            },
                                            {
                                                label: "Jumlah Kandang",
                                                value: selectedLocation.jumlahKandang,
                                            },
                                            {
                                                label: "Total Kapasitas",
                                                value: selectedLocation.totalKapasitas,
                                            },
                                            {
                                                label: "Alamat",
                                                value: selectedLocation.alamat,
                                            },
                                        ].map((row) => (
                                            <tr
                                                key={row.label}
                                                className="align-top"
                                            >
                                                <td className="font-medium w-36 py-0.5 pr-2 opacity-80 whitespace-nowrap">
                                                    {row.label}
                                                </td>
                                                <td className="py-0.5 pr-2 opacity-80">
                                                    :
                                                </td>
                                                <td className="py-0.5">
                                                    {row.value}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Peta */}
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                Lokasi di Peta
                            </h3>
                            <div className="w-full h-72 rounded-xl overflow-hidden">
                                <iframe
                                    src={selectedLocation.mapEmbed}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title={`Peta ${selectedLocation.name}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </GuestLayouts>
    );
};

export default FarmLocation;
