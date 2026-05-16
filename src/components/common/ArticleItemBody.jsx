import { formatDate } from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const ArticleItemBody = (props) => {
    const { slug, judul, penulis, tanggal, isMobile } = props;

    const navigate = useNavigate();

    const handleTitleClick = () => {
        window.scrollTo(0, 0);
        navigate(`/artikel/${slug}`);
    };

    return (
        <div className="flex flex-col w-full gap-1 h-full">
            {/* Tanggal */}
            <p className="font-light text-[16px] ">{formatDate(tanggal)}</p>

            {/* Judul (plain text) */}
            <h3
                className={`${isMobile ? "text-lg" : "text-[24px]"} font-medium tracking-tight text-left leading-snug`}
            >
                {judul}
            </h3>

            {/* Selengkapnya button - fixed to bottom of card */}
            <button
                onClick={handleTitleClick}
                className="flex items-center gap-2 text-[#000080] hover:text-[#3E3232] bg-transparent border-0 p-0 mt-auto font-medium self-start"
                aria-label="Selengkapnya"
            >
                <span>Selengkapnya</span>
                <FiArrowRight size={16} />
            </button>
        </div>
    );
};

export default ArticleItemBody;
