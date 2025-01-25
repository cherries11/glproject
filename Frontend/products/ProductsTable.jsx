import { motion } from "framer-motion";  // Importation de la bibliothèque Framer Motion pour les animations
import { Edit, Search, Trash2, PlusCircle } from "lucide-react";  // Importation des icônes depuis Lucide React
import { useState } from "react";  // Importation du hook d'état React

// Données statiques des produits
const PRODUCT_DATA = [
  { id: 1, name: "Extensions naturelles", service: "coiffure", prestataire: "Lina Mekki", price: 59.99 },
  { id: 2, name: "Extensions naturelles", service: "coiffure", prestataire: "hasna", price: 39.99 },
  { id: 3, name: "skin care", service: "soin", prestataire: "hasna_ben", price: 39.98 },
  { id: 4, name: "Extensions naturelles", service: "coiffure", prestataire: "hasna", price: 39.99 },
  { id: 5, name: "Extensions naturelles", service: "coiffure", prestataire: "hasna", price: 39.99 },
];

const ProductsTable = () => {
  // Déclaration de l'état pour la recherche
  const [searchTerm, setSearchTerm] = useState("");
  // État pour stocker les produits filtrés
  const [filteredProducts, setFilteredProducts] = useState(PRODUCT_DATA);
  // État pour afficher ou masquer le formulaire d'ajout
  const [showAddForm, setShowAddForm] = useState(false);
  // État pour stocker les données du nouveau produit
  const [newProduct, setNewProduct] = useState({
    name: "",
    service: "",
    prestataire: "",
    price: "",
  });

  // Fonction de recherche de produit
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();  // Récupération et mise en minuscule de la recherche
    setSearchTerm(term);  // Mise à jour de l'état de recherche
    const filtered = PRODUCT_DATA.filter(
      (product) => 
        product.name.toLowerCase().includes(term) || 
        product.service.toLowerCase().includes(term)  // Filtrage des produits en fonction du terme saisi
    );
    setFilteredProducts(filtered);  // Mise à jour de la liste affichée
  };

  // Fonction pour ajouter un nouveau produit
  const handleAddProduct = (e) => {
    e.preventDefault();  // Empêcher le rechargement de la page
    const updatedProducts = [...filteredProducts, { ...newProduct, id: Date.now() }];  // Ajout du produit avec un ID unique
    setFilteredProducts(updatedProducts);  // Mise à jour de la liste
    setShowAddForm(false);  // Cacher le formulaire après l'ajout
    setNewProduct({ name: "", service: "", prestataire: "", price: "" });  // Réinitialisation du formulaire
  };

  // Fonction pour gérer les changements dans le formulaire d'ajout
  const handleInputChange = (e) => {
    const { name, value } = e.target;  // Extraction du nom et de la valeur de l'entrée
    setNewProduct({ ...newProduct, [name]: value });  // Mise à jour de l'état du nouveau produit
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}  // Animation initiale
      animate={{ opacity: 1, y: 0 }}  // Animation finale
      transition={{ delay: 0.2 }}  // Délai d'animation
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Product List</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearch}
              value={searchTerm}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />  
          </div>
          <button
            className="text-green-400 hover:text-green-300"
            onClick={() => setShowAddForm((prev) => !prev)}  // Toggle affichage formulaire
          >
            <PlusCircle size={24} />
          </button>
        </div>
      </div>

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <motion.div
          className="bg-gray-700 p-4 rounded-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Ajouter un produit</h3>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <input type="text" name="name" placeholder="Nom du produit" value={newProduct.name} onChange={handleInputChange} className="w-full p-2 bg-gray-800 text-gray-100 border border-gray-600 rounded" required />
            <input type="text" name="service" placeholder="Service" value={newProduct.service} onChange={handleInputChange} className="w-full p-2 bg-gray-800 text-gray-100 border border-gray-600 rounded" required />
            <input type="text" name="prestataire" placeholder="Prestataire" value={newProduct.prestataire} onChange={handleInputChange} className="w-full p-2 bg-gray-800 text-gray-100 border border-gray-600 rounded" required />
            <input type="number" name="price" placeholder="Prix" value={newProduct.price} onChange={handleInputChange} className="w-full p-2 bg-gray-800 text-gray-100 border border-gray-600 rounded" required />
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Ajouter</button>
          </form>
        </motion.div>
      )}

      {/* Table des produits */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Prestataire</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredProducts.map((product) => (
              <motion.tr key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.service}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.prestataire}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${product.price.toFixed(2)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ProductsTable;
