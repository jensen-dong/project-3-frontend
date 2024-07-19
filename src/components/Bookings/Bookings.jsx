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