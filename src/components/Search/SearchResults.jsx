import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import * as bnbService from "../../services/bnbService";
import "./SearchResults.css";

const SearchResults = () => {
    const location = useLocation();
    const [listings, setListings] = useState([]);
    const [randomImages, setRandomImages] = useState([]);
    const [listingImages, setListingImages] = useState({});

    useEffect(() => {
        if (location.state && location.state.results) {
            setListings(location.state.results);
        }
    }, [location.state]);

    useEffect(() => {
        const fetchImages = async () => {
            const images = await bnbService.apiImages();
            setRandomImages(images);
        };
        fetchImages();
    }, []);

    useEffect(() => {
        if (randomImages.length > 0 && listings.length > 0) {
            const newListingImages = {};
            const availableImages = [...randomImages];

            listings.forEach((listing) => {
                const randomIndex = Math.floor(Math.random() * availableImages.length);
                newListingImages[listing._id] = availableImages.splice(randomIndex, 1)[0];
            });

            setListingImages(newListingImages);
        }
    }, [randomImages, listings]);

    return (
        <main>
            <h1>Search Results</h1>
            <div className="listings-container">
                {listings.length ? (
                    listings.map((listing) => (
                        <div className="listing-card" key={listing._id}>
                            <img src={listingImages[listing._id]} alt={listing.title} />
                            <div className="listing-details">
                                <h2>{listing.title}</h2>
                                <p>{listing.description}</p>
                                <p>Price: ${listing.price}</p>
                                <p>
                                    Location: {listing.location.city}, {listing.location.state},{" "}
                                    {listing.location.country}
                                </p>
                                <Link to={`/listings/${listing._id}`} className="btn btn1">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No listings found.</p>
                )}
            </div>
        </main>
    );
};

export default SearchResults;
