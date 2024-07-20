const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const getAllListings = async () => {
    try {
        const res = await fetch(`${BACKEND_URL}/listings`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
};

const getListingById = async (id) => {
    try {
        const res = await fetch(`${BACKEND_URL}/listings/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
};

const getAllBookings = async () => {
    try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${BACKEND_URL}/bookings/mybookings`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return res.json();
    } catch (error) {
        console.log("error", error);
    }
};

const getBookingsById = async(id) => {

    try {
        if (!id) throw new Error('ID is required');
        
        const token = localStorage.getItem("token");
        const res = await fetch(`${BACKEND_URL}/bookings/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
      
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
       
        return res.json()
    } catch (error) {
        console.log("error", error)
    }
}

const getProfile = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BACKEND_URL}/profiles`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
};

const updateProfile = async (formData) => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BACKEND_URL}/profiles`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
};

const deleteProfile = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BACKEND_URL}/profiles`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
};

const createBooking = async (formData) => {
    try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${BACKEND_URL}/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });
        return res.json();
    } catch (error) {
        console.log("error", error);
    }
};

const createReview = async ( formData ) => {
    try {
        
        const token = localStorage.getItem("token");
        const res = await fetch(`${BACKEND_URL}/reviews`, {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });
         return res.json();

    } catch (error) {
        console.log("error", error)
    }
}

const getReviewsByListingId = async(listingId) => {
    try {
        
        const token = localStorage.getItem("token");
        const res = await fetch(`${BACKEND_URL}/reviews/find/${listingId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();

    } catch (error) {
        console.log("error", error)
    }
}

export {
    getAllListings,
    getAllBookings,
    getBookingsById,
    getListingById,
    getProfile,
    updateProfile,
    deleteProfile,
    createBooking,
    createReview,
    getReviewsByListingId
};
