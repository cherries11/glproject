import React from "react";
import { useParams } from "react-router-dom";
import portfoliInfo from "../data/portfolioInfo";
import Navigation1 from "../navigation/navigation1";

const PortfolioPage = () => {
  const { name } = useParams(); // Retrieve worker's name from URL
  const worker = portfoliInfo.find(
    (member) => member.name === decodeURIComponent(name)
  ); // Find the worker by name

  if (!worker) {
    return (
      <div className="bg-white flex items-center justify-center">
        <p className="text-red-500 text-xl font-bold">Worker not found.</p>
      </div>
    );
  }

  return (
    <div>
    <Navigation1></Navigation1>
    <div className="">
    <div 
  className="relative  py-16 text-center"
  style={{
    backgroundImage: `url(${worker.image})`,
    backgroundSize: 'cover',
    height:'300px',
    backgroundPosition: 'center',
  }}
>
  <div className="absolute"></div>
  {/* Content */}
  <h1 className="relative text-4xl font-bold top-12 text-white z-10">
  Bonjour ! Je m'appelle {worker.name} et je suis{' '}
  <span className="text-new">{worker.role}</span>
</h1>

</div>

      {/* About Me Section */}
      <div className="mt-12 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-black">A props</h2>
        <p className="text-black mt-4 text-lg">
          {worker.description}
        </p>
      </div>

      {/* Skills Section */}
      <div className="mt-16 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-black">Mes compétences</h2>
        <div className="flex justify-center flex-wrap gap-6 mt-8">
          {worker.skills.map((skill, index) => (
            <div
              key={index}
              className="w-40 h-40 bg-hover rounded-full flex items-center justify-center text-new font-bold text-lg "
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="mt-16 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-black">Portfolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {worker.portfolio.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={item.image}
                alt={`Portfolio ${index}`}
                className="h-64 w-full object-cover transform group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <p className="text-white font-bold">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contacts Section */}
      <div className="mt-16 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-black">Contacts</h2>
        <div className="flex justify-center flex-wrap gap-8 mt-8 text-gray-600">
          <div>
            <p className="font-semibold">E-mail</p>
            <p>{worker.email}</p>
          </div>
          <div>
            <p className="font-semibold">Telephone number</p>
            <p>{worker.phone}</p>
          </div>
          <div>
            <p className="font-semibold">Social media</p>
            <div>
        <h2>Social Links:</h2>
        {Object.entries(worker.socials).map(([platform, link]) => (
          <a key={platform} href={link} target="_blank" rel="noopener noreferrer">
            {platform}
          </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center text-gray-500 text-sm">
        <p>&copy; 2020 {worker.name}. All rights reserved.</p>
      </div>
    </div>
    </div>
  );
};

export default PortfolioPage;
