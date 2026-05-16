import GuestLayouts from "../../layouts/GuestLayouts";
import { useQuery } from "@tanstack/react-query";
import { getAbouts } from "../../services/about.service";
import PartnerCarousel from "../../components/PartnerCarousel";

const About = () => {
    const {
        data: aboutData,
        isLoading: loadingAbout,
        isError: errorAbout,
    } = useQuery({
        queryKey: ["abouts"],
        queryFn: () => getAbouts(),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });

    const aboutTitle = aboutData?.judul || "Profil Perusahaan";
    const aboutDescription =
        aboutData?.deskripsi ||
        "PT. Kembar Bersaudara Group is a distributor and supplier of industrial agricultural machinery, household appliances, wholesalers of computers and computer equipment, and more.";

    return (
        <GuestLayouts pageTitle="Profil Perusahaan">
            {/* HERO / PROFILE INTRO */}
            <section className="relative overflow-hidden bg-gradient-to-r from-[#000080] via-[#1f3e8f] to-[#000080] py-20">
                <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-400/20 blur-3xl rounded-full" />
                <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-400/20 blur-3xl rounded-full" />

                <div className="relative max-w-6xl mx-auto text-center px-4">
                    <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-white">
                        Profil Perusahaan
                    </h1>
                </div>
            </section>

            {/* PROFIL PERUSAHAAN DETAIL */}
            <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative rounded-[36px] bg-white/90 backdrop-blur-xl border border-slate-200 shadow-[0_30px_90px_rgba(15,23,42,0.08)] p-8 sm:p-12 lg:p-16 overflow-hidden">
                        {/* decorative blur */}
                        <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-100 blur-3xl rounded-full" />
                        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-100 blur-3xl rounded-full" />

                        <div className="relative max-w-5xl mx-auto">
                            {/* Accent line */}
                            <div className="h-1 w-20 bg-[#000080] rounded-full mb-6" />

                            {/* Title */}
                            <p className="text-sm uppercase tracking-[0.35em] text-[#000080] font-semibold mb-6">
                                {aboutTitle}
                            </p>

                            {/* Content */}
                            {loadingAbout ? (
                                <div className="space-y-4 animate-pulse">
                                    {[...Array(6)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="h-4 bg-slate-200 rounded-full w-full"
                                        />
                                    ))}
                                </div>
                            ) : errorAbout ? (
                                <div className="rounded-2xl bg-red-50 border border-red-100 p-6 text-red-600 text-center">
                                    Gagal memuat deskripsi perusahaan.
                                </div>
                            ) : (
                                <div
                                    className="prose prose-slate max-w-none text-slate-700 leading-relaxed prose-p:leading-8 prose-headings:text-slate-900"
                                    dangerouslySetInnerHTML={{
                                        __html: aboutDescription,
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Partner Carousel */}
            <PartnerCarousel />
        </GuestLayouts>
    );
};

export default About;
