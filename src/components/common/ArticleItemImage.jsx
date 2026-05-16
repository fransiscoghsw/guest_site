import { useState, useEffect } from "react";
import { getImageArticle } from "../../services/article.service.js";
import { useNavigate } from "react-router-dom";

const ArticleItemImage = (props) => {
  const { gambar, slug, isMobile } = props;
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (gambar) {
      setImageLoading(true);
      setImageError(false);

      const imageName =
        typeof gambar === "string" ? gambar : gambar?.nama || gambar;

      if (imageName) {
        getImageArticle(imageName)
          .then(() => {
            setImageUrl(
              `${import.meta.env.VITE_API_URL}/artikel/image/${imageName}`,
            );
            setImageLoading(false);
          })
          .catch(() => {
            setImageError(true);
            setImageLoading(false);
          });
      } else {
        setImageError(true);
        setImageLoading(false);
      }
    } else {
      setImageError(true);
      setImageLoading(false);
    }
  }, [gambar]);

  const handleImageClick = () => {
    if (slug) {
      navigate(`/artikel/${slug}`);
    }
  };

  // Tinggi fixed lebih besar agar sesuai desain
  const containerClasses = isMobile
    ? "w-full h-[140px] rounded-xl overflow-hidden"
    : "w-full h-[200px] rounded-xl overflow-hidden";

  if (imageLoading) {
    return (
      <div className={containerClasses}>
        <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
          <span className="text-gray-400 text-xs">Loading...</span>
        </div>
      </div>
    );
  }

  if (imageError || !imageUrl) {
    return (
      <div className={containerClasses}>
        <div
          className="w-full h-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
          onClick={handleImageClick}
        >
          <span className="text-gray-400 text-xs text-center px-2">No Image</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${containerClasses} cursor-pointer group`}
      onClick={handleImageClick}
    >
      <img
        src={imageUrl}
        alt={
          typeof gambar === "object" && gambar?.alt
            ? gambar.alt
            : "Article image"
        }
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        onError={() => {
          setImageError(true);
          setImageUrl("");
        }}
      />
    </div>
  );
};

export default ArticleItemImage;