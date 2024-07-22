import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as bnbService from "../../services/bnbService";
import "./listingCard.css";

const ListingDetail = ({ listingId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [randomImage, setRandomImage] = useState(null);
  const Id = listingId || id;

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await bnbService.getListingById(Id);
        setListing(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();

    const fetchUser = async () => {
      try {
        const userData = await bnbService.getProfile();
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user profile", err);
      }
    };
    fetchUser();

    const fetchRandomImage = async () => {
      const images = await bnbService.apiImages();
      const randomIndex = Math.floor(Math.random() * images.length);
      setRandomImage(images[randomIndex]);
    };
    fetchRandomImage();
  }, [Id]);

  const formatDateRange = (dates) => {
    if (dates.length === 2) {
      const [start, end] = dates.map(
        (date) => new Date(date).toISOString().split("T")[0]
      );
      return `${start} to ${end}`;
    }
    return dates
      .map((date) => new Date(date).toISOString().split("T")[0])
      .join(", ");
  };

  if (loading) return <p>Loading...</p>;
  if (!listing) return <p>Listing not found.</p>;

  return (
    <main className="listing-details-main">
      <div className="card">
        <h1>{listing.title}</h1>
        <p>{listing.description}</p>
        <p className="price">Price: ${listing.price}/night</p>
        <p className="location">
          Location: {listing.location.city}, {listing.location.state},{" "}
          {listing.location.country}
        </p>
        {randomImage ? (
          <img src={randomImage} alt={listing.title} />
        ) : (
          <div
            style={{
              width: "200px",
              height: "200px",
              backgroundColor: "#f0f0f0",
            }}
          ></div>
        )}
        <p>Available Dates: {formatDateRange(listing.available_dates)}</p>
        <p>{listing.isBooked ? "Currently Booked" : "Available for Booking"}</p>
        <p>Owner: {listing.owner.username}</p>
        <div className="button-container">
          {user && user._id === listing.owner._id && (
            <Link className="button" to={`/listings/manage/${listing._id}`}>
              Edit Listing
            </Link>
          )}
          {user && user._id !== listing.owner._id && !listing.isBooked && (
            <button
              className="button"
              onClick={() => navigate(`/mybookings/new/${listing._id}`)}
            >
              Book Now
            </button>
          )}
          <Link className="button" to={`/reviews/new/${listing._id}`}>
            Add Review
          </Link>
          <Link className="button" to={`/reviews/find/${listing._id}`}>
            View Reviews
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ListingDetail;
