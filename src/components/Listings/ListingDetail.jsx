import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as bnbService from "../../services/bnbService";

const ListingDetail = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const data = await bnbService.getListingById(id);
                setListing(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchListing();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!listing) return <p>Listing not found.</p>;

    return (
        <main>
            <h1>{listing.title}</h1>
            <p>{listing.description}</p>
            <p>Price: ${listing.price}</p>
            <p>Location: {listing.location}</p>
            {listing.images && listing.images.length > 0 && (
                <div>
                    <h3>Images Placeholder</h3>
                </div>
            )}
            <p>Available Dates: {listing.availabile_dates.join(", ")}</p>
            <p>{listing.isBooked ? "Currently Booked" : "Available for Booking"}</p>
            <p>Owner: {listing.owner.username}</p>
        </main>
    );
};

export default ListingDetail;