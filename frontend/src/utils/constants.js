// Connecting to Practicum's Api
export const baseUrl =
  "https://api.chen23-around-us.students.nomoredomainssbs.ru";
export const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",

  // export const baseUrl = "https://around.nomoreparties.co/v1/cohort-3-en";
  // export const headers = {
  //   authorization: "7206ed33-5b05-44a8-9280-ab5ebd7021d1",
  //   "Content-Type": "application/json",
};
// ────────────────────────────────────────────────────────────────────────────
