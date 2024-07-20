import { Link } from "react-router-dom";

const Bookings = (props) => {
    return (
        <main>
            <h1>Bookings</h1>
            {
                props.bookings.length ?(
                props.bookings.map((booking) => {
                    return (
                        <div key={booking._id}>
                            <p>Name: {booking.name}</p>
                           
                            <Link to={`/bookings/${booking._id}`}>View Details</Link>
                        </div>
                    )
                })
                ) : (
                    <p>No bookings yet</p>
                )
            }
        </main>
    )
};

export default Bookings;