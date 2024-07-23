import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as bnbService from "../../services/bnbService";
import "./ViewReview.css";

const Reviews = () => {
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
    const [listings, setListings] = useState({});
    const [randomImage, setRandomImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await bnbService.getReviewsByListingId(id);
                setReviews(data);

                const findListing = {};
                for (let review of data) {
                    if (!findListing[review.listing]) {
                        const listing = await bnbService.getListingById(review.listing);
                        findListing[listing._id] = listing;
                    }
                }
                setListings(findListing);
            } catch (error) {
                console.log("error", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();

        const fetchRandomImage = async () => {
            const images = await bnbService.apiImages();
            const randomIndex = Math.floor(Math.random() * images.length);
            setRandomImage(images[randomIndex]);
        };
        fetchRandomImage();
    }, [id]);

    const handleDelete = async (delId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this review?");
        if (!isConfirmed) return;
        try {
            await bnbService.deleteReview(delId);
            console.log("reviewId", delId);
            const updateArray = reviews.filter((review) => review._id !== delId);
            setReviews(updateArray);
        } catch (error) {
            console.log("error", error);
        }
    };

    const goTolistingId = () => {
        navigate(`/listings/${id}`);
    };

    const handleClick = (reviewId) => {
        navigate(`/reviews/edit/${reviewId}`);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <main>
            <h1 className="your-reviews">Your Reviews</h1>
            <div className="review-container">
                {reviews.length ? (
                    reviews.map((review) => {
                        return (
                            <div key={review._id} className="review-details">
                                <div className="review-card">
                                    <h1> {listings[review.listing].title}</h1>
                                    <p> {listings[review.listing].description}</p>
                                    <p className="location">
                                        Location: {listings[review.listing].location.city},{" "}
                                        {listings[review.listing].location.state},{" "}
                                        {listings[review.listing].location.country}
                                    </p>
                                    {randomImage ? (
                                        <img
                                            src={randomImage}
                                            alt={listings[review.listing].title}
                                        />
                                    ) : (
                                        <div>
                                            style=
                                            {{
                                                width: "200px",
                                                height: "200px",
                                                backgroundColor: "#f0f0f0",
                                            }}
                                        </div>
                                    )}
                                    <p className="review">Review: {review.content}</p>
                                    <p className="review">Rating: {review.rating}</p>

                                    <div className="review-buttons">
                                        <button
                                            onClick={() => handleClick(review._id)}
                                            className="buttonReview"
                                        >
                                            Edit Review
                                        </button>

                                        <button
                                            onClick={() => handleDelete(review._id)}
                                            className="buttonReview"
                                        >
                                            Delete Review
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>No Reviews Yet</p>
                )}
            </div>
            <button onClick={goTolistingId} className="goButton">
                Go Back
            </button>
        </main>
    );
};

export default Reviews;
