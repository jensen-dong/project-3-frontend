import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as bnbService from "../../services/bnbService";
import "./ReviewForm.css";

const ReviewForm = ({ fetchAndUpdateReviews }) => {
    const { listingId } = useParams();
    console.log("listingId", listingId);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        content: "",
        rating: "1",
        listingId,
    });

    const [error, setError] = useState(null);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.rating < 1 || formData.rating > 5) {
            setError("Please provide rating between 1 and 5");
            return;
        }

        try {
            const data = await bnbService.createReview(formData);
            if (data) {
                alert("Review Successfully created!");
                fetchAndUpdateReviews(listingId);
                navigate(`/listings/${listingId}`);
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.log("error", error);
            setError("An error occured while creating the review");
        }
    };

    const isFormInValid = () => {
        return !formData.content;
    };

    const handleCancle = () => {
        navigate("/");
    };

    return (
        <main className="main-booking">
            <h1>Add Review</h1>
            <form onSubmit={handleSubmit} className="form-booking">
                <div className="field-booking">
                    <label htmlFor="content">Destination Review:</label>
                    <textarea
                        type="text"
                        id="content"
                        value={formData.content}
                        name="content"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="field-booking">
                    <label htmlFor="rating">Rating:</label>
                    <input
                        type="number"
                        id="rating"
                        value={formData.rating}
                        name="rating"
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p>{error}</p>}
                <div className="buttons">
                    <button type="submit" disabled={isFormInValid()} className="btnnew btnnew1">
                        Submit Review
                    </button>
                    <button type="button" className="btnnew btnnew2" onClick={handleCancle}>
                        Cancel
                    </button>
                </div>
            </form>
        </main>
    );
};

export default ReviewForm;
