import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import BookingSummary from "../BookingSummary/bookingsummary";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation1 from "../navigation/navigation1";

import Footer from "../footer/footer";
import image from "../rightsection/Magasin.jpg";
import "./book.css";

function Book() {
  const [selectedCategory, setSelectedCategory] = useState("coiffure");
  const [selectedSubService, setSelectedSubService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [errorMessageLoyalty, setErrorMessageLoyalty] = useState("");
  const [errorMessageDiscount, setErrorMessageDiscount] = useState("");
  const [serviceLocation, setServiceLocation] = useState("in_salon");
  const [loyaltyPoints] = useState(10);
  const [pointsToRedeem, setPointsToRedeem] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const selectedWorkers = location.state?.selectedWorkers || []; // Retrieve selected workers from state

  const handleAddAnotherService = () => {
    navigate("/offres", {
      state: { selectedWorkers },
    });
  };

  const getDaysInMonth = (month, year) => {
    const days = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  const timeSlots = [];
  for (let hour = 10; hour < 22; hour++) {
    for (let minute = 0; minute < 60; minute += 10) {
      const formattedTime = `${hour % 12 || 12}:${minute === 0 ? "00" : minute} ${
        hour >= 12 ? "PM" : "AM"
      }`;
      timeSlots.push(formattedTime);
    }
  }

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDateSelect = (date) => {
    setSelectedDate(date.toDateString());
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const isDateDisabled = (date) => {
    return date < new Date().setHours(0, 0, 0, 0);
  };

  const handleMonthChange = (direction) => {
    const newDate = new Date(currentYear, currentMonth + direction, 1);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  };

  const renderCalendar = () => (
    <div className="mb-6 sm:mr-4 max-h-80 w-full sm:w-1/2">
      <h3 className="font-semibold mb-6 text-start text-black">Select Appointment Date</h3>
      <div className="flex justify-between items-center">
        <button onClick={() => handleMonthChange(-1)} className="font-semibold">
          {"<"}
        </button>
        <h3 className="font-semibold text-lg">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <button onClick={() => handleMonthChange(1)} className="font-semibold">
          {">"}
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center font-medium mt-3">
        {daysOfWeek.map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 mt-2">
        {daysInMonth.map((date) => (
          <button
            key={date}
            onClick={() => handleDateSelect(date)}
            disabled={isDateDisabled(date)}
            className={`p-3 rounded border cursor-pointer ${
              isDateDisabled(date)
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : selectedDate === date.toDateString()
                ? "bg-new text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {date.getDate()}
          </button>
        ))}
      </div>
    </div>
  );

  const renderTimeSlots = () => (
    <div className="ml-0 sm:ml-4 mb-6 w-full sm:w-1/2">
      <h3 className="font-semibold mb-6 text-start text-black">Select Appointment Time</h3>
      <div className="max-h-80 border overflow-y-scroll bg-white p-4">
        <span className="text-xl">{selectedDate}</span>
        {timeSlots.map((time, index) => (
          <div
            key={index}
            className="flex items-center justify-between mb-2 p-2 border-b-2 border-gray-400 border-solid"
          >
            <label
              htmlFor={`time-${index}`}
              className={`text-lg cursor-pointer ${
                selectedTime === time ? "font-bold text-new" : "text-gray-700"
              }`}
            >
              {time}
            </label>
            <input
              type="radio"
              id={`time-${index}`}
              name="time"
              value={time}
              checked={selectedTime === time}
              onChange={() => handleTimeSelect(time)}
              className="cursor-pointer custom-radio border border-[#626466] w-6 h-6 rounded-full"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="main-container">
      <Navigation1 />
      <div className="content-container">
        <div className="services-section">
          <div className="popular-services">
            <h2 className="text-xl mt-16 text-start font-bold">Selected Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {selectedWorkers.map((worker, index) => (
                <div
                  key={index}
                  className="p-4 bg-white border w-72 border-gray-300 rounded-md"
                >
                  <div className="flex items-center">
                    <img
                      src={worker.workerImage}
                      alt={worker.workerName}
                      className="w-24 h-24 text-start rounded-full mr-4"
                    />
                    <div>
                      <h3 className="text-lg text-start font-semibold text-black">
                        {worker.service}
                      </h3>
                      <p className="text-base text-start font-semibold text-gray-900 mt-2">
                        <span className="mr-2">avec:</span> {worker.workerName}
                      </p>
                      <p className="text-base font-semibold text-start text-gray-900 mt-2">
                        {worker.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedWorkers.length > 0 && selectedDate && selectedTime && (
              <button
                className="mt-2 text-white hover:bg-hover bg-new font-bold py-3 px-5 rounded-lg mb-30"
                onClick={handleAddAnotherService}
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Another Service
              </button>
            )}

            <div>
              <h2 className="text-xl text-start font-bold mt-7">Booking Details</h2>
              <div className="mt-4 flex flex-col sm:flex-row space-y-96 sm:space-y-0 sm:space-x-4">
                {renderCalendar()}
                {renderTimeSlots()}
              </div>
              {selectedDate && selectedTime && (
                <BookingSummary
                  selectedWorkers={selectedWorkers}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  serviceLocation={serviceLocation}
                  discountCode={discountCode}
                  discountAmount={discountAmount}
                  pointsToRedeem={pointsToRedeem}
                  loyaltyPoints={loyaltyPoints}
                  setServiceLocation={setServiceLocation}
                  setDiscountCode={setDiscountCode}
                  setDiscountAmount={setDiscountAmount}
                  setPointsToRedeem={setPointsToRedeem}
                  setErrorMessageDiscount={setErrorMessageDiscount}
                  setErrorMessageLoyalty={setErrorMessageLoyalty}
                  errorMessageDiscount={errorMessageDiscount}
                  errorMessageLoyalty={errorMessageLoyalty}
                />
              )}
            </div>
          </div>
          <div className="w-full md:w-1/4 bg-white border mb-10 p-6 mt-16">
            <img src={image} alt="Salon" className="mb-4 rounded-md shadow" />
            <h2 className="text-xl font-bold mb-4 text-black">DZ BEAUTY</h2>
            <p className="text-lg text-start font-semibold text-gray-800">LOCATION</p>
            <p className="text-text mb-4 text-start">
              First Floor, Next to LETO Cafe, Dubai Hills Mall
            </p>
            <p className="text-lg text-start font-semibold text-gray-800">PHONE</p>
            <p className="text-text mb-4 text-start">04 589 6222</p>
            <p className="text-lg text-start font-semibold text-gray-800">BEAUTY LOUNGE HOURS</p>
            <div className="space-y-2">
              <p className="text-text text-start">Monday: 10:00 am - 10:00 pm</p>
              <p className="text-text text-start">Tuesday: 10:00 am - 10:00 pm</p>
              <p className="text-text text-start">Wednesday: 10:00 am - 10:00 pm</p>
              <p className="text-text text-start">Thursday: 10:00 am - 10:00 pm</p>
              <p className="text-text text-start">Friday: 10:00 am - 10:00 pm</p>
              <p className="text-text text-start">Saturday: 10:00 am - 10:00 pm</p>
              <p className="text-text text-start">Sunday: 10:00 am - 10:00 pm</p>
            </div>
            <div className="mt-5">
              <iframe
                src="https://www.google.com/maps/embed?pb=..."
                width="100%"
                height="300"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map of DZ BEAUTY"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Book;
