import { useState, useEffect } from "react";
import Alert from "./Alert";
import ArticleItemBorder from "./ArticleItemBorder";

const ArticleListMain = (props) => {
    const { articles } = props;

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

    return (
        <>
            {sortedArticles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-2 xl:gap-x-4 xl:gap-y-4">
                    {sortedArticles.map((article) => (
                        <ArticleItemBorder key={article.id} {...article} />
                    ))}
                </div>
            ) : (
                <div className="flex justify-center">
                    <Alert
                        message={"Tidak ada artikel yang tersedia."}
                        type={"info"}
                    />
                </div>
            )}
        </>
    );
};

export default ArticleListMain;
