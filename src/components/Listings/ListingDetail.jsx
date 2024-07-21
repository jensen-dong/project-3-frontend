import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as bnbService from "../../services/bnbService";

const ListingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const data = await bnbService.getListingById(id);
                console.log(data)
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
                const userData = await bnbService.getProfile()
                setUser(userData)
            } catch (err) {
                console.log("Error fetching user profile", err)
            }
        }
        fetchUser()
    }, [id]);

    const formatDateRange = (dates) => {
        if (dates.length === 2) {
            const [start, end] = dates.map(date => new Date(date).toISOString().split('T')[0]);
            return `${start} to ${end}`;
        }
        return dates.map(date => new Date(date).toISOString().split('T')[0]).join(", ");
    };

    if (loading) return <p>Loading...</p>;
    if (!listing) return <p>Listing not found.</p>;

    return (
        <main>
            <h1>{listing.title}</h1>
            <p>{listing.description}</p>
            <p>Price: ${listing.price}</p>
            <p>Location: {listing.location.city}, {listing.location.state}, {listing.location.country}</p>
            {listing.images && listing.images.length > 0 && (
                <div>
                    <h3>Images Placeholder</h3>
                </div>
            )}
            <p>Available Dates: {formatDateRange(listing.available_dates)}</p>
            <p>{listing.isBooked ? "Currently Booked" : "Available for Booking"}</p>
            <p>Owner: {listing.owner.username}</p>

            {user && user._id === listing.owner._id && (
                <button onClick={() => navigate(`/listings/manage/${listing._id}`)}>
                    Edit Listing
                </button>
            )}
            {user && user._id !== listing.owner._id && !listing.isBooked && (
                <button onClick={() => navigate(`/mybookings/new/${listing._id}`)}>
                    Book Now
                </button>
            )}

        </main>
    );
};

export default ListingDetail;