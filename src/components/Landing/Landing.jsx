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
            <Listings listings={listings} />
        </main>
    );
};

export default Landing;
