import axios from "axios";

// Create an Axios instance with the base URL
const api = axios.create({
    baseURL: "http://localhost:8080",
});

// Fetch all mangas
export const fetchMangas = async () => {
    try {
        const response = await api.get("/manga");
        if (response.data && Array.isArray(response.data.data)) {
            return response.data.data; // Return the manga array
        }
        throw new Error("Unexpected API response format");
    } catch (error) {
        console.error("Error fetching mangas:", error);
        throw error;
    }
};

export default api; // Export the Axios instance for use in other service files
