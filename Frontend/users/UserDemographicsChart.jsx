import { motion } from "framer-motion";  // Importation de la bibliothèque framer-motion pour l'animation des composants
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";  // Importation des composants nécessaires de la bibliothèque recharts

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];  // Définition d'un tableau de couleurs pour les segments du graphique circulaire

const userDemographicsData = [  // Données sur la répartition démographique des utilisateurs
  { name: "18-24", value: 20 },  // Tranche d'âge 18-24 ans, avec 20% de la population
  { name: "25-34", value: 30 },  // Tranche d'âge 25-34 ans, avec 30% de la population
  { name: "35-44", value: 25 },  // Tranche d'âge 35-44 ans, avec 25% de la population
  { name: "45-54", value: 15 },  // Tranche d'âge 45-54 ans, avec 15% de la population
  { name: "55+", value: 10 },    // Tranche d'âge 55+ ans, avec 10% de la population
];

const UserDemographicsChart = () => {  // Définition du composant fonctionnel UserDemographicsChart
  return (
    <motion.div  // Composant div animé de framer-motion
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 lg:col-span-2'  // Application de styles avec Tailwind CSS pour le fond, la bordure, les ombres, etc.
      initial={{ opacity: 0, y: 20 }}  // Initialisation de l'animation avec une opacité de 0 et un déplacement de 20 pixels vers le bas
      animate={{ opacity: 1, y: 0 }}  // L'animation fait passer l'opacité à 1 et réinitialise le déplacement vertical à 0
      transition={{ delay: 0.5 }}  // L'animation commence après un délai de 0,5 secondes
    >
      <h2 className='text-xl font-semibold text-gray-100 mb-4'>User Demographics</h2> 
      <div style={{ width: "100%", height: 300 }}>  
        <ResponsiveContainer>  
          <PieChart> 
            <Pie
              data={userDemographicsData}  // Données à afficher dans le graphique circulaire
              cx='50%'  // Position horizontale du centre du graphique (50% signifie centré)
              cy='50%'  // Position verticale du centre du graphique (50% signifie centré)
              outerRadius={100}  // Rayon extérieur du graphique circulaire
              fill='#8884d8'  // Couleur par défaut des segments (celle-ci peut être remplacée par Cell)
              dataKey='value'  // Clé des données à afficher sur chaque segment (ici, la valeur des pourcentages)
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}  // Formatage des labels des segments pour afficher le nom et le pourcentage
            >
              {userDemographicsData.map((entry, index) => (  // Mapping des données pour colorier chaque segment avec une couleur spécifique
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />  // Affectation d'une couleur à chaque segment selon l'index
              ))}
            </Pie>
            <Tooltip  // Affichage des infobulles lors du survol des segments
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",  // Style de fond de l'infobulle
                borderColor: "#4B5563",  // Couleur de la bordure de l'infobulle
              }}
              itemStyle={{ color: "#E5E7EB" }}  // Style du texte dans l'infobulle
            />
            <Legend />  // Affichage de la légende pour décrire les segments
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default UserDemographicsChart;  // Exportation du composant UserDemographicsChart pour l'utiliser dans d'autres fichiers
