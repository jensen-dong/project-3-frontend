import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as bnbService from "../../services/bnbService";
import "./EditBookingForm.css"

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

    return(
        <main className="editbooking-main">
            <h1 className="editbooking-form">Edit your booking</h1>
        <form onSubmit={handleSubmit}>
            <div className="editbooking-field">
            <label htmlFor="name"></label>
            <input type="text"
            name="name"
            value={formData.name} 
            onChange={handleChange}/>
            </div>
            <div className="editbooking-field">
            <label htmlFor="startDate"></label>
            <input type="text"
            value={new Date(formData.startDate).toLocaleDateString()} 
            readOnly/>
            </div>
            <div className="editbooking-field">
            <label htmlFor="endDate"></label>
            <input type="text"
            value={new Date(formData.endDate).toLocaleDateString()} />
            </div>
            <div className="editbutton">
            <button type="submit" className="editbth editbtn1">Edit</button>
            </div>
        </form>
        </main>
    )
};

export default EditBookingForm