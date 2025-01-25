import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import arabic from './locals/ar.json'; // Ensure the path is correct

// Initialize i18n
i18n.use(initReactI18next).init({
  resources: {
    ar: {
      translation: arabic, // Use the Arabic translation
    },
  },
  lng: "fr", // Set default language (French in this case)
  fallbackLng: "fr", // Fallback language
  interpolation: {
    escapeValue: false, // React already escapes variables
  },
});

// Define t
export default i18n;
