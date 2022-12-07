import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useRedirectLoggedOut from '../hooks/useRedirectLoggedOut';
import { SET_NAME, SET_USER } from '../redux/features/auth';
import { getUser } from '../services/authService';
import '../styles/Profile.scss';

const Profile = () => {
  useRedirectLoggedOut('/login');

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  // Fetch userData
  useEffect(() => {
    setIsLoading(true);

    async function fetchUserData() {
      const userData = await getUser();

      setProfile(userData);
      setIsLoading(false);
      dispatch(SET_USER(userData));
      dispatch(SET_NAME(userData.name));
    }

    fetchUserData();
  }, [dispatch]);

  return <div className="profile">Profile</div>;
};
export default Profile;
