import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as bnbService from "../../services/bnbService";
import "./listingCard.css";

const Listings = ({ listings }) => {
  const [randomImages, setRandomImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const images = await bnbService.apiImages();
      setRandomImages(images);
    };
    fetchImages();
  }, []);

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

  return (
    <main>
      <h1>Listings</h1>
      <div className="grid-container">
        {listings.length ? (
          listings.map((listing, index) => (
            <div key={listing._id} className="card">
              {randomImages.length > 0 ? (
                <img
                  src={randomImages[index % randomImages.length]}
                  alt={listing.title}
                />
              ) : (
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    backgroundColor: "#f0f0f0",
                  }}
                ></div>
              )}
              <h2>{listing.title}</h2>
              <p>{listing.description}</p>
              <p className="price">Price: ${listing.price}/night</p>
              <p className="location">
                Location: {listing.location.city}, {listing.location.state},{" "}
                {listing.location.country}
              </p>
              <p>Available Dates: {formatDateRange(listing.available_dates)}</p>
              <p>
                {listing.isBooked
                  ? "Currently Booked"
                  : "Available for Booking"}
              </p>
              <p>Owner: {listing.owner ? listing.owner.username : "Unknown"}</p>
              <div className="button-container">
                <Link className="button" to={`/listings/${listing._id}`}>
                  View Details
                </Link>
                <Link className="button" to={`/reviews/new/${listing._id}`}>
                  Add Review
                </Link>
                <Link className="button" to={`/reviews/find/${listing._id}`}>
                  View Reviews
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No listings available.</p>
        )}
      </div>
    </main>
  );
};

export default Listings;
