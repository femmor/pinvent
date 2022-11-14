import { useState } from 'react';
import { AiOutlineUnlock } from '../../utils/icons';
import { Link, useParams } from 'react-router-dom';
import { Card } from '../../components';
import { toast } from 'react-toastify';

import styles from '../../styles/auth.module.scss';
import { resetPassword } from '../../services/authService';

const initialState = {
  password: '',
  confirmPassword: '',
};

const ResetPassword = () => {
  const [formData, setFormData] = useState(initialState);
  const { password, confirmPassword } = formData;

  const { resetToken } = useParams();

  const handlePasswordChange = e => {
    const { value, name } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const reset = async e => {
    e.preventDefault();

    // Validate password
    if (password.length < 6) {
      toast.error('Password must be up to 6 characters');
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    }

    const userData = {
      password,
      confirmPassword,
    };

    try {
      const data = await resetPassword(userData, resetToken);
      toast.success(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineUnlock size={40} color="gray" />
          </div>
          <h2>Reset Password</h2>

          <form onSubmit={reset}>
            <input
              type="password"
              name="password"
              placeholder="New password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              required
              value={confirmPassword}
              onChange={handlePasswordChange}
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
