import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as bnbService from "../../services/bnbService";
import * as authService from "../../services/authService";

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
      const updatedProfile = await bnbService.updatedProfile(formData);
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
    <main>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
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
      {profile.isHost && profile.listings && (
        <div>
          <h2>Your Listings</h2>
          {profile.listings.map((listing) => (
            <div key={listing._id}>
              <h3>{listing.title}</h3>
              <p>{listing.description}</p>
              <p>Price: ${listing.price}</p>
              <p>Location: {listing.location}</p>
              {/* <Link to={`/listings/manage/${listing._id}`}>Edit Listing</Link> */}
            </div>
          ))}
        </div>
      )}
    </main>
  );
};
export default Profile;
