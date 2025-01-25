// Importation des composants nécessaires de "recharts" pour créer un graphique linéaire
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
// Importation de "motion" pour ajouter des animations avec "framer-motion"
import { motion } from "framer-motion";

// Données des ventes mensuelles (par exemple, les ventes de chaque mois)
const salesData = [
	{ name: "Jul", sales: 4200 },
	{ name: "Aug", sales: 3800 },
	{ name: "Sep", sales: 5100 },
	{ name: "Oct", sales: 4600 },
	{ name: "Nov", sales: 5400 },
	{ name: "Dec", sales: 7200 },
	{ name: "Jan", sales: 6100 },
	{ name: "Feb", sales: 5900 },
	{ name: "Mar", sales: 6800 },
	{ name: "Apr", sales: 6300 },
	{ name: "May", sales: 7100 },
	{ name: "Jun", sales: 7500 },
];

// Définition du composant SalesOverviewChart
const SalesOverviewChart = () => {
	return (
		// Utilisation de "motion.div" pour ajouter une animation au conteneur du graphique
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			// Animation : initialisation avec une opacité de 0 et une translation vers le bas (y: 20)
			// Lors de l'animation, l'opacité devient 1 et la translation vers le bas est annulée (y: 0)
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			// Délai avant le début de l'animation (0.2 secondes)
			transition={{ delay: 0.2 }}
		>
			{/* Titre du graphique */}
			<h2 className='text-lg font-medium mb-4 text-gray-100'>Sales Overview</h2>

			{/* Conteneur pour le graphique avec une hauteur fixe */}
			<div className='h-80'>
				{/* ResponsiveContainer permet au graphique de s'adapter à la taille de son conteneur parent */}
				<ResponsiveContainer width={"100%"} height={"100%"}>
					{/* Composant LineChart pour afficher un graphique linéaire */}
					<LineChart data={salesData}>
						{/* Grille pour le graphique (lignes horizontales et verticales) */}
						<CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
						{/* Axe des X représentant les mois (nom des mois) */}
						<XAxis dataKey={"name"} stroke='#9ca3af' />
						{/* Axe des Y représentant les valeurs des ventes */}
						<YAxis stroke='#9ca3af' />
						{/* Tooltip affiché lorsque l'utilisateur survole une ligne du graphique */}
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)", // Couleur de fond du tooltip
								borderColor: "#4B5563", // Couleur de la bordure du tooltip
							}}
							itemStyle={{ color: "#E5E7EB" }} // Couleur du texte dans le tooltip
						/>
						{/* Ligne du graphique représentant les ventes */}
						<Line
							type='monotone' // Type de ligne : monotone (lisse)
							dataKey='sales' // Clé des données à afficher sur la ligne (ventes)
							stroke='#6366F1' // Couleur de la ligne
							strokeWidth={3} // Largeur de la ligne
							/* Style des points de données */
							dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }} // Points de données (rond bleu avec bordure)
							/* Style du point actif lorsqu'il est survolé */
							activeDot={{ r: 8, strokeWidth: 2 }} // Point actif (lors du survol)
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

// Exportation du composant pour l'utiliser dans d'autres fichiers
export default SalesOverviewChart;
