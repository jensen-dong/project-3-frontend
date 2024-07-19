import Listings from "../Listings/Listings";

const Landing = ({ listings, bookings }) => {
    return (
        <main>
            <h1>LANDING/HOMEPAGE</h1>
            <h3>
                View listings, search bar/fields, listings sections with different scenery/areas?
            </h3>
            <Listings listings={ listings } />
            {/* <Bookings bookings={ bookings }/> Might not need this here as it doesn't need to be on homepage, not sure. */}
        </main>
    );
};

export default Landing;
