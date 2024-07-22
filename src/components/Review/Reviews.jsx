
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
 import * as bnbService from '../../services/bnbService';
 import "./ViewReview.css"

const Reviews = () => {

    const { id } = useParams();
    console.log("id", id)
    // const listingReviews = reviews[id] || []; 
    const [ reviews, setReviews] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReviews = async() => {
            try {
                const data = await bnbService.getReviewsByListingId(id);
                console.log("find by id", data)
                setReviews(data);
            } catch (error) {
                console.log("error", error)
            } finally{
                setLoading(false)
            }
        };
        fetchReviews()
    }, [id])
    
    const handleDelete = async(delId) => {
        const isConfirmed = window.confirm("are you sure want to delete review");
        if(!isConfirmed) return;
        try {
           await bnbService.deleteReview(delId);
           console.log("reviewId", delId);
           const updateArray = reviews.filter((review) => (
             review._id !== delId
            
           ))
           setReviews(updateArray)
        } catch (error) {
            console.log("error", error);
        }
    }

    const goTolistingId = ()  => {
        navigate(`/listings/${id}`)
    }

    const handleClick = (reviewId) => {
        navigate(`/reviews/edit/${reviewId}`)
    }

    if (loading) return <p>Loading...</p>;

    return(
        <main>
                <h1 className="your-reviews">Your Reviews</h1>
<div className="review-container">
            {
                reviews .length ? (
                    reviews .map((review) => {
                        
                        return(
                           
                            <div key={review._id} className="review-card">
                                <div className="review-content">
                                <p>Content: {review.content}</p>
                                <p>Rating: {review.rating}</p>
                                </div>
                                <div className="review-actions">
                                
                                <button onClick={() => handleClick(review._id)} className="buttonReview buttonReview-edit">Edit Review</button>
                               
                                <button onClick={ () => handleDelete(review._id)} className="buttonReview buttonReview-delete">Delete Review</button>
                                
                            </div>
                            </div>
                        )
                    })
                ): (
                    <p>No Reviews Yet</p>
                )
            }
             
             </div>
             <button onClick= {goTolistingId} className="goButton">Go Back</button>
        </main>
    )
};

export default  Reviews

