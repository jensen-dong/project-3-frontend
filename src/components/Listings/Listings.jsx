import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './listingCard.css'



const Listings = ({ listings }) => {
    const [randomImages, setRandomImages] = useState({})

    useEffect(() => {
        const fetchRandomImages = async () => {
            const images = {}
            for (const listing of listings) {
                const response = await fetch('https:picsum.photos/200')
                images[listing._id] = response.url
            }
            setRandomImages(images)
        }
        fetchRandomImages()
    }, [listings])
    
    const formatDateRange = (dates) => {
        if (dates.length === 2) {
            const [start, end] = dates.map(date => new Date(date).toISOString().split('T')[0]);
            return `${start} to ${end}`;
        }
        return dates.map(date => new Date(date).toISOString().split('T')[0]).join(", ");
    };
    
    return (
        <main>
            <h1>Listings</h1>
            <div className="grid-container">
                {listings.length ? (
                    listings.map((listing) => (
                        <div key={listing._id} className="card">
                            {randomImages[listing._id] ? (
                                <img
                                    src={randomImages[listing._id]}
                                    alt={listing.title}
                                />
                            ) : (
                                <div style={{ width: '200px', height: '200px', backgroundColor: '#f0f0f0' }}></div>
                            )}
                            <h2>{listing.title}</h2>
                            <p>{listing.description}</p>
                            <p className="price">Price: ${listing.price}</p>
                            <p className="location">Location: {listing.location.city}, {listing.location.state}, {listing.location.country}</p>
                            <p>Available Dates: {formatDateRange(listing.available_dates)}</p>
                            <p>{listing.isBooked ? "Currently Booked" : "Available for Booking"}</p>
                            <Link className="button" to={`/listings/${listing._id}`}>View Details</Link>
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