import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import * as bnbService from "../../services/bnbService";

const NewListing = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    images: [],
    available_dates: [],
  });

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (ranges) => {
    const { selection } = ranges;
    setDateRange([selection]);
    setFormData({
      ...formData,
      available_dates: [
        selection.startDate.toISOString(),
        selection.endDate.toISOString(),
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bnbService.createListing(formData);
      setMessage("Listing created successfully!");
      navigate("/mylistings");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main>
      <h1>Create New Listing</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </label>
        <label>
          Available Dates:
          <DateRange
            editableDateInputs={true}
            onChange={handleDateChange}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
          />
        </label>
        {/*placeholder for image stuff*/}
        <button type="submit">Create Listing</button>
      </form>
      {message && <p>{message}</p>}
    </main>
  );
};

export default NewListing;
