import React from "react"; // Importing React to use JSX syntax
import RendezVous from "../../components/Prestataires/RendezVous"; // Importing the RendezVous component to display the list of appointments

// Sample appointments data
const appointments = [
  {
    id: 1,
    name: "James K. Murphy", // Name of the client
    email: "yarebbig1@gmail.com", // Email of the client
    phone: "000-000-000", // Phone number of the client
    date: "01-01-2000", // Appointment date
    time: "12:00", // Appointment time
  },
  {
    id: 2,
    name: "James K. Murphy", // Name of the client
    email: "yarebbig1@gmail.com", // Email of the client
    phone: "000-000-000", // Phone number of the client
    date: "01-01-2000", // Appointment date
    time: "12:00", // Appointment time
  },
];

const Prestataire = () => {
  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      {/* Title for the page */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Liste des Rendez-vous</h1>
      
      {/* Rendering the RendezVous component and passing the appointments data as a prop */}
      <RendezVous appointments={appointments} />
    </div>
  );
};

export default Prestataire;
