import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as bnbService from "../../services/bnbService";

const EditReviewForm = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [ formData, setFormData] = useState( {
        content: "",
        rating: "",
        listing: ""
    });
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchReview = async() => {
            const data = await bnbService.getReviewsById(id);
            console.log("reviews by getId", data)
            setFormData(data);
            setLoading(false);
        };
        fetchReview();
    },[id]);


    const handleChange = async(e) => {
        const { name, value } = e.target;
        setFormData ( {...formData, [name]: value});
    };


    const handleSubmit = async(e) => {
        e.preventDefault();
        await bnbService.updateReview(id, formData);
        navigate(`/reviews/find/${formData.listing}`);
    };
    
    if(loading) return <p>Loading...</p>

    return(
        <main className="">

        
        <form onSubmit={handleSubmit}>
           <div>
            <label htmlFor="content">Content</label>
            <textarea 
            name="content" value={formData.content}
            onChange={handleChange}/>
           </div>
           <div>
            <label htmlFor="rating">Rating</label>
            <input type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange} />
           </div>
           <button type="submit"> Submit review </button>
        </form>
        </main>
    )
    
};


export default EditReviewForm;