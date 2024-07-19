import { Link } from "react-router-dom";

const Listings = ({ listings }) => {
    return (
        <main>
            <h1>Listings</h1>
            {listings.length ? (
                listings.map((listing) => (
                    <div key={listing._id}>
                        <h2>{listing.title}</h2>
                        <p>{listing.description}</p>
                        <p>Price: ${listing.price}</p>
                        <p>Location: {listing.location}</p>
                        <Link to={`/listings/${listing._id}`}>View Details</Link>
                    </div>
                ))
            ) : (
                <p>No listings available.</p>
            )}
        </main>
    );
};

export default Listings;