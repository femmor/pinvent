import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useRedirectLoggedOut from '../hooks/useRedirectLoggedOut';
import { SET_NAME, SET_USER } from '../redux/features/auth';
import { getUser } from '../services/authService';
import { Loader } from '../components/Loader';
import { Card } from '../components';
import '../styles/Profile.scss';
import { Link } from 'react-router-dom';

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

  return (
    <div className="profile --my2">
      {isLoading && (
        <Loader size={35} borderColor="white" borderTopColor="#007bff" />
      )}
      <>
        {!isLoading && profile === null ? (
          <>Something went wrong, please reload the page.</>
        ) : (
          <Card cardClass={`card --flex-dir-column`}>
            <span className="profile-photo">
              <img src={profile?.photo} alt={profile?.name} />
            </span>
            <span className="profile-data">
              <h4>Profile Information</h4>
              <p>
                <b>Name: </b>
                {profile?.name}
              </p>
              <p>
                <b>Email: </b>
                {profile?.email}
              </p>
              <p>
                <b>Phone: </b>
                {profile?.phone}
              </p>
              <p>
                <b>Bio: </b>
                {profile?.bio}
              </p>
              <div>
                <Link to="/edit-profile">
                  <button className="--btn --btn-primary">Edit Profile</button>
                </Link>
              </div>
            </span>
          </Card>
        )}
      </>
    </div>
  );
};
export default Profile;
