import Listings from "../Listings/Listings";

const Landing = ({ listings }) => {
    return (
        <main>
            <h1>LANDING/HOMEPAGE</h1>
            <h3>
                View listings, search bar/fields, listings sections with different scenery/areas?
            </h3>
            <Listings listings={ listings } />
        </main>
    );
};

export default Landing;
