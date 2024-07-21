import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const results = await onSearch(query);
            navigate("/search", { state: { results } });
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <>
            <form onSubmit={handleSearch} className="search">
                <input
                    type="text"
                    placeholder="Search by City, State/Province, Country, or a Keyword!"
                    value={query}
                    onChange={handleInputChange}
                />
                <button type="submit" className="search-button">
                    <img src="/images/search-icon.png" alt="" className="search-img"/>
                </button>
            </form>
            <hr />
        </>
    );
};

export default Search;
