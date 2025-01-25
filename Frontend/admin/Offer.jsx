import Header from "../../components/common/Header"; // Importing the Header component to display the page title
import DailySalesTrend from "../../components/offers/DailySalesTrend"; // Importing the DailySalesTrend component to display the sales trend chart

const SalesPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      {/* Header component displaying the title of the page */}
      <Header title="Products" />
      
      {/* USER CHARTS Section */}
      <div className="grid grid-cols-0 lg:grid-cols-1 gap-6 mt-8">
        {/* The DailySalesTrend component that shows the daily sales data chart */}
        <DailySalesTrend />
      </div>
    </div>
  );
}

export default SalesPage;
