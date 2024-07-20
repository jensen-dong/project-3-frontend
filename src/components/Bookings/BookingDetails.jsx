import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as bnbService from "../../services/bnbService";

const BookingDetail = () => {
    const {id} = useParams();
    // console.log('Booking ID:', id);
    const [ booking, setBooking ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchBookings = async() => {
            try {
                const data = await bnbService.getBookingsById(id);
                console.log("data",data);
                setBooking(data);
            } catch (error) {
                console.log("error", error)
            }finally {
                setLoading(false)
            }
        };
        fetchBookings()
    }, [id]);

    if(loading) return <p>Loading...</p>
    if(!booking) return <p> Booking not found</p>

    return(
        <main>
            <h1>Booking Details</h1>
            <h2>Booking Name: {booking.name}</h2>
            <h3>Listing Details</h3>
            <p>Title: {booking.listing.title}</p>
            <p>Description: {booking.listing.description}</p>
            <p>Price: {booking.listing.price}</p>
            <p>Location:{booking.listing.location}</p>
            {booking.listing.images && booking.listing.images.length > 0 && (
                <div>
                    <h3>Images Placeholder</h3>
                </div>
            )}
            <h3>User Details</h3>
            <p>USername: {booking.user.username}</p>
            <p>Email: {booking.user.email}</p>
        </main>
    )

};

export default BookingDetail;

