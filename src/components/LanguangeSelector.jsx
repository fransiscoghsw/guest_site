import React from "react";
import { useTranslation } from "react-i18next";

const languages = [
  {
    code: "id",
    lang: "ID",  // Disingkat agar lebih compact
  },
  {
    code: "en",
    lang: "EN",  // Disingkat agar lebih compact
  },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-1">
      {languages.map((lng) => (
        <button
          key={lng.code}
          onClick={() => changeLanguage(lng.code)}
          className={`
            px-2.5 py-1.5 
            rounded-lg 
            text-sm 
            font-medium 
            transition-all 
            duration-200
            ${
              i18n.language === lng.code
                ? "bg-black text-white shadow-sm"
                : "text-gray-600 hover:text-black hover:bg-gray-100"
            }
          `}
        >
          {lng.lang}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;