import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as bnbService from "../../services/bnbService";
import "./BookingForm.css";

const BookingForm = ({ addBooking }) => {
    const { listingId } = useParams();
    const navigate = useNavigate();
    const [availableDates, setAvailableDates] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        startDate: "",
        endDate: "",
        listingId: listingId,
    });

    useEffect(() => {
        const fetchListingData = async () => {
            try {
                const listing = await bnbService.getListingById(listingId);
                setAvailableDates(listing.availabile_dates || []);
            } catch (error) {
                console.error("Failed to fetch listing data:", error);
            }
        };
        fetchListingData();
    }, [listingId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isDateRangeAvailable(formData.startDate, formData.endDate)) {
            alert("Selected dates are not available.");
            return;
        }
        try {
            const data = await bnbService.createBooking(formData);
            if (data) {
                alert("Booking successfully created!");
                addBooking(data);
                navigate("/mybookings");
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Booking failed.", error);
        }
    };

    const isFormInvalid = () => {
        return !(formData.name && formData.startDate && formData.endDate);
    };

    const isDateRangeAvailable = (startDate, endDate) => {
        const start = new Date(startDate).toISOString().split("T")[0];
        const end = new Date(endDate).toISOString().split("T")[0];

        return availableDates.some((date) => {
            const availableDate = new Date(date).toISOString().split("T")[0];
            // console.log("available dates:", availableDate);
            return availableDate >= start && availableDate <= end;
        });
    };

    const { name, startDate, endDate } = formData;

    return (
        <main className="booking-main">
            <h1>Book Your Stay</h1>
            <form onSubmit={handleSubmit} className="booking-form">
                <div className="booking-field">
                    <label htmlFor="name">Vacation Name: </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        name="name"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="booking-field">
                    <label htmlFor="startDate">Start Date: </label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        name="startDate"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="booking-field">
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        name="endDate"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="booking-buttons">
                    <button type="submit" disabled={isFormInvalid()} className="btn btn1">
                        Book Now
                    </button>
                    <button type="button" className="btn btn2">
                        Cancel
                    </button>
                </div>
            </form>
        </main>
    );
};

export default BookingForm;
