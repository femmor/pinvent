import { AiOutlineMail } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Card } from '../../components';

import styles from '../../styles/auth.module.scss';

const ForgotPassword = () => {
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineMail size={40} color="gray" />
          </div>
          <h2>Forgot Password</h2>

          <form>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              required
            />

            <button className="--btn --btn-primary --btn-block" type="submit">
              Get Reset Email
            </button>
            <span className={styles.links}>
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
            </span>
          </form>
        </div>
      </Card>
    </div>
  );
};
export default ForgotPassword;
