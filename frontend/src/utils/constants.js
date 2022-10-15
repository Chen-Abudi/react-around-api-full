// Connecting to Api
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.chen23-around-us.students.nomoredomainssbs.ru"
    : "http://localhost:3000";

export const baseUrl = BASE_URL;
export const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",

  // export const baseUrl = "https://around.nomoreparties.co/v1/cohort-3-en";
  // export const headers = {
  //   authorization: "7206ed33-5b05-44a8-9280-ab5ebd7021d1",
  //   "Content-Type": "application/json",
};
// ────────────────────────────────────────────────────────────────────────────
