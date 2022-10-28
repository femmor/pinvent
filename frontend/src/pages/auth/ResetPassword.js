import { AiOutlineUnlock } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Card } from '../../components';

import styles from '../../styles/auth.module.scss';

const ResetPassword = () => {
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineUnlock size={40} color="gray" />
          </div>
          <h2>Reset Password</h2>

          <form>
            <input
              type="password"
              name="newPassword"
              placeholder="New password"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              required
            />

            <button className="--btn --btn-primary --btn-block" type="submit">
              Reset Password
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
export default ResetPassword;
