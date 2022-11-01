import { useState } from 'react';
import { TiUserAddOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { Card } from '../../components';

import styles from '../../styles/auth.module.scss';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const register = e => {
    e.preventDefault();

    console.log(formData);
  };

  // Destructure form data
  const { name, email, password, confirmPassword } = formData;

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={40} color="gray" />
          </div>
          <h2>Register</h2>

          <form onSubmit={register}>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              required
              value={name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              required
              value={confirmPassword}
              onChange={handleInputChange}
            />
            <button className="--btn --btn-primary --btn-block" type="submit">
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
