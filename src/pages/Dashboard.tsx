import Navbar from "../components/NavBar";

const Dashboard: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="dashboard-content">
          <h2>Welcome to your Dashboard</h2>
          <p>This is a protected route.</p>
      </div>
    </>
  );
};

export default Dashboard;
