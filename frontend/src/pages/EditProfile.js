import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { Card } from '../components';
import { selectUser } from '../redux/features/auth';
import '../styles/Profile.scss';
import { Link } from 'react-router-dom';

const EditProfile = () => {
  const user = useSelector(selectUser);

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  };

  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleInputChange = e => {
    const { name, value } = e.target;

    setProfile({
      ...profile,
      [name]: value,
    });
  };

  // Handle image change
  const handleImageChange = e => {
    const imgUrl = e.target.files[0];
    setProfileImage(imgUrl);
  };

  const saveProfile = e => {
    e.preventDefault();
  };

  return (
    <div className="profile --my2">
      {isLoading && (
        <Loader size={35} borderColor="white" borderTopColor="#007bff" />
      )}
      <>
        <Card cardClass={`card --flex-dir-column`}>
          <span className="profile-photo">
            <img src={user?.photo} alt={user?.name} />
          </span>
          <form className="--form-control">
            <span className="profile-data">
              <h4>Edit Profile Information</h4>
              <p>
                <label>Name: </label>
                <input
                  type="text"
                  name="name"
                  value={profile?.name}
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <label>Email: </label>
                <input
                  type="email"
                  name="email"
                  value={profile?.email}
                  disabled
                />
              </p>
              <br />
              <code>Email can not be changed.</code>
              <p>
                <label>Phone: </label>
                <input
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  name="phone"
                  value={profile?.phone}
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <label>Bio: </label>
                <textarea
                  name="bio"
                  value={profile?.bio}
                  onChange={handleInputChange}
                  cols="30"
                  rows="10"
                ></textarea>
              </p>
              <p>
                <label>Photo: </label>
                <input type="file" name="image" onChange={handleImageChange} />
              </p>
              <div>
                <button className="--btn --btn-primary">Save Changes</button>
              </div>
            </span>
          </form>
        </Card>
      </>
    </div>
  );
};
export default EditProfile;
