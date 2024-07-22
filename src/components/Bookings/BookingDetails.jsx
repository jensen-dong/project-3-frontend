import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as bnbService from "../../services/bnbService";
import "./BookingDetails.css";
import { Link } from "react-router-dom";

const BookingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [randomImage, setRandomImage] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await bnbService.getBookingsById(id);
                setBooking(data);
                const images = await bnbService.apiImages();
                const randomIndex = Math.floor(Math.random() * images.length);
                setRandomImage(images[randomIndex]);
            } catch (error) {
                console.log("error", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, [id]);

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        const date = new Date(dateString);
        const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        return adjustedDate.toLocaleDateString(undefined, options);
    };

  const handleEdit = () => {
    navigate(`/bookings/edit/${booking._id}`)
  }
      
    if (loading) return <p>Loading...</p>;
    if (!booking) return <p> Booking not found</p>;

    return (
        <main>
            <div className="booking-details-card">
                <div className="img-container">
                    <img src={randomImage} alt={booking.listing.title} />
                    <div className="overlay">
                        <h1 className="top-left">{booking.name}</h1>
                        <div className="bottom-left">
                            <h4>{booking.listing.title}</h4>
                            <p>{booking.listing.description}</p>
                        </div>
                        <p className="top-right">${booking.listing.price}/night</p>
                    </div>
                </div>
                <div className="detail">
                    <p>
                        When: {formatDate(booking.startDate)} to {formatDate(booking.endDate)}
                    </p>
                    <p>
                        Where: {booking.listing.location.city}, {booking.listing.location.state},{" "}
                        {booking.listing.location.country}
                    </p>
                    
            </div>
            <button onClick={handleEdit} className="btn btnEdit">Edit</button>
                </div>
                
            <button className="btn btn1" onClick={() => navigate("/mybookings")}>
                Back to Your Bookings
            </button>
            
            {/* <Link to={`/bookings/edit/${booking._id}`}>Edit</Link> */}
           
        </main>
    );
};

export default BookingDetail;
