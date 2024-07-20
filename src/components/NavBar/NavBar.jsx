import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ user, handleSignout }) => {
    return (
        <nav>
            <ul>
                <li className="logo">
                    <Link to="/">
                        <img
                            src="/images/waterbnb-logo-blue.png"
                            alt="waterbnb-logo"
                        />
                        waterbnb
                    </Link>
                </li>
            </ul>
            <ul>
                <li className="mid">
                    <Link to="/listings">Getaways</Link>
                </li>
                {user && (
                    <>
                    <li className="mid">
                        <Link to="/mybookings">Your Bookings</Link>
                    </li>
                    {/* <li className="mid">
                        <Link to={`/mybookins/new/${listings.length > 0 ? listings[0]._id: ""}`}>Book Now</Link>
                    </li> */}
                    </>
                )}
            </ul>
            <ul>
                {user ? (
                    <li className="icon">
                        <img
                            src="/images/profile-icon.png"
                            alt="Profile"
                            height="25px"
                        />
                        <ul className="dropdown">
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                            {user.isHost && (
                                <>
                                    <li>
                                        <Link to="/mylistings">Your Listings</Link>
                                    </li>
                                    <li>
                                        <Link to="/listings/new">Rent Your Property</Link>
                                    </li>
                                </>
                            )}
                            <li>
                                <Link to="/" onClick={handleSignout}>
                                    Sign Out
                                </Link>
                            </li>
                        </ul>
                    </li>
                ) : (
                    <>
                        <li className="right">
                            <Link to="/signin">Sign In</Link>
                        </li>
                        <li className="right">
                            <Link to="/signup">Sign Up</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
