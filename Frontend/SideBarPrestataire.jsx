import { BarChart2, DollarSign, Menu, ShoppingBag } from "lucide-react"; // Importing icons from lucide-react
import { useState } from "react"; // Importing the useState hook to manage state
import { AnimatePresence, motion } from "framer-motion"; // Importing animation tools from Framer Motion
import { Link } from "react-router-dom"; // Importing Link from React Router for navigation

// Configuration for the sidebar items, each item has a name, icon, color, and href (the path to link to)
const SIDEBAR_ITEMS = [
  { name: "Rendez-vous", icon: BarChart2, color: "#6366f1", href: "/prestataire/rendez-vous" },
  { name: "Planning", icon: ShoppingBag, color: "#8B5CF6", href: "/prestataire/planning" },
  { name: "Profile", icon: DollarSign, color: "#10B981", href: "/prestataire/profile" },
];

// Sidebar component
const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to toggle sidebar open/close

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`} // Animates sidebar width based on isSidebarOpen state
      animate={{ width: isSidebarOpen ? 256 : 80 }} // Animates the width change when isSidebarOpen changes
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        {/* Button to toggle the sidebar open/close */}
        <motion.button
          whileHover={{ scale: 1.1 }} // Increases scale when hovered
          whileTap={{ scale: 0.9 }} // Decreases scale when tapped
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle the sidebar open/close
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <Menu size={24} /> {/* Menu icon for the sidebar toggle button */}
        </motion.button>
        
        <nav className="mt-8 flex-grow">
          {/* Iterate over SIDEBAR_ITEMS and render a Link for each one */}
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}> {/* Link to the path defined in href */}
              <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
                {/* Render the icon for the sidebar item */}
                <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                
                {/* Conditionally render the name of the item depending on if the sidebar is open */}
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }} // Initial state of the name (hidden)
                      animate={{ opacity: 1, width: "auto" }} // Animate to make the name visible
                      exit={{ opacity: 0, width: 0 }} // Hide the name when exiting
                      transition={{ duration: 0.2, delay: 0.3 }} // Define transition duration and delay
                    >
                      {item.name} {/* Item's name */}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;
