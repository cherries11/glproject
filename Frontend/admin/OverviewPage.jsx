import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react"; // Importing icons from lucide-react
import { motion } from "framer-motion"; // Importing motion for animation
import SalesOverviewChart from "../../components/overview/SalesOverviewChart"; // Importing SalesOverviewChart component
import Header from "../../components/common/Header"; // Importing Header component to display the page title
import StatCard from "../../components/common/StatCard"; // Importing StatCard component to display statistics
import CategoryDistributionChart from "../../components/overview/CategoryDistributionChart"; // Importing CategoryDistributionChart component
import SalesChannelChart from "../../components/overview/SalesChannelChart"; // Importing SalesChannelChart component

const OverviewPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      {/* Header component to show the title "Overview" */}
      <Header title="Overview" />
  
      {/* Main content section */}
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        
        {/* STATS Section */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }} // Initial animation state
          animate={{ opacity: 1, y: 0 }} // Final animation state
          transition={{ duration: 1 }} // Transition duration for the animation
        >
          {/* StatCard Components to display key statistics */}
          <StatCard name="Total Sales" icon={Zap} value="$12,345" color="#6366F1" />
          <StatCard name="New Users" icon={Users} value="1,234" color="#8B5CF6" />
          <StatCard name="Total Products" icon={ShoppingBag} value="567" color="#EC4899" />
          <StatCard name="Conversion Rate" icon={BarChart2} value="12.5%" color="#10B981" />
        </motion.div>

        {/* CHARTS Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Various charts for sales overview, category distribution, and sales channels */}
          <SalesOverviewChart />
          <CategoryDistributionChart />
          <SalesChannelChart />
        </div>
      </main>
    </div>
  );
};

export default OverviewPage;
