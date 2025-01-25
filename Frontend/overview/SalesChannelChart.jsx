// Importation de la bibliothèque "framer-motion" pour les animations
import { motion } from "framer-motion";
// Importation des composants nécessaires de "recharts" pour créer un graphique en barres
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

// Définition des couleurs pour chaque barre du graphique
const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

// Données pour chaque canal de vente (site web, application mobile, etc.)
const SALES_CHANNEL_DATA = [
	{ name: "Website", value: 45600 },
	{ name: "Mobile App", value: 38200 },
	{ name: "Marketplace", value: 29800 },
	{ name: "Social Media", value: 18700 },
];

// Définition du composant SalesChannelChart
const SalesChannelChart = () => {
	return (
		// Utilisation de "motion.div" pour ajouter une animation au conteneur du graphique
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-700'
			// Animation : initialisation avec une opacité de 0 et une translation vers le bas (y: 20)
			// Lors de l'animation, l'opacité devient 1 et la translation vers le bas est annulée (y: 0)
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			// Délai avant le début de l'animation (0.4 secondes)
			transition={{ delay: 0.4 }}
		>
			{/* Titre du graphique */}
			<h2 className='text-lg font-medium mb-4 text-gray-100'>Sales by Channel</h2>

			{/* Conteneur pour le graphique avec une hauteur fixe */}
			<div className='h-80'>
				{/* ResponsiveContainer permet au graphique de s'adapter à la taille de son conteneur parent */}
				<ResponsiveContainer>
					{/* Composant BarChart pour afficher un graphique à barres */}
					<BarChart data={SALES_CHANNEL_DATA}>
						{/* Grille pour le graphique (lignes horizontales et verticales) */}
						<CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
						{/* Axe des X avec des étiquettes basées sur le nom des canaux de vente */}
						<XAxis dataKey='name' stroke='#9CA3AF' />
						{/* Axe des Y pour les valeurs des ventes */}
						<YAxis stroke='#9CA3AF' />
						{/* Tooltip affiché lorsque l'utilisateur survole une barre du graphique */}
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)", // Couleur de fond du tooltip
								borderColor: "#4B5563", // Couleur de la bordure du tooltip
							}}
							itemStyle={{ color: "#E5E7EB" }} // Couleur du texte dans le tooltip
						/>
						{/* Légende affichée sous le graphique pour expliquer ce que chaque couleur représente */}
						<Legend />
						{/* Affichage des barres du graphique */}
						<Bar dataKey={"value"} fill='#8884d8'>
							{/* Pour chaque entrée de données, une cellule de couleur différente est appliquée */}
							{SALES_CHANNEL_DATA.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

// Exportation du composant pour l'utiliser dans d'autres fichiers
export default SalesChannelChart;
