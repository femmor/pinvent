import useRedirectLoggedOut from '../hooks/useRedirectLoggedOut';

const Dashboard = () => {
  useRedirectLoggedOut('/login');
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
};
export default Dashboard;
