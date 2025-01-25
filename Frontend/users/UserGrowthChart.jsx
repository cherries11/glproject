import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";  // Importation des composants nécessaires de recharts pour créer un graphique linéaire
import { motion } from "framer-motion";  // Importation de framer-motion pour les animations

const userGrowthData = [  // Données sur la croissance des utilisateurs (mois et nombre d'utilisateurs)
  { month: "Jan", users: 1000 },  // Utilisateurs en janvier
  { month: "Feb", users: 1500 },  // Utilisateurs en février
  { month: "Mar", users: 2000 },  // Utilisateurs en mars
  { month: "Apr", users: 3000 },  // Utilisateurs en avril
  { month: "May", users: 4000 },  // Utilisateurs en mai
  { month: "Jun", users: 5000 },  // Utilisateurs en juin
];

const UserGrowthChart = () => {  // Composant fonctionnel pour afficher le graphique de croissance des utilisateurs
  return (
    <motion.div  // Composant div animé par framer-motion
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'  // Styles pour un fond semi-transparent, des ombres et une bordure
      initial={{ opacity: 0, y: 20 }}  // Initialisation de l'animation avec une opacité de 0 et un décalage vertical de 20 pixels
      animate={{ opacity: 1, y: 0 }}  // Animation de l'apparition avec une opacité de 1 et un retour à la position initiale (0 pixels)
      transition={{ delay: 0.3 }}  // La transition commence après un délai de 0,3 secondes
    >
      <h2 className='text-xl font-semibold text-gray-100 mb-4'>User Growth</h2>  // Titre du graphique, stylisé avec Tailwind CSS
      <div className='h-[320px]'>  // Container pour le graphique avec une hauteur fixe de 320px
        <ResponsiveContainer width='100%' height='100%'>  // Composant de conteneur réactif, pour que le graphique prenne toute la largeur et la hauteur du parent
          <LineChart data={userGrowthData}>  // Création du graphique linéaire avec les données `userGrowthData`
            <CartesianGrid strokeDasharray='3 3' stroke='#374151' />  // Grille cartésienne avec des lignes pointillées de couleur grise
            <XAxis dataKey='month' stroke='#9CA3AF' />  // Axe des X, utilisant les mois comme clé pour les labels (avec une couleur gris clair)
            <YAxis stroke='#9CA3AF' />  // Axe des Y (nombre d'utilisateurs) avec une couleur gris clair
            <Tooltip  // Composant d'infobulle qui affiche des informations au survol des points
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",  // Style du fond de l'infobulle (couleur foncée semi-transparente)
                borderColor: "#4B5563",  // Couleur de la bordure de l'infobulle
              }}
              itemStyle={{ color: "#E5E7EB" }}  // Style de texte dans l'infobulle (couleur claire)
            />
            <Line
              type='monotone'  // Type de ligne, ici une courbe lisse (monotone)
              dataKey='users'  // La clé des données à afficher sur la ligne (ici, le nombre d'utilisateurs)
              stroke='#8B5CF6'  // Couleur de la ligne (violet)
              strokeWidth={2}  // Largeur de la ligne (2 pixels)
              dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}  // Personnalisation des points sur la ligne : couleur violet, contour de 2 pixels, rayon de 4 pixels
              activeDot={{ r: 8 }}  // Taille du point actif (lorsqu'il est survolé) avec un rayon de 8 pixels
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default UserGrowthChart;  // Exportation du composant pour l'utiliser dans d'autres parties de l'application
