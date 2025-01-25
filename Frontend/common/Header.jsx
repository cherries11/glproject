// Définition du composant Header qui reçoit une prop "title"
const Header = ({ title }) => {
	return (
		// L'élément <header> pour la section d'en-tête
		<header className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700'>
			{/* Conteneur pour le contenu de l'en-tête */}
			<div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8'>
				{/* Affichage du titre reçu en prop */}
				<h1 className='text-2xl font-semibold text-gray-100'>{title}</h1>
			</div>
		</header>
	);
};

// Exportation du composant pour qu'il soit utilisé dans d'autres parties du projet
export default Header;
