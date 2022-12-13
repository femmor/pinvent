import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../redux/features/auth';
import { updateUser } from '../services/authService';
import { Loader } from '../components/Loader';
import { Card, ChangePassword } from '../components';
import '../styles/Profile.scss';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditProfile = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const { email } = user;

  useEffect(() => {
    if (!email) {
      navigate('/profile');
    }
  }, [email, navigate]);

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

  const saveProfile = async e => {
    e.preventDefault();

    setIsLoading(true);

    try {
      let imgUrl;
      if (
        profileImage &&
        (profileImage.type === 'image/jpeg' ||
          profileImage.type === 'image/jpg' ||
          profileImage.type === 'image/png')
      ) {
        const image = new FormData();
        image.append('file', profileImage);
        image.append('cloud_name', 'femmycodes');
        image.append('upload_preset', 'cd8urikg');

        // First save image to cloudinary
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/femmycodes/image/upload',
          {
            method: 'post',
            body: image,
          }
        );
        const imageData = await response.json();
        imgUrl = imageData.url.toString();
      }

      // Save Profile
      const formData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: profileImage ? imgUrl : profile.photo,
      };

      const data = await updateUser(formData);
      toast.success('User updated!');
      navigate('/profile');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
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
          <form className="--form-control" onSubmit={saveProfile}>
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

        <ChangePassword />
      </>
    </div>
  );
};
export default EditProfile;
