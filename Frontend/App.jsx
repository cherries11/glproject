import { Routes, Route, Navigate, useLocation } from "react-router-dom"; // Importing routing components and hook from react-router
import OverviewPage from "./pages/admin/OverviewPage"; // Admin overview page
import ProductsPage from "./pages/admin/ProductsPage"; // Admin products page
import UsersPage from "./pages/admin/UsersPage"; // Admin users page
import Offer from "./pages/admin/Offer"; // Admin offers page
import Planning from "./pages/prestataire/Planning"; // Prestataire planning page
import Profile from "./pages/prestataire/Profile"; // Prestataire profile page
import PrestataireDashboard from "./pages/prestataire/PrestataireDashboard"; // Prestataire dashboard page
import SideBar from "./components/SideBar"; // Admin sidebar component
import SideBarPrestataire from "./components/SideBarPrestataire"; // Prestataire sidebar component

function App() {
  // Using the `useLocation` hook to determine the current path
  const location = useLocation();

  // Checking whether the current route is for the Admin or Prestataire
  const isAdminRoute = location.pathname.startsWith("/admin"); // Determines if the route is part of the admin section
  const isPrestataireRoute = location.pathname.startsWith("/prestataire"); // Determines if the route is part of the Prestataire section

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Conditionally render Sidebar based on the route */}
      {isAdminRoute && <SideBar />} {/* Admin sidebar */}
      {isPrestataireRoute && <SideBarPrestataire />} {/* Prestataire sidebar */}

      {/* Main Content Area */}
      <div className="flex flex-col w-full">
        <Routes>
          {/* Routes for Admin */}
          <Route path="/admin" element={<OverviewPage />} /> {/* Admin overview page */}
          <Route path="/admin/products" element={<ProductsPage />} /> {/* Admin products page */}
          <Route path="/admin/users" element={<UsersPage />} /> {/* Admin users page */}
          <Route path="/admin/offers" element={<Offer />} /> {/* Admin offers page */}

          {/* Routes for Prestataire */}
          <Route path="/prestataire/dashboard" element={<PrestataireDashboard />} /> {/* Prestataire dashboard page */}
          <Route path="/prestataire/planning" element={<Planning />} /> {/* Prestataire planning page */}
          <Route path="/prestataire/profile" element={<Profile />} /> {/* Prestataire profile page */}

          {/* Default Redirection */}
          <Route path="/" element={<Navigate to="/admin" />} /> {/* Default redirect to /admin for admin user */}

          {/* Catch-all route for unmatched paths */}
          <Route path="*" element={<Navigate to={isAdminRoute ? "/admin" : "/prestataire/dashboard"} />} /> 
          {/* Redirects to the appropriate page based on user type */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
