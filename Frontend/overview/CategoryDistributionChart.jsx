// Importation de la bibliothèque "framer-motion" pour ajouter des animations
import { motion } from "framer-motion";
// Importation des composants nécessaires de la bibliothèque "recharts" pour créer un graphique circulaire (pie chart)
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Définition des données à afficher dans le graphique (répartition des catégories)
const categoryData = [
	{ name: "Coupe de cheveux", value: 4500 },
	{ name: "Coloration", value: 3200 },
	{ name: "Soin capillaire", value: 2800 },
	{ name: "Soins anti-âge", value: 2100 },
	{ name: "Lissage brésilien", value: 1900 },
];

// Définition des couleurs pour chaque segment du graphique
const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

// Définition du composant CategoryDistributionChart
const CategoryDistributionChart = () => {
	return (
		// Utilisation de "motion.div" pour appliquer une animation au conteneur de la carte
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			// Animation : initialisation avec une opacité de 0 et une translation vers le bas (y: 20)
			// Lors de l'animation, l'opacité devient 1 et la translation vers le bas est annulée (y: 0)
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			// Délai avant l'animation (0.3 secondes)
			transition={{ delay: 0.3 }}
		>
			{/* Titre du graphique */}
			<h2 className='text-lg font-medium mb-4 text-gray-100'>Category Distribution</h2>
			{/* Conteneur pour le graphique avec une hauteur fixe */}
			<div className='h-80'>
				{/* ResponsiveContainer garantit que le graphique s'adapte à la largeur et à la hauteur du parent */}
				<ResponsiveContainer width={"100%"} height={"100%"}>
					{/* Composant PieChart pour dessiner le graphique circulaire */}
					<PieChart>
						{/* Composant Pie pour afficher les données dans le graphique circulaire */}
						<Pie
							data={categoryData} // Données à afficher
							cx={"50%"} // Position horizontale du centre du cercle
							cy={"50%"} // Position verticale du centre du cercle
							labelLine={false} // Désactive la ligne reliant les étiquettes aux segments
							outerRadius={80} // Rayon du cercle externe
							fill='#8884d8' // Couleur de remplissage par défaut des segments
							dataKey='value' // Propriété des données à afficher
							// Fonction pour afficher l'étiquette de chaque segment avec son nom et le pourcentage
							label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
						>
							{/* Cellules de chaque segment, avec une couleur différente pour chaque segment */}
							{categoryData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						{/* Composant Tooltip pour afficher des informations détaillées lorsque l'on survole un segment */}
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)", // Couleur de fond du tooltip
								borderColor: "#4B5563", // Couleur de la bordure du tooltip
							}}
							itemStyle={{ color: "#E5E7EB" }} // Couleur des éléments du tooltip
						/>
						{/* Composant Legend pour afficher la légende en bas du graphique */}
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

// Exportation du composant pour qu'il puisse être utilisé dans d'autres fichiers
export default CategoryDistributionChart;
