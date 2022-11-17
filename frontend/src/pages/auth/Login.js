import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BiLogIn } from '../../utils/icons';
import { Link } from 'react-router-dom';
import { Card } from '../../components';
import { toast } from 'react-toastify';
import { validateEmail, loginUser } from '../../services/authService';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth';

import styles from '../../styles/auth.module.scss';
import { Loader } from '../../components/Loader';

const initialState = {
  email: 'test@test.com',
  password: 'abc123',
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  // Destructure form data
  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = e => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const login = async e => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('All fields are required!');
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email');
    }

    const userData = {
      email,
      password,
    };

    setIsLoading(true);

    try {
      const data = await loginUser(userData);
      setIsLoading(false);
      dispatch(SET_LOGIN(true));
      dispatch(SET_NAME(data.name));
      navigate('/dashboard');
    } catch (error) {
      setIsLoading(false);
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
            <BiLogIn size={40} color="gray" />
          </div>
          <h2>Login</h2>

          <form onSubmit={login}>
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
