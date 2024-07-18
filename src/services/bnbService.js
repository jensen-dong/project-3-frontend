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
}

const getListingById = async (id) => {
    try {
        const res = await fetch(`${BACKEND_URL}/listings/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res.json()
    } catch (err) {
        console.log(err)
    }
}

export { getAllListings,getListingById }