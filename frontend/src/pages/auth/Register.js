import { TiUserAddOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { Card } from '../../components';

import styles from '../../styles/auth.module.scss';

const Register = () => {
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={40} color="gray" />
          </div>
          <h2>Register</h2>

          <form>
            <input type="text" name="name" placeholder="Enter name" required />
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
            <input
              type="password"
              name="password2"
              placeholder="Confirm password"
              required
            />
            <button class="--btn --btn-primary --btn-block" type="submit">
              Register
            </button>
          </form>

          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p> &nbsp; Already have an account? &nbsp;</p>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};
export default Register;
