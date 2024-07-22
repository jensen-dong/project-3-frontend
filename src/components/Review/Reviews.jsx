
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
 import * as bnbService from '../../services/bnbService';

const Reviews = () => {

    const { id } = useParams();
    console.log("id", id)
    // const listingReviews = reviews[id] || []; 
    const [ reviews, setReviews] = useState([]);
    const [ loading, setLoading ] = useState(true);

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
                                <Link to={`/reviews/edit/${review._id}`}  >Edit</Link>
                            </div>
                        )
                    })
                ): (
                    <p>No Reviews Yet</p>
                )
            }
        </main>
    )
};

export default  Reviews

