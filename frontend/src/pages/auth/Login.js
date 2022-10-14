import { BiLogIn } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { Card } from '../../components';

import styles from '../../styles/auth.module.scss';

const Login = () => {
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <BiLogIn size={40} color="gray" />
          </div>
          <h2>Login</h2>

          <form>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              required
            />
            <button className="--btn --btn-primary --btn-block" type="submit">
              Login
            </button>
          </form>

          <Link to="/forgot-password" className={styles.forgot}>
            Forgot Password?
          </Link>
          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p> &nbsp; Don't have an account? &nbsp;</p>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};
export default Login;
