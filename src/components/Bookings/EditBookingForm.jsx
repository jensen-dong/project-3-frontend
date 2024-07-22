import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as bnbService from "../../services/bnbService";

const EditBookingForm = (props) => {
    const [ formData, setFormData] = useState({
        name: ""
    });
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooking = async() => {
            try {
                const booking = await bnbService.getBookingsById(id);
                console.log("booking", booking);
                setFormData(booking);
            } catch (error) {
                console.log("error", error);
            }
        }
        fetchBooking()
    }, [id]);

    const handleChange = async(e) => {
        const { name, value } = e.target;
        setFormData ( {...formData, [name]: value});
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        await bnbService.updateBooking(id, formData);
        navigate("/mybookings");
        props.updateBookings();
    };

    // if(loading) return <p>Loading...</p>

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="name"></label>
            <input type="text"
            name="name"
            value={formData.name} 
            onChange={handleChange}/>
            <label htmlFor="startDate"></label>
            <input type="text"
            value={new Date(formData.startDate).toLocaleDateString()} 
            readOnly/>
            <label htmlFor="endDate"></label>
            <input type="text"
            value={new Date(formData.endDate).toLocaleDateString()} />
            <button type="submit">Edit</button>
        </form>
    )
};

export default EditBookingForm