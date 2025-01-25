import { motion } from "framer-motion"; // Importing motion for animation
import Header from "../../components/common/Header"; // Importing Header component to show the page title
import StatCard from "../../components/common/StatCard"; // Importing StatCard component for displaying key stats
import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react"; // Importing icons from lucide-react
import ProductsTable from "../../components/products/ProductsTable"; // Importing ProductsTable component to display the list of products
import CategoryDistributionChart from "../../components/overview/CategoryDistributionChart"; // Importing CategoryDistributionChart component
import SalesTrendChart from "../../components/products/SalesTrendChart"; // Importing SalesTrendChart component for visualizing sales trends

const ProductsPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      {/* Header component to show the title "Products" */}
      <Header title="Products" />

      {/* Main content section */}
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        
        {/* STATS Section */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }} // Initial animation state for stats section
          animate={{ opacity: 1, y: 0 }} // Final animation state for stats section
          transition={{ duration: 1 }} // Duration of the animation
        >
          {/* StatCard Components to display key statistics */}
          <StatCard name="Total Products" icon={Package} value={1234} color="#6366F1" />
          <StatCard name="Top Selling" icon={TrendingUp} value={89} color="#10B981" />
          <StatCard name="Low Stock" icon={AlertTriangle} value={23} color="#F59E0B" />
          <StatCard name="Total Revenue" icon={DollarSign} value={"$543,210"} color="#EF4444" />
        </motion.div>

        {/* Table displaying list of products */}
        <ProductsTable />

        {/* CHARTS Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Various charts for sales trends and category distribution */}
          <SalesTrendChart />
          <CategoryDistributionChart />
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
