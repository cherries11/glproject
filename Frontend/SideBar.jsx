import { BarChart2, DollarSign, Menu, ShoppingBag, Users } from "lucide-react"; // Importing icons from lucide-react
import { useState } from "react"; // useState hook to manage state
import { AnimatePresence, motion } from "framer-motion"; // Importing animation tools from Framer Motion
import { Link } from "react-router-dom"; // Link component for navigation

// Sidebar items configuration (name, icon, color, and the route)
const SIDEBAR_ITEMS = [
  { name: "Overview", icon: BarChart2, color: "#6366f1", href: "/admin" }, // Overview item
  { name: "Products", icon: ShoppingBag, color: "#8B5CF6", href: "/admin/products" }, // Products item
  { name: "Users", icon: Users, color: "#EC4899", href: "/admin/users" }, // Users item
  { name: "Offers", icon: DollarSign, color: "#10B981", href: "/admin/offers" }, // Offers item
];

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to toggle the sidebar open/close

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? "w-64" : "w-20"}`} // Sidebar width transitions based on isSidebarOpen state
      animate={{ width: isSidebarOpen ? 256 : 80 }} // Animate width changes on state change
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700"> {/* Sidebar container with background and padding */}
        
        {/* Button to toggle sidebar open/close */}
        <motion.button
          whileHover={{ scale: 1.1 }} // Scale effect on hover
          whileTap={{ scale: 0.9 }} // Scale effect when tapped (pressed)
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle sidebar state
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit" // Styling the button
        >
          <Menu size={24} /> {/* Menu icon for toggling sidebar */}
        </motion.button>

        {/* Sidebar navigation links */}
        <nav className="mt-8 flex-grow"> 
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}> {/* Link to corresponding route */}
              <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
                <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} /> {/* Display icon with dynamic color */}
                {/* Conditionally render the name of the item depending on sidebar state */}
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className='ml-4 whitespace-nowrap'
                      initial={{ opacity: 0, width: 0 }} // Start with hidden label
                      animate={{ opacity: 1, width: "auto" }} // Animate label appearance when sidebar is open
                      exit={{ opacity: 0, width: 0 }} // Hide the label when sidebar closes
                      transition={{ duration: 0.2, delay: 0.3 }} // Transition settings for label appearance
                    >
                      {item.name} {/* Item name */}
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

export default SideBar;
