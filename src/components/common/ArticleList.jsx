import { useState, useEffect } from "react";
import Alert from "./Alert";
import ArticleItem from "./ArticleItem";

const ArticleList = (props) => {
    const { articles, openModal } = props;
    const [isMobile, setIsMobile] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const nextSlide = () =>
        articles?.length &&
        setCurrentSlide((prev) => (prev + 1) % articles.length);
    const prevSlide = () =>
        articles?.length &&
        setCurrentSlide(
            (prev) => (prev - 1 + articles.length) % articles.length,
        );

    // Fungsi untuk parsing tanggal yang lebih robust
    const parseDate = (dateString) => {
        if (!dateString) return new Date(0);

        let date = new Date(dateString);

        if (isNaN(date.getTime())) {
            const dateMatch = dateString.match(/(\d{4})-(\d{2})-(\d{2})/);
            if (dateMatch) {
                date = new Date(dateMatch[0]);
            } else {
                date = new Date(Date.parse(dateString));
            }
        }

        return isNaN(date.getTime()) ? new Date(0) : date;
    };

    // Sort articles by date (newest first)
    const sortedArticles = Array.isArray(articles)
        ? [...articles].sort((a, b) => {
              const dateA = parseDate(a.tanggal);
              const dateB = parseDate(b.tanggal);
              return dateB.getTime() - dateA.getTime();
          })
        : [];

    if (!Array.isArray(articles) || articles.length === 0) {
        return (
            <div className="flex justify-center">
                <Alert
                    message={"Tidak ada artikel yang tersedia."}
                    type={"info"}
                />
            </div>
        );
    }

    if (isMobile) {
        return (
            <div className="relative w-full">
                {/* Slider container */}
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-300"
                        style={{
                            transform: `translateX(-${currentSlide * 100}%)`,
                        }}
                    >
                        {sortedArticles.map((article) => (
                            <div
                                key={article.id}
                                className="w-full flex-shrink-0 px-2 h-[250px] sm:h-[220px] md:h-[240px] lg:h-[260px] xl:h-[280px]"
                            >
                                <ArticleItem
                                    {...article}
                                    openModal={openModal}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex justify-between items-center mt-5 px-1">
                    <button
                        onClick={prevSlide}
                        className="bg-[#000080] hover:bg-[#7a2c21] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-colors duration-200"
                        aria-label="Previous article"
                    >
                        &larr;
                    </button>

                    {/* Indicator dots */}
                    <div className="flex space-x-2 items-center">
                        {sortedArticles.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-2.5 rounded-full transition-all duration-300 ${
                                    currentSlide === index
                                        ? "w-6 bg-[#000080]"
                                        : "w-2.5 bg-[#000080]/25"
                                }`}
                                aria-label={`Go to article ${index + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={nextSlide}
                        className="bg-[#000080] hover:bg-[#7a2c21] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-colors duration-200"
                        aria-label="Next article"
                    >
                        &rarr;
                    </button>
                </div>
            </div>
        );
    }

    // Desktop grid view with fixed height
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 xl:gap-x-14 xl:gap-y-10">
            {sortedArticles.map((article) => (
                <div
                    key={article.id}
                    className="h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] xl:h-[240px]"
                >
                    <ArticleItem {...article} openModal={openModal} />
                </div>
            ))}
        </div>
    );
};

export default ArticleList;
