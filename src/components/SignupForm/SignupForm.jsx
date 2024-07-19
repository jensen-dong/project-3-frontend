import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";

const SignupForm = (props) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState([""]);
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        phone_number: "",
        bio: "",
        address: "",
        password: "",
        passwordConf: "",
        isHost: false,
    });

    const updateMessage = (msg) => {
        setMessage(msg);
    };

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target
        // setFormData({ ...formData, [e.target.name]: e.target.value });
        setFormData( { ...formData, [name]: type === "checkbox" ? checked : value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newUserResponse = await authService.signup(formData);
            props.setUser(newUserResponse.user);
            navigate("/");
        } catch (err) {
            updateMessage(err.message);
        }
    };

    const { username, firstName, lastName, email, phone_number, bio, address, isHost, password, passwordConf,  } = formData;

    const isFormInvalid = () => {
        return !(username && firstName && lastName && email && phone_number &&bio && address  && password && password === passwordConf);
    };

    return (
        <main>
            <h1>Sign Up</h1>
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        name="username"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="firstName">Firstname::</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        name="firstName"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Lastname:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        name="lastName"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        name="email"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="phone_number">Phone number:</label>
                    <input
                        type="text"
                        id="phone_number"
                        value={phone_number}
                        name="phone_number"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="bio">Bio:</label>
                    <input
                        type="text"
                        id="bio"
                        value={bio}
                        name="bio"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        name="address"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        name="password"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="confirm">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirm"
                        value={passwordConf}
                        name="passwordConf"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="isHost">Host:</label>
                    <input
                        type="checkbox"
                        id="isHost"
                        value={isHost}
                        name="isHost"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button disabled={isFormInvalid()}>Sign Up</button>
                    <Link to="/">
                        <button>Cancel</button>
                    </Link>
                </div>
            </form>
        </main>
    );
};

export default SignupForm;
