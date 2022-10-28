import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, Sidebar } from './components';
import {
  Home,
  Login,
  Register,
  ResetPassword,
  ForgotPassword,
  NotFound,
  Dashboard,
} from './pages';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
