
import React from "react";
import { Link as RouterLink } from "react-router-dom";


const BookingSummary = ({
    selectedWorkers,
    selectedDate,
    selectedTime,
    serviceLocation,
    discountCode,
    discountAmount,
    pointsToRedeem,
    loyaltyPoints,
    setServiceLocation,
    setDiscountCode,
    setDiscountAmount,
    setPointsToRedeem,
    setErrorMessageDiscount,
    setErrorMessageLoyalty,
    errorMessageDiscount,
    errorMessageLoyalty,
  }) => {
    const discountCodes = {
      SAVE20: 20, // 20% discount
      SAVE25: 25, // 25% discount
      SAVE30: 30, // 30% discount
    };
  
    const applyDiscount = () => {
      if (discountCodes[discountCode]) {
        const discount = discountCodes[discountCode];
        setDiscountAmount(discount);
        setErrorMessageDiscount(""); // Clear discount error message
      } else {
        setDiscountAmount(0);
        setErrorMessageDiscount("Invalid discount code");
      }
    };
  
    const handleLocationChange = (location) => {
      setServiceLocation(location);
    };
  
    const workerDetails = selectedWorkers
      .map((worker) => `${worker.workerName} (${worker.service})`)
      .join(", ");
  
    const totalPrice = selectedWorkers.reduce((total, worker) => {
      let price = typeof worker.price === "string"
        ? parseFloat(worker.price.split(" ")[1]) // assuming price is like "AED 50"
        : worker.price;
  
      return total + (isNaN(price) ? 0 : price);
    }, 0);
  
    const isAtHome = serviceLocation === "at_home";
    const additionalFee = isAtHome ? totalPrice * 0.2 : 0;
    const subtotal = totalPrice + additionalFee;
  
    const tax = (subtotal * 0.05).toFixed(2);
    const discountValue = (subtotal * (discountAmount / 100)).toFixed(2);
    const pointsDiscount = pointsToRedeem * 0.1; // Assume each point is worth 0.1 AED
    const total = (subtotal + parseFloat(tax) - parseFloat(discountValue) - pointsDiscount).toFixed(2);
  
    return (
      <div className="mt-20 mb-36 p-4 border rounded-lg shadow-md bg-white max-w-md">
        <div className="mb-4">
          <h4 className="font-semibold text-black text-start">Choose Service Location</h4>
          <div className="flex space-x-4">
            <button
              onClick={() => handleLocationChange("at_home")}
              className={`px-5 py-2 border mb-4 rounded ${isAtHome ? "bg-new text-white" : "bg-white"}`}
            >
              A domicile(+20%)
            </button>
            <button
              onClick={() => handleLocationChange("in_salon")}
              className={`px-5 py-2 mb-4 border rounded ${!isAtHome ? "bg-new text-white" : "bg-white"}`}
            >
              Au salon
            </button>
          </div>
        </div>
  
        <h3 className="text-new font-bold text-lg mb-4">
          {new Date(selectedDate).toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          })}{" "}
          @ {selectedTime}
        </h3>
  
        <table className="w-full mb-4 text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="font-semibold">Description</th>
              <th className="font-semibold text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">
                Services <br />
                <span className="text-gray-500 text-sm">w/ {workerDetails}</span>
              </td>
              <td className="py-2 text-right">AED {totalPrice.toFixed(2)}</td>
            </tr>
            {isAtHome && (
              <tr className="border-b">
                <td className="py-2">Travel Fee (20%)</td>
                <td className="py-2 text-right">AED {additionalFee.toFixed(2)}</td>
              </tr>
            )}
            <tr>
              <td className="py-2">Tax</td>
              <td className="py-2 text-right">AED {tax}</td>
            </tr>
            {discountAmount > 0 && (
              <tr>
                <td className="py-2 text-green-500">
                  Discount ({discountAmount}%)
                </td>
                <td className="py-2 text-right text-green-500">
                  -AED {discountValue}
                </td>
              </tr>
            )}
            {pointsToRedeem > 0 && (
              <tr>
                <td className="py-2 text-green-500">Points Discount</td>
                <td className="py-2 text-right text-green-500">
                  -AED {pointsDiscount.toFixed(2)}
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="font-bold text-new">
              <td className="py-2">Total</td>
              <td className="py-2 text-right">AED {total}</td>
            </tr>
          </tfoot>
        </table>
  
        {/* Loyalty Points Section */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 text-start mt-3">Loyalty Points</h4>
          <p className="text-gray-700 text-start">
            You have {loyaltyPoints} points. Redeem points for a discount on this booking.
          </p>
          <div className="flex mt-2">
            <input
              type="number"
              value={pointsToRedeem}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 0 && value <= loyaltyPoints) {
                  setPointsToRedeem(value);
                  setErrorMessageLoyalty(""); // Clear loyalty error message
                } else if (value > loyaltyPoints) {
                  setErrorMessageLoyalty("You cannot redeem more points than you have");
                } else if (value < 0) {
                  setErrorMessageLoyalty("Points cannot be negative");
                }
              }}
              className="flex-1 px-5 py-3 border rounded-l-md focus:outline-none"
              placeholder="Points to redeem"
            />
          </div>
          {errorMessageLoyalty && (
            <p className="text-red-500 text-sm mt-2">{errorMessageLoyalty}</p>
          )}
        </div>
  
        {/* Discount Code Section */}
        <div className="mb-4">
          <label htmlFor="discount-code" className="block text-gray-700 mb-2 text-start">
            Do you have a discount code?
          </label>
          <div className="flex">
            <input
              type="text"
              id="discount-code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="flex-1 px-5 py-3 border rounded-l-md focus:outline-none"
              placeholder="Enter code (e.g., SAVE20)"
            />
            <button
              onClick={applyDiscount}
              className="px-5 py-3 bg-new text-white rounded-r-md hover:bg-hover transition"
            >
              Apply
            </button>
          </div>
          {errorMessageDiscount && (
            <p className="text-red-500 text-sm mt-2">{errorMessageDiscount}</p>
          )}
        </div>
  
        {/* Booking Button */}
        <button className="bg-new mt-4 text-white font-bold py-3 px-5 rounded-lg w-full hover:bg-hover transition">
          <RouterLink to="/payment">BOOK RESERVATION</RouterLink>
        </button>
  
        <p className="text-gray-500 text-sm mt-2">
          * Final prices and durations will be reflected in the confirmation screen.
        </p>
      </div>
    );
  };
export default BookingSummary;