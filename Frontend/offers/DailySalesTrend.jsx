import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const offersData = [
  { id: 1, name: "Special Haircut", duration: "1 hour", price: "$30", provider: "John Doe", image: "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww"
  },
  { id: 2, name: "Relaxing Massage", duration: "45 minutes", price: "$50", provider: "Jane Smith", image: "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww"
  },
  { id: 3, name: "Facial Treatment", duration: "1 hour 30 minutes", price: "$70", provider: "Bob Johnson", image: "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww"
},
];

const OffersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOffers, setFilteredOffers] = useState(offersData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newOffer, setNewOffer] = useState({
    name: "",
    duration: "",
    price: "",
    provider: "",
    image: "",
  });

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = offersData.filter(
      (offer) =>
        offer.name.toLowerCase().includes(term) ||
        offer.provider.toLowerCase().includes(term)
    );
    setFilteredOffers(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOffer({ ...newOffer, [name]: value });
  };

  const handleAddOffer = (e) => {
    e.preventDefault();
    const newId = Date.now();
    const updatedOffers = [...filteredOffers, { ...newOffer, id: newId }];
    setFilteredOffers(updatedOffers);
    setShowAddForm(false);
    setNewOffer({ name: "", duration: "", price: "", provider: "", image: "" });
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Special Offers</h2>
        <div className="flex items-center">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            Ajouter une Offre
          </button>
        </div>
      </div>

      {showAddForm && (
        <motion.div
          className="bg-gray-700 p-4 rounded-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Ajouter une Offre</h3>
          <form onSubmit={handleAddOffer} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Nom de l'offre"
              value={newOffer.name}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 text-gray-100 border border-gray-600 rounded"
              required
            />
            <input
              type="text"
              name="duration"
              placeholder="Durée"
              value={newOffer.duration}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 text-gray-100 border border-gray-600 rounded"
              required
            />
            <input
              type="text"
              name="price"
              placeholder="Prix"
              value={newOffer.price}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 text-gray-100 border border-gray-600 rounded"
              required
            />
            <input
              type="text"
              name="provider"
              placeholder="Prestataire"
              value={newOffer.provider}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 text-gray-100 border border-gray-600 rounded"
              required
            />
            <input
              type="text"
              name="image"
              placeholder="URL de l'image"
              value={newOffer.image}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 text-gray-100 border border-gray-600 rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Ajouter
            </button>
          </form>
        </motion.div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Offre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Durée
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Prix
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Prestataire
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredOffers.map((offer) => (
              <motion.tr
                key={offer.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-100">{offer.name}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{offer.duration}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{offer.price}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{offer.provider}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={offer.image}
                    alt={offer.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
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

export default OffersTable;