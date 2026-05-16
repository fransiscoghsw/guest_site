import ArticleItemBody from "./ArticleItemBody";
import ArticleItemImage from "./ArticleItemImage";
import { useState, useEffect } from "react";

const ArticleItemBorder = (props) => {
    const {
        id,
        slug,
        judul,
        deskripsi,
        penulis,
        gambar,
        tanggal,
        jumlah_penglihat,
        Tags,
        openModal,
    } = props;

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 480);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="flex gap-5 p-3 items-stretch h-full border border-gray-200 rounded-[16px] shadow">
            {/* Image: ~40% width */}
            <div className="w-[40%] shrink-0">
                <ArticleItemImage
                    gambar={gambar}
                    slug={slug}
                    isMobile={isMobile}
                />
            </div>

            {/* Body content: ~65% width */}
            <div className="flex-1 min-w-0 overflow-hidden">
                <ArticleItemBody
                    id={id}
                    slug={slug}
                    judul={judul}
                    deskripsi={deskripsi}
                    penulis={penulis}
                    gambar={gambar}
                    tanggal={tanggal}
                    jumlah_penglihat={jumlah_penglihat}
                    Tags={Tags}
                    openModal={openModal}
                    isMobile={isMobile}
                />
            </div>
        </div>
    );
};

export default ArticleItemBorder;
