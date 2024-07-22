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


const updateListing = async (id, formData) => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BACKEND_URL}/listings/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });
        return res.json()
    } catch (err) {
        console.log(err)
    }
};

const createListing = async (formData) => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BACKEND_URL}/listings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });
        return res.json()
    } catch (err) {
        console.log(err)
    }
}

const deleteListing = async (id) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BACKEND_URL}/listings/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.json();
};


const getAllBookings = async() => {

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

const getBookingsById = async (id) => {
    try {
        if (!id) throw new Error("ID is required");

        const token = localStorage.getItem("token");
        const res = await fetch(`${BACKEND_URL}/bookings/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        return res.json();
    } catch (error) {
        console.log("error", error);
    }
};

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

const updateReview = async (id, formData) => {

    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BACKEND_URL}/reviews/${id}`, {
            method :"PUT",
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

const getReviewsById = async(id) => {
    try {
        
     const token = localStorage.getItem("token");
     const res = await fetch(`${BACKEND_URL}/reviews/${id}`, {
        method :"GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
     });
     return res.json()
    } catch (error) {
        console.log("error", error)
    }
}


const createReview = async (formData) => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BACKEND_URL}/reviews`, {
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

const deleteReview = async (id) => {

    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BACKEND_URL}/reviews/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        return res.json()
    } catch (error) {
        console.log("error", error);
    }
}

const searchListings = async (query) => {
    try {
        const res = await fetch(`${BACKEND_URL}/listings/search?q=${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.json();
    } catch (error) {
        console.log("error", error);
    }
};

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

const apiImages = async () => {
    const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;
    const url = `https://api.unsplash.com/search/photos?query=lake-house&per_page=100&client_id=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results.map((image) => image.urls.regular);
};

export {
    getAllListings,
    getAllBookings,
    getBookingsById,
    getListingById,
    updateListing,
    createListing,
    deleteListing,
    getProfile,
    updateProfile,
    deleteProfile,
    createBooking,
    createReview,
    getReviewsByListingId,
    searchListings,
    apiImages,
    updateReview,
    getReviewsById,
    deleteReview
};

