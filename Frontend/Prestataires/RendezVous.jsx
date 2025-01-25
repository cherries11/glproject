import React from "react";

// Composant RendezVous qui reçoit une liste de rendez-vous en tant que prop
const RendezVous = ({ appointments }) => {
  return (
    <div className="w-full max-w-3xl space-y-4 relative z-10">
      {appointments.map((appointment, index) => (
        <div
          key={index} // Utilisation de l'index comme clé pour chaque élément
          className="bg-blue-950 shadow-md rounded-lg p-4 border border-gray-700 relative z-20"
        >
          {/* Affichage du nom du client */}
          <h2 className="text-lg font-semibold text-white">{appointment.name}</h2>
          {/* Affichage de l'email du client */}
          <p className="text-sm text-gray-300">{appointment.email}</p>
          {/* Affichage du numéro de téléphone du client */}
          <p className="text-sm text-gray-300">{appointment.phone}</p>
          <div className="mt-4">
            {/* Affichage de la date du rendez-vous */}
            <p className="flex items-center text-sm text-white">
              <span className="mr-2">📅</span> Date de Rendez-vous :{" "}
              <span className="ml-2 font-medium">{appointment.date}</span>
            </p>
            {/* Affichage de l'heure du rendez-vous */}
            <p className="flex items-center text-sm text-white mt-2">
              <span className="mr-2">⏰</span> Heure :{" "}
              <span className="ml-2 font-medium">{appointment.time}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Données fictives de rendez-vous pour tester le composant
const appointmentsData = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    date: "2025-01-01",
    time: "10:00 AM",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "098-765-4321",
    date: "2025-01-02",
    time: "02:00 PM",
  },
  {
    name: "Sam Wilson",
    email: "sam.wilson@example.com",
    phone: "456-789-0123",
    date: "2025-01-03",
    time: "04:00 PM",
  },
  {
    name: "Emily Clark",
    email: "emily.clark@example.com",
    phone: "234-567-8901",
    date: "2025-01-04",
    time: "11:00 AM",
  },
];

// Composant principal qui rend la liste des rendez-vous avec les données fictives
export default function App() {
  return <RendezVous appointments={appointmentsData} />;
}
