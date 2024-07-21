import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SearchResults.css";

const SearchResults = () => {
    const location = useLocation();
    const [listings, setListings] = useState([]);

    useEffect(() => {
        if (location.state && location.state.results) {
            setListings(location.state.results);
        }
    }, [location.state]);

    return (
        <main className="search-results">
            <h1>Search Results</h1>
            {listings.length ? (
                listings.map((listing) => (
                    <div key={listing._id}>
                        <h2>{listing.title}</h2>
                        <p>{listing.description}</p>
                        <p>Price: ${listing.price}</p>
                        <p>
                            Location: {listing.location.city}, {listing.location.state},{" "}
                            {listing.location.country}
                        </p>
                        <Link to={`/listings/${listing._id}`}>View Details</Link>
                    </div>
                ))
            ) : (
                <p>No listings found.</p>
            )}
        </main>
    );
};

export default SearchResults;
