import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import * as bnbService from "../../services/bnbService";

const ManageListing = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: {
      city: "",
      state: "",
      country: "",
    },
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

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await bnbService.getListingById(id);
        setListing(data);
        setFormData({
          title: data.title,
          description: data.description,
          price: data.price,
          location: {
            city: data.location.city,
            state: data.location.state,
            country: data.location.country,
          },
          images: data.images,
          available_dates: data.available_dates,
        });
        setDateRange([
          {
            startDate: new Date(data.available_dates[0]),
            endDate: new Date(data.available_dates[1]),
            key: "selection",
          },
        ]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("location.")) {
      const locationKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [locationKey]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
      await bnbService.updateListing(id, formData);
      setMessage("Listing updated successfully!");
      navigate("/mylistings");
    } catch (err) {
      setMessage(err.message);
    }
  };

  if (!listing) return <p>Loading...</p>;

  return (
    <main>
      <h1>Edit Listing</h1>
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
          City:
          <input
            type="text"
            name="location.city"
            value={formData.location.city}
            onChange={handleChange}
          />
        </label>
        <label>
          State:
          <input
            type="text"
            name="location.state"
            value={formData.location.state}
            onChange={handleChange}
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            name="location.country"
            value={formData.location.country}
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
        <button type="submit">Update Listing</button>
      </form>
      {message && <p>{message}</p>}
    </main>
  );
};

export default ManageListing;
