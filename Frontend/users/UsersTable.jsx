import { useState } from "react";  // Importation du hook useState de React pour gérer l'état local
import { motion } from "framer-motion";  // Importation de framer-motion pour les animations
import { Search } from "lucide-react";  // Importation de l'icône de recherche de lucide-react (non utilisée dans le code, mais peut être intégrée plus tard)

const userData = [  // Tableau des données d'utilisateurs
  { id: 1, name: "John Doe", email: "john@example.com", service: "coiffure", status: "Active" },  // Exemple d'utilisateur
  { id: 2, name: "Jane Smith", email: "jane@example.com", service: "soin", status: "Active" },  // Exemple d'utilisateur
  { id: 3, name: "Bob Johnson", email: "bob@example.com", service: "massage", status: "Inactive" },  // Exemple d'utilisateur
  { id: 4, name: "Alice Brown", email: "alice@example.com", service: "Coiffure", status: "Active" },  // Exemple d'utilisateur
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", service: "Massage", status: "Active" },  // Exemple d'utilisateur
];

const UsersTable = () => {  // Composant fonctionnel pour afficher le tableau des utilisateurs
  const [searchTerm, setSearchTerm] = useState("");  // État pour stocker le terme de recherche
  const [filteredUsers, setFilteredUsers] = useState(userData);  // État pour stocker les utilisateurs filtrés
  const [showAddForm, setShowAddForm] = useState(false);  // État pour afficher ou masquer le formulaire d'ajout
  const [newUser, setNewUser] = useState({  // État pour gérer les nouvelles informations de l'utilisateur
    name: "",
    email: "",
    service: "",
    status: "Active",
  });

  // Fonction pour gérer la recherche d'utilisateur
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();  // Conversion du terme de recherche en minuscules
    setSearchTerm(term);  // Mise à jour du terme de recherche
    const filtered = userData.filter(  // Filtrage des utilisateurs en fonction du nom ou de l'email
      (user) => user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);  // Mise à jour des utilisateurs filtrés
  };

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;  // Récupérer le nom et la valeur du champ
    setNewUser({ ...newUser, [name]: value });  // Mise à jour de l'état du nouvel utilisateur
  };

  // Fonction pour ajouter un nouvel utilisateur
  const handleAddUser = (e) => {
    e.preventDefault();  // Empêcher le comportement par défaut du formulaire
    const newId = Date.now();  // Utilisation de l'ID basé sur le temps pour garantir un ID unique
    const updatedUsers = [...filteredUsers, { ...newUser, id: newId }];  // Ajout du nouvel utilisateur aux utilisateurs filtrés
    setFilteredUsers(updatedUsers);  // Mise à jour de la liste des utilisateurs
    setShowAddForm(false);  // Masquer le formulaire d'ajout après l'ajout
    setNewUser({ name: "", email: "", service: "", status: "Active" });  // Réinitialiser le formulaire
  };

  return (
    <motion.div  // Composant div animé
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"  // Styles de la boîte contenant le tableau
      initial={{ opacity: 0, y: 20 }}  // Animation d'apparition (opacity: 0, y: 20 pixels)
      animate={{ opacity: 1, y: 0 }}  // Animation de la fin (opacité: 1, y: 0)
      transition={{ delay: 0.2 }}  // Délai de 0.2 secondes avant de commencer l'animation
    >
      <div className="flex justify-between items-center mb-6">  
        <h2 className="text-xl font-semibold text-gray-100">Users</h2>  
        <div className="flex items-center">  
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"  // Styles du bouton
            onClick={() => setShowAddForm(!showAddForm)}  // Affichage/masquage du formulaire d'ajout
          >
          
          </button>
        </div>
      </div>

      {showAddForm && (  // Si showAddForm est true, afficher le formulaire d'ajout
        <motion.div  // Composant div animé pour le formulaire
          className="bg-gray-700 p-4 rounded-lg mb-6"  // Styles du formulaire
          initial={{ opacity: 0 }}  // Animation d'apparition
          animate={{ opacity: 1 }}  // Animation de fin
          transition={{ duration: 0.3 }}  // Durée de l'animation
        >
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Ajouter un prestataire</h3> 
          <form onSubmit={handleAddUser} className="space-y-4"> 
            <input
              type="text"
              name="name"
              placeholder="Nom"
              value={newUser.name}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 text-gray-100 border border-gray-600 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 text-gray-100 border border-gray-600 rounded"
              required
            />
            <input
              type="text"
              name="service"
              placeholder="Service"
              value={newUser.service}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 text-gray-100 border border-gray-600 rounded"
              required
            />
            <select
              name="status"
              value={newUser.status}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 text-gray-100 border border-gray-600 rounded"
            >
              <option value="Active">Active</option>  
              <option value="Inactive">Inactive</option>  
            </select>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
             
            </button>
          </form>
        </motion.div>
      )}

      <div className="overflow-x-auto"> 
        <table className="min-w-full divide-y divide-gray-700">  
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredUsers.map((user) => (  // Itérer sur les utilisateurs filtrés
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}  // Animation d'apparition des lignes du tableau
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}  // Durée de l'animation
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}  
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-100">{user.name}</div>  
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{user.email}</div>  
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {user.service}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === "Active"
                        ? "bg-green-800 text-green-100"
                        : "bg-red-800 text-red-100"
                    }`}
                  >
                    {user.status}  
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button className="text-indigo-400 hover:text-indigo-300 mr-2">Edit</button>  
                  <button className="text-red-400 hover:text-red-300">Delete</button>  
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UsersTable;  // Exportation du composant pour l'utiliser dans d'autres parties de l'application
