import { useTranslation } from "react-i18next";
import GuestLayouts from "../../layouts/GuestLayouts";
import { useQuery } from "@tanstack/react-query";
import { getContactFrontpage } from "../../services/contact-frontpage.service";

const Kontak = () => {
    const { t } = useTranslation();

    const {
        data: contactData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["contactFrontpage"],
        queryFn: () => getContactFrontpage(),
        staleTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
    });

    return (
        <GuestLayouts pageTitle={t("Contact")}>
            {/* HERO */}
            <section className="relative overflow-hidden bg-gradient-to-r from-[#000080] via-[#1f3e8f] to-[#000080] py-20">
                <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-400/20 blur-3xl rounded-full" />
                <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-400/20 blur-3xl rounded-full" />

                <div className="relative max-w-6xl mx-auto text-center px-4">
                    <span className="inline-flex items-center px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs tracking-[0.35em] uppercase">
                        Contact Us
                    </span>

                    <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-white">
                        {t("Contact")}
                    </h1>

                    <p className="mt-4 text-white/80 max-w-2xl mx-auto">
                        Contact us for product information, partnership
                        opportunities, or other needs
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <section className="bg-gradient-to-b from-slate-50 to-white py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* MAP */}
                        <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(15,23,42,0.15)] bg-white border border-slate-200">
                            {isLoading ? (
                                <div className="h-[420px] bg-slate-100 animate-pulse" />
                            ) : isError ? (
                                <div className="h-[420px] flex items-center justify-center text-gray-500">
                                    Failed to load map
                                </div>
                            ) : contactData?.url_map ? (
                                String(contactData.url_map).includes(
                                    "<iframe",
                                ) ? (
                                    <div
                                        className="w-full h-[420px]"
                                        dangerouslySetInnerHTML={{
                                            __html: contactData.url_map.replace(
                                                "<iframe",
                                                '<iframe class="w-full h-[420px]"',
                                            ),
                                        }}
                                    />
                                ) : (
                                    <iframe
                                        src={contactData.url_map}
                                        className="w-full h-[420px]"
                                        loading="lazy"
                                        allowFullScreen
                                    />
                                )
                            ) : (
                                <div className="h-[420px] flex items-center justify-center text-gray-500">
                                    Map not available
                                </div>
                            )}
                        </div>

                        {/* INFO CARDS */}
                        <div className="flex flex-col gap-6">
                            {/* ALAMAT */}
                            <div className="group rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-2 h-6 bg-[#000080] rounded-full" />
                                    <h3 className="font-bold text-lg text-slate-900">
                                        Address
                                    </h3>
                                </div>
                                <p className="text-slate-600 leading-relaxed">
                                    {contactData?.alamat || "-"}
                                </p>
                            </div>

                            {/* EMAIL */}
                            <div className="group rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-2 h-6 bg-[#000080] rounded-full" />
                                    <h3 className="font-bold text-lg text-slate-900">
                                        Email
                                    </h3>
                                </div>
                                <p className="text-slate-600">
                                    {contactData?.email || "-"}
                                </p>
                            </div>

                            {/* TELEPON */}
                            <div className="group rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-2 h-6 bg-[#000080] rounded-full" />
                                    <h3 className="font-bold text-lg text-slate-900">
                                        Phone
                                    </h3>
                                </div>
                                <p className="text-slate-600">
                                    {contactData?.no_phone || "-"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayouts>
    );
};

export default Kontak;
