// Connecting to Api
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.chen23-around-us.students.nomoredomainssbs.ru"
    : "http://localhost:3000";

export const baseUrl = BASE_URL;
export const headers = {
  authorization: `Bearer ${localStorage.getItem("jwt")}`,
  "Content-Type": "application/json",
};
// ────────────────────────────────────────────────────────────────────────────
