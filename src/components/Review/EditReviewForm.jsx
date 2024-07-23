import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as bnbService from "../../services/bnbService";
import "./EditReview.css";

const EditReviewForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        content: "",
        rating: "",
        listing: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReview = async () => {
            const data = await bnbService.getReviewsById(id);
            console.log("reviews by getId", data);
            setFormData(data);
            setLoading(false);
        };
        fetchReview();
    }, [id]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await bnbService.updateReview(id, formData);
        navigate(`/reviews/find/${formData.listing}`);
    };

    const isFormInvalid = () => {
        return !(formData.content && formData.rating);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <main className="review-main">
            <h1> Edit your reviews</h1>

            <form onSubmit={handleSubmit} className="review-form">
                <div className="review-field">
                    <label htmlFor="content">Content</label>
                    <textarea name="content" value={formData.content} onChange={handleChange} />
                </div>
                <div className="review-field">
                    <label htmlFor="rating">Rating</label>
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                    />
                </div>
                <div className="review-buttons">
                    <button
                        type="submit"
                        disabled={isFormInvalid()}
                        className="reviewbtn reviewbtn1"
                    >
                        {" "}
                        Submit review{" "}
                    </button>
                    <button type="submit" className="reviewbtn reviewbtn2">
                        {" "}
                        Go Back{" "}
                    </button>
                </div>
            </form>
        </main>
    );
};

export default EditReviewForm;
