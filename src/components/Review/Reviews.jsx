
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
 import * as bnbService from '../../services/bnbService';
 

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

    if (loading) return <p>Loading...</p>;

    return(
        <main>
            {
                reviews .length ? (
                    reviews .map((review) => {
                        return(
                            <div key={review._id}>
                                <p>Content: {review.content}</p>
                                <p>Rating: {review.rating}</p>
                                <Link to={`/reviews/edit/${review._id}`}>Edit</Link>
                                {/* <Link to={`/reviews/delete/${review._id}`}> Delete</Link> */}
                                <button onClick={ () => handleDelete(review._id)}>Delete Review</button>
                                
                            </div>
                            
                        )
                    })
                ): (
                    <p>No Reviews Yet</p>
                )
            }
             <button onClick= {goTolistingId}>Go Back</button>
        </main>
    )
};

export default  Reviews

