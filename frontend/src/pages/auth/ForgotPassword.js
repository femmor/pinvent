import { useState } from 'react';
import { validateEmail } from '../../services/authService';
import { forgotPassword } from '../../services/authService';
import { AiOutlineMail } from '../../utils/icons';
import { Link } from 'react-router-dom';
import { Card } from '../../components';
import { toast } from 'react-toastify';

import styles from '../../styles/auth.module.scss';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const forgot = async e => {
    e.preventDefault();

    // Validate email
    if (!email) {
      toast.error('Please enter an email address.');
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email.');
    }

    const userData = {
      email,
    };

    setIsLoading(true);

    try {
      await forgotPassword(userData);
      setIsLoading(false);
      setEmail('');
      // navigate('/dashboard');
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineMail size={40} color="gray" />
          </div>
          <h2>Forgot Password</h2>

          <form onSubmit={forgot}>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
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
