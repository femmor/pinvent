import { Link } from 'react-router-dom';
import { RiProductHuntLine } from '../utils/icons';
import { NumberText } from '../components';

import '../styles/Home.scss';

import heroImg from '../assets/inv-img.png';
import { ShowOnLogin, ShowOnLogout } from '../components/HiddenLinks';

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between">
        <div className="logo">
          <RiProductHuntLine size={40} />
        </div>
        <ul className="home-links">
          <ShowOnLogout>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ShowOnLogout>
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/dashboard">Dashboard</Link>
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>

      {/* Hero */}
      <section className="container hero">
        <div className="hero-text">
          <h2>Inventory &amp; Stock Management Solution</h2>
          <p>
            Inventory system to control and manage products in the warehouse in
            real-time. Integrated to make it easier to develop your business.
          </p>
          <div className="hero-buttons">
            <button className="--btn --btn-secondary">
              <Link to="/dashboard">Free 1 month Trial</Link>
            </button>
          </div>
          <div className="--flex-start">
            <NumberText number="14k" text="Brand Owners" />
            <NumberText number="23k" text="Active Users" />
            <NumberText number="500+" text="Partners" />
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImg} alt="" />
        </div>
      </section>
    </div>
  );
};
export default Home;
