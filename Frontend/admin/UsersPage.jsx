import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react"; // Importing icons from lucide-react
import { motion } from "framer-motion"; // Importing motion for animation effects

import Header from "../../components/common/Header"; // Importing the Header component to display the page title
import StatCard from "../../components/common/StatCard"; // Importing StatCard component for displaying key stats
import UsersTable from "../../components/users/UsersTable"; // Importing UsersTable component to display a table of users
import UserGrowthChart from "../../components/users/UserGrowthChart"; // Importing the UserGrowthChart component to show user growth over time
import UserActivityHeatmap from "../../components/users/UserActivityHeatmap"; // Importing the UserActivityHeatmap component to visualize user activity
import UserDemographicsChart from "../../components/users/UserDemographicsChart"; // Importing the UserDemographicsChart component to show demographic distribution

// Static data for user statistics
const userStats = {
  totalUsers: 152845, // Total number of users
  newUsersToday: 243, // New users added today
  activeUsers: 98520, // Active users
  churnRate: "2.4%", // Churn rate (percentage of users lost)
};

const UsersPage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      {/* Header section with the title "Users" */}
      <Header title='Users' />

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        
        {/* STATS Section */}
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }} // Initial animation state for stats section
          animate={{ opacity: 1, y: 0 }} // Final animation state for stats section
          transition={{ duration: 1 }} // Duration of the animation
        >
          {/* StatCard components to display key user statistics */}
          <StatCard
            name='Total Users'
            icon={UsersIcon}
            value={userStats.totalUsers.toLocaleString()} // Format number with commas for readability
            color='#6366F1' // Color for this stat card
          />
          <StatCard
            name='New Users Today'
            icon={UserPlus}
            value={userStats.newUsersToday} // Display number of new users today
            color='#10B981' // Color for this stat card
          />
          <StatCard
            name='Active Users'
            icon={UserCheck}
            value={userStats.activeUsers.toLocaleString()} // Format number of active users
            color='#F59E0B' // Color for this stat card
          />
          <StatCard
            name='Churn Rate'
            icon={UserX}
            value={userStats.churnRate} // Display the churn rate as a percentage
            color='#EF4444' // Color for this stat card
          />
        </motion.div>

        {/* Users Table: A table displaying detailed user information */}
        <UsersTable />

        {/* USER CHARTS Section */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
          {/* Charts to visualize user data */}
          <UserGrowthChart /> {/* Chart showing user growth over time */}
          <UserActivityHeatmap /> {/* Heatmap to visualize user activity */}
          <UserDemographicsChart /> {/* Chart showing user demographics distribution */}
        </div>
      </main>
    </div>
  );
};

export default UsersPage;
