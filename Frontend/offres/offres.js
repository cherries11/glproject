import React, { useState } from "react";
import './offres.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Navigation1 from "../navigation/navigation1";
import Footer from "../footer/footer";
import image from "../rightsection/Magasin.jpg";
import data from "../data/data";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";


function Offres() {
// To control service selection visibilit
  const [selectedCategory, setSelectedCategory] = useState("coiffure");
  const [selectedSubService, setSelectedSubService] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCategory, setVisibleCategory] = useState(null);
  const [selectedWorkers, setSelectedWorkers] = useState([]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar'; // Check if the language is Arabic
  


  
  const handleWorkerSelection = (worker) => {
    console.log("Worker selected:", worker);
  
    const newSelectedWorker = {
      workerName: worker.workerName,
      service: worker.service,
      price: worker.price,
      workerImage: worker.workerImage,
    };
  
    // Update the state first
    setSelectedWorkers((prev) => {
      const updatedWorkers = [...prev, newSelectedWorker];
  
      // Navigate with the updated workers
      navigate('/book', { state: { selectedWorkers: updatedWorkers } });
  
      return updatedWorkers;
    });
  };
  


  const getFilteredWorkers = () => {
    if (selectedSubService) {
      return data[selectedCategory].subServices[selectedSubService] || [];
    }
    return Object.values(data[selectedCategory].subServices).flat();
  };

  const filteredData = getFilteredWorkers().filter((worker) =>
    worker.service.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const toggleCategoryVisibility = (category) => {
    setVisibleCategory(visibleCategory === category ? null : category);
  };
 
  const handleSubServiceClick = (subService) => {
    setSelectedSubService(selectedSubService === subService ? null : subService);
  };


 

return (
  <div className="main-container">
      <Navigation1 />
  
      <div className="content-container">
      <div className="services-section">
        <div className="popular-services">
          {/* If no services are selected */}
          {selectedWorkers.length === 0 && (
            <>
              <h2 className="text-xl mt-16 text-start font-bold mb-6"> {t("Popular Services")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredData.map((worker, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white border border-gray-200 rounded-lg  transition-transform transform hover:scale-105"
                  >
                    <h3 className="text-lg text-start font-semibold text-black">{t(`${worker.service}`)}</h3>
                    <p className="text-base text-start font-semibold text-gray-900 mt-2">
                      avec: {worker.workerName}
                    </p>
                    <p className="text-base text-start font-semibold text-gray-900 mt-2">
                      {worker.price}
                    </p>
                    <button
                      className={`mt-4 px-4 py-2 rounded text-white ${
                        selectedWorkers.some((w) => w.workerName === worker.workerName)
                          ? "bg-gold hover:bg-yellow-500"
                          : "bg-new hover:bg-hover"
                      } `}
                      onClick={() => handleWorkerSelection(worker)}
                    >
                      {selectedWorkers.some((w) => w.workerName === worker.workerName)
                        ? "Selected"
                        : "Select"}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
  
          {/* Search Input Section */}
          {selectedWorkers.length === 0 && (
            <div className="mt-8">
              <h2 className="text-xl text-start font-bold mb-4"> {t("Select a Service")}</h2>
              <div className="relative w-full mb-6">
                <i className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 fas fa-search"></i>
                <input
                  type="text"
                  placeholder={t("Search for a service...")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-new"
                />
              </div>
            </div>
          )}
  
          {/* Service and Worker Selection Section */}
          {selectedWorkers.length === 0 && (
            <div className="flex flex-col md:flex-row gap-6 mb-44">
              {/* Category Selection */}
              <div className="w-full md:w-1/4 bg-white border border-gray-200  ">
                {Object.keys(data).map((category) => (
                  <div key={category} className="border-b">
                    <button
                      onClick={() => {
                        setSelectedCategory(category);
                        setSelectedSubService(null);
                        toggleCategoryVisibility(category);
                      }}
                      className={`w-full text-left px-6 py-8 ${
                        selectedCategory === category ? "bg-new text-white" : "bg-white text-black"
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                      <FontAwesomeIcon
                        icon={visibleCategory === category ? faChevronUp : faChevronDown}
                        className="ml-4"
                      />
                    </button>
                    {visibleCategory === category && (
                      <div>
                        {Object.keys(data[category].subServices).map((subService, index) => (
                          <button
                            key={index}
                            className={`w-full text-left px-6 py-6 border-t border-border ${
                              selectedSubService === subService ? "font-bold text-hover" : "text-black"
                            }`}
                            onClick={() => handleSubServiceClick(subService)}
                          >
                            {subService}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
  
              {/* Worker Selection */}
              <div className="flex-1 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((worker, index) => (
                  <div
                    key={index}
                    className="p-3 bg-white border border-border transition-transform transform hover:scale-105"
                  >
                   
                   <h3 className="text-lg font-semibold mb-4">{worker.service}</h3>
  
  {/* Flex Container for Image and Content */}
  <div className="flex items-center">
    {/* Image on the Left */}
    <img
      src={worker.workerImage}
      alt={worker.workerName}
      className="w-24 h-24 rounded-full border border-border mr-2"
    />
    
    {/* Text and Input on the Right */}
    <div className="flex flex-col">
      <p className="text-black font-medium">{worker.workerName}</p>
      <p className="text-red-700 mt-1">{worker.price}</p>
      <Link to="/book" state={{ selectedWorkers }} className="mt-4">
        <input
          type="checkbox"
          className="w-5 h-5"
          onChange={() => handleWorkerSelection(worker)}
          checked={selectedWorkers.some((w) => w.workerName === worker.workerName)}
        />
      </Link>
    </div>
  </div>

                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
  
        {/* Right Section (Salon Details) */}
        <div className="w-full md:w-1/4 bg-white border-border border mb-10  p-6 mt-16">
          <img src={image} alt="Salon" className="mb-4 rounded-md shadow" />
          <h2 className="text-xl font-bold text-black mb-4">{t("DZ BEAUTY")}</h2>
          <p className="font-semibold text-gray-800">{t("LOCATION")}</p>
          <p className="text-gray-700 mb-4">{t("First Floor, Next to LETO Cafe, Dubai Hills Mall")}</p>
          <p className="font-semibold text-gray-800">{t("PHONE")}</p>
          <p className="text-gray-700 mb-4">05 59 62 22 05</p>
          <p className="font-semibold text-gray-800">{t("BEAUTY LOUNGE HOURS")}</p>
          <div className="space-y-2">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
              (day) => (
                <p key={day} className="text-gray-700">
                  {day}: {t("10:00 am - 10:00 pm")}
                </p>
              )
            )}
          </div>
          <div className="mt-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=..."
              width="100%"
              height="300"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map of DZ BEAUTY"
              className="rounded-md"
            ></iframe>
          </div>
        </div>
      </div>
      </div>
  
      <Footer className="mt-8" />
    </div>
  );}export default Offres;  
