import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";
import "./SignUpForm.css";

const SignupForm = (props) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState([""]);
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        phone_number: "",
        password: "",
        passwordConf: "",
        isHost: false,
    });

    const updateMessage = (msg) => {
        setMessage(msg);
    };

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        return phoneRegex.test(phone);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(formData.email)) {
            updateMessage("Email format invalid!");
            return;
        }
        if (!validatePhoneNumber(formData.phone_number)) {
            updateMessage("Phone number format invalid! (###-###-####)");
            return;
        }
        try {
            const newUserResponse = await authService.signup(formData);
            props.setUser(newUserResponse.user);
            navigate("/");
        } catch (err) {
            updateMessage(err.message);
        }
    };

    const { username, firstName, lastName, email, phone_number, isHost, password, passwordConf } =
        formData;

    const isFormInvalid = () => {
        return !(
            username &&
            firstName &&
            lastName &&
            email &&
            phone_number &&
            password &&
            password === passwordConf
        );
    };

    return (
        <main className="signup-main">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="signup-field">
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        name="username"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="signup-field">
                    <label htmlFor="firstName">First Name: </label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        name="firstName"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="signup-field">
                    <label htmlFor="lastName">Last Name: </label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        name="lastName"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="signup-field">
                    <label htmlFor="email">Email: </label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        name="email"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="signup-field">
                    <label htmlFor="phone_number">Phone Number: </label>
                    <input
                        type="text"
                        id="phone_number"
                        value={phone_number}
                        name="phone_number"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="signup-field">
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        name="password"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="signup-field">
                    <label htmlFor="confirm">Confirm Password: </label>
                    <input
                        type="password"
                        id="confirm"
                        value={passwordConf}
                        name="passwordConf"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="signup-field check">
                    <label htmlFor="isHost">Renting Your Property? </label>
                    <input
                        type="checkbox"
                        id="isHost"
                        value={isHost}
                        name="isHost"
                        onChange={handleChange}
                    />
                </div>
                <div className="signup-buttons">
                    <button disabled={isFormInvalid()} className="btn btn1">
                        Sign Up
                    </button>
                    <Link to="/">
                        <button className="btn btn2 cncl">Cancel</button>
                    </Link>
                </div>
            </form>
        </main>
    );
};

export default SignupForm;
