import { jwtDecode } from "jwt-decode";

export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found in localStorage");
    return null;
  }
  try {
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    return userId ? userId : null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
