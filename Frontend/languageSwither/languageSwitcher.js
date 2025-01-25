import React from "react";
import { useTranslation } from "react-i18next";
import "./languageSwitcher.css";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <button onClick={() => changeLanguage("ar")} className="lang-button text-white">
        <i className="fa fa-globe text-white"></i> العربية
      </button>
      <button onClick={() => changeLanguage("en")} className="lang-button text-white">
        <i className="fa fa-globe text-white " ></i> Francais
      </button>
    </div>
  );
}

export default LanguageSwitcher;
