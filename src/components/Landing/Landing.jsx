import Listings from "../Listings/Listings";
import Search from "../Search/Search";
import * as bnbService from "../../services/bnbService"

const Landing = ({ listings }) => {
    const handleSearch = async (query) => {
        const results = await bnbService.searchListings(query);
        return results;
    };

    return (
        <main>
            <Search onSearch={handleSearch} />
            <h3>
                View listings, search bar/fields, listings sections with different scenery/areas?
            </h3>
            <Listings listings={listings} />
        </main>
    );
};

export default Landing;
