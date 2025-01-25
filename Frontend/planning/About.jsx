import React, { useState } from "react";

const PlanningPage = () => {
  // États pour gérer la date sélectionnée, l'heure de début et de fin, et le nombre maximal de rendez-vous
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState("10:00 am");
  const [endTime, setEndTime] = useState("10:00 am");
  const [maxAppointments, setMaxAppointments] = useState(1);

  return (
    <div className="flex flex-col items-center p-8 bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700 min-h-screen text-gray-100">
      {/* Titre de la page */}
      <h1 className="text-3xl font-bold mb-8">Planning</h1>

      {/* Section du calendrier */}
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700 rounded-lg p-4 relative z-20 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          {/* Bouton pour naviguer au mois précédent */}
          <button className="text-xl">&#x3c;</button>
          <h2 className="text-xl font-semibold">Janvier</h2>
          {/* Bouton pour naviguer au mois suivant */}
          <button className="text-xl">&#x3e;</button>
        </div>
        <div className="flex justify-between">
          {/* Affichage des jours de la semaine sélectionnés */}
          {[21, 22, 23, 24, 25, 26, 27].map((day, index) => (
            <div 
              key={index} 
              className={`rounded-full w-12 h-12 flex items-center justify-center ${selectedDate === day ? 'bg-blue-500 text-white' : 'bg-white text-gray-900'} cursor-pointer`} 
              onClick={() => setSelectedDate(day)}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Section pour ajouter un planning */}
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700 rounded-lg p-4 relative z-20 w-full max-w-md mt-8">
        <h3 className="text-xl font-semibold mb-4">Ajouter un planning</h3>
        <div className="space-y-4">
          {/* Champ de saisie pour la date */}
          <label className="block">
            <span className="text-gray-300">Date</span>
            <input type="date" className="mt-1 block w-full rounded-md border-gray-600 shadow-sm bg-gray-800 text-gray-300" />
          </label>
          {/* Champ de saisie pour l'heure de début et de fin */}
          <label className="block">
            <span className="text-gray-300">Heure</span>
            <div className="flex space-x-2">
              <input type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full p-2 border rounded bg-gray-800 text-gray-300" />
              <span className="text-gray-400">&rarr;</span>
              <input type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full p-2 border rounded bg-gray-800 text-gray-300" />
            </div>
          </label>
          {/* Champ pour définir le nombre maximum de rendez-vous */}
          <label className="block">
            <span className="text-gray-300">Disponibilité</span>
            <input type="number" value={maxAppointments} onChange={(e) => setMaxAppointments(e.target.value)} className="mt-1 block w-full rounded-md border-gray-600 shadow-sm bg-gray-800 text-gray-300" />
          </label>
          {/* Bouton de soumission */}
          <button className="bg-blue-500 text-white w-full py-2 rounded">OK</button>
        </div>
      </div>
    </div>
  );
};

export default PlanningPage;
