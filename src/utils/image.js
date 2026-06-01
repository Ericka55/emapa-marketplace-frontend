const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/300";
    return `${BASE_URL}${path}`;
};