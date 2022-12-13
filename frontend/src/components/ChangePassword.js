import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../services/authService';
import { toast } from 'react-toastify';
import '../styles/ChangePassword.scss';
import Card from './Card';

const initialState = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

const ChangePassword = () => {
  const [formData, setFormData] = useState(initialState);
  const { oldPassword, newPassword, confirmNewPassword } = formData;

  const navigate = useNavigate();

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const changePassword = async e => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      return toast.error('New passwords do not match!');
    }

    const formData = {
      oldPassword,
      newPassword,
    };

    const data = await updatePassword(formData);
    toast.success(data.message);
    setFormData(initialState);
    navigate('/profile');
  };

  return (
    <div className="change-password">
      <Card cardClass={`password-card`}>
        <h3>Reset Password</h3>
        <form className="--form-control" onSubmit={changePassword}>
          <input
            type="password"
            name="oldPassword"
            value={oldPassword}
            onChange={handleInputChange}
            placeholder="Old Password"
          />
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={handleInputChange}
            placeholder="New Password"
          />
          <input
            type="password"
            name="confirmNewPassword"
            value={confirmNewPassword}
            onChange={handleInputChange}
            placeholder="Confirm New Password"
          />
          <button type="submit" className="--btn --btn-primary">
            Change Password
          </button>
        </form>
      </Card>
    </div>
  );
};
export default ChangePassword;
