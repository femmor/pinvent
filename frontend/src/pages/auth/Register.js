import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TiUserAddOutline } from '../../utils/icons';
import { Link } from 'react-router-dom';
import { Card } from '../../components';
import { toast } from 'react-toastify';
import { validateEmail, registerUser } from '../../services/authService';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth';

import styles from '../../styles/auth.module.scss';
import { Loader } from '../../components/Loader';

const initialState = {
  name: 'Test Name',
  email: 'test@test.com',
  password: 'abc123',
  confirmPassword: 'abc123',
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  // Destructure form data
  const { name, email, password, confirmPassword } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = e => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const register = async e => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error('All fields are required!');
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email');
    }

    if (password.length < 6) {
      toast.error('Password must be up to 6 characters');
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    }

    const userData = {
      name,
      email,
      password,
    };

    setIsLoading(true);

    try {
      const data = await registerUser(userData);
      setIsLoading(false);
      dispatch(SET_LOGIN(true));
      dispatch(SET_NAME(data.name));
      navigate('/dashboard');
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && (
        <Loader size={35} borderColor="white" borderTopColor="#007bff" />
      )}
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
