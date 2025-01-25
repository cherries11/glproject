// Importation de la bibliothèque "framer-motion" pour utiliser les animations
import { motion } from "framer-motion";

// Définition du composant StatCard qui reçoit des props : name, icon, value et color
const StatCard = ({ name, icon: Icon, value, color }) => {
	return (
		// Le composant motion.div permet d'ajouter des animations à la div
		<motion.div
			// Classes Tailwind CSS pour le style de la carte : arrière-plan gris, opacité, flou, ombre, bords arrondis, et bordure grise
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700'
			// Animation au survol : élévation de la carte (y: -5) et ajout d'une ombre portée (boxShadow)
			whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
		>
			{/* Conteneur principal pour le contenu de la carte, avec un padding adapté */}
			<div className='px-4 py-5 sm:p-6'>
				{/* Ligne pour afficher le nom de la statistique et l'icône associée */}
				<span className='flex items-center text-sm font-medium text-gray-400'>
					{/* Affichage de l'icône passée en prop avec une taille de 20px, une marge à droite et une couleur dynamique basée sur la prop `color` */}
					<Icon size={20} className='mr-2' style={{ color }} />
					{/* Affichage du nom de la statistique */}
					{name}
				</span>
				{/* Affichage de la valeur principale de la statistique avec un style plus grand et en gras */}
				<p className='mt-1 text-3xl font-semibold text-gray-100'>{value}</p>
			</div>
		</motion.div>
	);
};

// Exportation du composant pour qu'il puisse être utilisé dans d'autres fichiers
export default StatCard;
