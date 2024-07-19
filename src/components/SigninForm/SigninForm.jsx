// I think I want to modify this more after we create the Listing Cards, might be cool to display these on log in page to make it look a little less bland.

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";
import "./SignInForm.css";

const SigninForm = (props) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState([""]);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const updateMessage = (msg) => {
        setMessage(msg);
    };

    const handleChange = (e) => {
        updateMessage("");
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await authService.signin(formData);
            props.setUser(user);
            navigate("/");
        } catch (err) {
            updateMessage(err.message);
        }
    };

    return (
        <main className="signin-main">
            <h1>Log In</h1>
            {/* <p>{message}</p> Might replace with some text. */}
            <form autoComplete="off" onSubmit={handleSubmit} className="signin-form">
                <div className="signin-field">
                    <label htmlFor="email">Username:</label>
                    <input
                        type="text"
                        autoComplete="off"
                        id="username"
                        value={formData.username}
                        name="username"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="signin-field">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        autoComplete="off"
                        id="password"
                        value={formData.password}
                        name="password"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="signin-buttons">
                    <button type="submit" className="btn btn1">
                        Log In
                    </button>
                    <Link to="/">
                        <button className="btn btn2">Cancel</button>
                    </Link>
                </div>
            </form>
        </main>
    );
};

export default SigninForm;
