
import { useParams } from "react-router-dom";

const Reviews = ({ reviews }) => {

    const { id } = useParams();
    console.log("id", id)
    const listingReviews = reviews[id] || []; 
    
    return(
        <main>
            {
                listingReviews .length ? (
                    listingReviews .map((review) => {
                        return(
                            <div key={review._id}>
                                <p>Content: {review.content}</p>
                                <p>Rating: {review.rating}</p>
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

