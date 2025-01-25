import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from "react-router-dom";
import useSectionNavigation from '../handlenavigatetosection';
import "./navigation1.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from './Discover_Design_Ideas___Graphic_Design_Inspiration___99designs-removebg-preview_1-removebg-preview.png';
import { useTranslation } from "react-i18next";
import LanguageSwitcher from '../languageSwither/languageSwitcher';

function Navigation1() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigateToSection = useSectionNavigation();
  const { t,i18n } = useTranslation();
  const isArabic = i18n.language === 'ar'; // Check if the language is Arabic
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`navbar ${isSticky ? "sticky top-0 z-10" : ""}`}>
      <nav className="bg-transparent shadow-md ">
        <div className="w-full px-6 py-2 bg-new">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center">
              <img
                src={logo}
                alt="Logo"
                className="w-9 h-9  mr-0 sm:w-12  sm:h-12 md:w-19 md:h-18 lg:w-19 lg:h-18 bg-transparent"

              />
              <span className="ml-0 text-lg font-bold text-white sm:text-xl md:text-2xl">Z-Beauty</span>
            </div>
            <div className="flex items-center space-x-4">
  <LanguageSwitcher />
</div>


            {/* Hamburger Menu Icon */}
            <button
              className="text-white text-2xl top-4 right-4 z-50 lg:hidden "
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className='text-white'/>
            </button>

            {/* Navigation Links */}
            <ul
              className={`flex items-center text-white font-bold lg:flex ${
                isMenuOpen ? "absolute top-0 right-0 w-1/2 h-screen bg-new text-center flex-col justify-center" : "hidden lg:flex"
              }`}
            >
           
<li className="mx-4 py-2">
  <a href="#a-propos" onClick={() => navigateToSection("a-propos")} className="cursor-pointer hover:text-gray-300">
    {t("À Propos")}
  </a>
</li>
<li className="mx-4 py-2">
  <a href="#services" onClick={() => navigateToSection("services")} className="cursor-pointer hover:text-gray-300">
    {t("Services")}
  </a>
</li>
              <li className="mx-4 py-2">
                <a href="#offres" onClick={() => navigateToSection("offres")} className="cursor-pointer hover:text-gray-300">
                {t("Offres")}
                </a>
              </li>
              <li className="mx-4 py-2">
  <a href="#loyalty" onClick={() => navigateToSection("loyalty")} className="cursor-pointer hover:text-gray-300">
    {t("Loyalty")}
  </a>
</li>
              <li className="mx-4 py-2">
                <a href="#equipes" onClick={() => navigateToSection("equipes")} className="cursor-pointer hover:text-gray-300">
                  {t("Équipes")}
                </a>
              </li>
              <li className="mx-4 py-2">
                <a href="#contact" onClick={() => navigateToSection("contact")} className="cursor-pointer hover:text-gray-300">
                 {t("Contacte")}
                </a>
              </li>

              <li className="mx-4 py-2">
                <RouterLink to="/historique">
              <a href="#" className="cursor-pointer hover:text-gray-300">
                 {t("Historique")}
                </a>
                </RouterLink>
              </li>
            </ul>

            {/* Account Icon and Book Now Button */}
            <div className="flex items-center space-x-4">
              <RouterLink to="/signin">
                <FontAwesomeIcon icon={faUserCircle} className={`text-white text-2xl cursor-pointer  ${isArabic ? 'ml-4':'ml-0'}`} />
              </RouterLink>
              <RouterLink to="/offres">
              <button className={`bg-white text-black font-bold py-2 px-4 rounded-md shadow-md hover:animate-bounce`}>
               {t("BOOK NOW")}
              </button>
              </RouterLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navigation1;
