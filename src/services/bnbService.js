const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const getAllListings = async () => {
    try {
        const res = await fetch(`${BACKEND_URL}/listings`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        return res.json()
    } catch (err) {
        console.log(err)
    }
};

const getAllBookings = async() => {
    try {

        const token = localStorage.getItem("token")
        
        const res = await fetch(`${BACKEND_URL}/bookings/mybookings`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return res.json()

    } catch (error) {
        console.log("error", error)
    }
}

export { getAllListings, getAllBookings }