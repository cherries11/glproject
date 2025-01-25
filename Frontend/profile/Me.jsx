import React, { useState } from "react";  
// Importation de React et du hook useState pour gérer l'état du composant.

const ProfilePage = () => {  
  // Définition du composant ProfilePage.

  const [profile, setProfile] = useState({  
    // Déclaration de l'état local `profile` pour stocker les informations du profil.
    name: "John Doe",  // Valeur initiale du nom
    email: "johndoe@example.com",  // Valeur initiale de l'email
    phone: "+33 6 12 34 56 78",  // Valeur initiale du téléphone
    bio: "Prestataire expérimenté dans le domaine juridique."  // Valeur initiale de la biographie
  });

  const handleChange = (e) => {  
    // Fonction pour gérer les changements dans les champs du formulaire.
    setProfile({ ...profile, [e.target.name]: e.target.value });  
    // Mise à jour de l'état en utilisant le nom de l'input comme clé.
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700 min-h-screen text-gray-100">
      {/* Conteneur principal avec styles flex, padding et arrière-plan flou */}
      <h1 className="text-3xl font-bold mb-8">Profil Prestataire</h1>  
      {/* Titre de la page du profil */}

      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700 rounded-lg p-6 w-full max-w-2xl">
        {/* Carte contenant le formulaire avec des styles de fond et des bordures */}
        <div className="space-y-4">  
          {/* Ajout d'un espace vertical entre les champs du formulaire */}
          
          <label className="block">  
            {/* Champ pour le nom */}
            <span className="text-gray-300">Nom</span>
            <input 
              type="text" 
              name="name"  
              value={profile.name}  
              onChange={handleChange}  
              className="mt-1 block w-full rounded-md border-gray-600 shadow-sm bg-gray-800 text-gray-300 p-2"  
              // Input stylisé avec une bordure et fond sombre
            />
          </label>

          <label className="block">  
            {/* Champ pour l'email */}
            <span className="text-gray-300">Email</span>
            <input 
              type="email"  
              name="email"  
              value={profile.email}  
              onChange={handleChange}  
              className="mt-1 block w-full rounded-md border-gray-600 shadow-sm bg-gray-800 text-gray-300 p-2"  
            />
          </label>

          <label className="block">  
            {/* Champ pour le téléphone */}
            <span className="text-gray-300">Téléphone</span>
            <input 
              type="tel"  
              name="phone"  
              value={profile.phone}  
              onChange={handleChange}  
              className="mt-1 block w-full rounded-md border-gray-600 shadow-sm bg-gray-800 text-gray-300 p-2"  
            />
          </label>

          <label className="block">  
            {/* Champ pour la biographie */}
            <span className="text-gray-300">Biographie</span>
            <textarea  
              name="bio"  
              value={profile.bio}  
              onChange={handleChange}  
              className="mt-1 block w-full rounded-md border-gray-600 shadow-sm bg-gray-800 text-gray-300 p-2"  
              // Zone de texte stylisée pour la biographie
            ></textarea>
          </label>

          <button className="bg-blue-500 text-white w-full py-2 rounded mt-4">
            Enregistrer  
            {/* Bouton de soumission stylisé */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;  
// Exportation du composant pour être utilisé ailleurs dans l'application.
