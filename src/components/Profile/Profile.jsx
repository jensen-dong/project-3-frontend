import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as bnbService from "../../services/bnbService";
import * as authService from "../../services/authService";
import "./Profile.css";

const Profile = ({ setUser }) => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
    bio: "",
    address: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await bnbService.getProfile();
        setProfile(profileData);
        setFormData({
          username: profileData.username,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          email: profileData.email,
          phone_number: profileData.phone_number,
          bio: profileData.bio || "",
          address: profileData.address || "",
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const updatedProfile = await bnbService.updateProfile(formData);
      setProfile(updatedProfile);
      setMessage("Profile is updated!");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await bnbService.deleteProfile();
      authService.signout();
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Account</h1>
        <p>{profile.firstName} {profile.lastName}, {profile.email} · <Link to="/profile">Go to profile</Link></p>
      </div>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled
          />
        </label>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </label>
        <label>
          Bio:
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          ></textarea>
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Profile</button>
        <button type="button" onClick={handleDelete}>
          DELETE Profile
        </button>
      </form>
      {message && <p>{message}</p>}
      {profile.isHost && (
        <div className="profile-grid-container">
          <div className="profile-grid-item">
            <h3>Your Listings</h3>
            <p>Manage and view your listings.</p>
            <Link to="/mylistings">Manage Listings</Link>
          </div>
          <div className="profile-grid-item">
            <h3>Rent Your Property</h3>
            <p>Add a new property to rent.</p>
            <Link to="/listings/new">Rent Your Property</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;