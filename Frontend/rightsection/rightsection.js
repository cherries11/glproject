import React from "react";
import image from "./Magasin.jpg";

function RightSection() {
  return (
    <div>
      {/* Right Section (Salon details) */}
      <div className=" ml-8 salon border-border border p-4 aria-hidden:md:w-0">
        {/* Salon details */}
        <img
          src={image}
          alt="Salon"
          className="mb-4 rounded-md shadow"
        />
        <h2 className="text-xl font-bold mb-4 text-black">DZ BEAUTY</h2>
        <p className="text-lg text-start font-semibold text-gray-800">LOCATION</p>
        <p className="text-text mb-4 text-start">First Floor, Next to LETO Cafe, Dubai Hills Mall</p>
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
            title="Google Map of DZ BEAUTE"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default RightSection;
