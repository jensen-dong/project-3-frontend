import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as bnbService from "../../services/bnbService";

const ReviewForm = () => {

    const { listingId } = useParams();
    console.log("listingId", listingId)
    const navigate = useNavigate();
    const [ formData, setFormData ] = useState({
        content: "",
        rating: '1'
    });

   const [ error, setError] = useState(null);

   const handleChange = async(e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
   };

   const handleSubmit = async(e) => {
    e.preventDefault();
    if(formData.rating < 1 || formData.rating > 5) {
        setError("Please provide rating between 1 and 5")
    }

    try {
        const data = await bnbService.createReview(formData);
        if(data) {
            alert("Review Successfully created!");
            // addReviews(data);
            navigate(`/listings/${listingId}`)
        } else {
            alert(data.error);
        }
       } catch (error) {
        console.log("error", error)
       }
    
   };

   const isFormInValid = () => {
    return !(formData.content && formData.rating)
   }
  
   return(
    <main>
        <h1>Add Review</h1>
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="content">Review Cntent:</label>
            <input type="text"
            id="content"
            value={formData.content} 
            name="content"
            onChange={handleChange}
            required/>
            </div>
            <div>
            <label htmlFor="rating">Rating:</label>
            <input type="number"
            id="rating"
            value={formData.rating} 
            name="rating"
            onChange={handleChange}
            required/>
            </div>
            {error && <p>{error}</p>}
            <div>
                <button type="submit" disabled={isFormInValid()}>Submit Review</button>
                <button type="button" className="btn btn2">
                        Cancel
                    </button>
            </div>
        </form>
    </main>
   )

};

export default ReviewForm;