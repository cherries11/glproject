import { motion } from "framer-motion"; // Importation de motion pour ajouter des animations aux composants.
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from "recharts"; // Importation des composants du graphique depuis recharts.

const revenueData = [
  { month: "Jan", revenue: 4000 },  // Données de revenus pour janvier
  { month: "Feb", revenue: 3000 },  // Données de revenus pour février
  { month: "Mar", revenue: 5000 },  // Données de revenus pour mars
  { month: "Apr", revenue: 4500 },  // Données de revenus pour avril
  { month: "May", revenue: 6000 },  // Données de revenus pour mai
  { month: "Jun", revenue: 5500 },  // Données de revenus pour juin
];

const RevenueTrendChart = () => {  // Définition du composant React pour afficher le graphique
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700" // Styles pour un fond flou et des bordures arrondies.
      initial={{ opacity: 0, y: 20 }}  // Animation initiale : commence avec une opacité nulle et descend de 20px.
      animate={{ opacity: 1, y: 0 }}  // Animation d'entrée : apparait progressivement et monte à sa position normale.
      transition={{ delay: 0.3 }}  // Délai avant le début de l'animation.
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Monthly Revenue Trend</h2>  
      {/* Titre du graphique avec des styles de police et marge en bas */}

      <div style={{ width: "100%", height: 300 }}>  
        {/* Conteneur avec largeur et hauteur fixée pour le graphique */}
        <ResponsiveContainer>  
          {/* Conteneur réactif qui ajuste la taille du graphique automatiquement */}
          <AreaChart data={revenueData}>  
            {/* Graphique de type "AreaChart" utilisant les données fournies */}
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />  
            {/* Grille de fond avec des traits espacés */}
            <XAxis dataKey="month" stroke="#9CA3AF" />  
            {/* Axe X basé sur le mois avec une couleur de texte spécifique */}
            <YAxis stroke="#9CA3AF" />  
            {/* Axe Y représentant les valeurs des revenus */}
            <Tooltip 
              contentStyle={{ backgroundColor: "rgba(31, 41, 55, 0.8)", borderColor: "#4B5563" }}  
              itemStyle={{ color: "#E5E7EB" }}  
            />  
            {/* Infobulle affichée au survol, avec styles de fond et de bordure */}
            <Legend />  
            {/* Légende affichant les différentes courbes du graphique */}
            <Area 
              type="monotone"  
              dataKey="revenue"  
              stroke="#8B5CF6"  
              fill="#8B5CF6"  
              strokeWidth={2}  
            />  
            {/* Courbe du graphique avec un style coloré et lissage monotone */}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default RevenueTrendChart;  
// Exportation du composant pour être utilisé ailleurs dans l'application.
