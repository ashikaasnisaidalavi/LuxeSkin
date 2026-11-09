
// import { apiRequest } from "./api";

// // READ: Get all users
// export function getUsers() {
//   return apiRequest("/users");
// }

// // CREATE: Register a new user
// export function registerUser(userData) {
//   return apiRequest("/users", {
//     method: "POST",
//     body: JSON.stringify(userData),
//   });
// }

// // READ: Find a user by email
// export async function getUserByEmail(email) {
//   const users = await getUsers();

//   return users.find(
//     (user) => user.email.toLowerCase() === email.toLowerCase()
//   );
// }

// // UPDATE: Update an existing user
// export function updateUser(userId, updatedData) {
//   return apiRequest(`/users/${userId}`, {
//     method: "PATCH",
//     body: JSON.stringify(updatedData),
//   });
// }

// // DELETE: Delete a user
// export function deleteUser(userId) {
//   return apiRequest(`/users/${userId}`, {
//     method: "DELETE",
//   });
// }


import { apiRequest } from "./api";

// READ: Get all users
export function getUsers() {
  return apiRequest("/users");
}

// READ: Get one user by ID
export async function getUserById(userId) {
  const user = await apiRequest(`/users/${userId}`);

  // Do not expose the password to the profile page
  const { password, ...safeUser } = user;

  return safeUser;
}

// CREATE: Register a new user
export function registerUser(userData) {
  return apiRequest("/users", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

// READ: Find a user by email
export async function getUserByEmail(email) {
  const users = await getUsers();

  return users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );
}

// UPDATE: Update an existing user
export function updateUser(userId, updatedData) {
  return apiRequest(`/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify(updatedData),
  });
}

// DELETE: Delete a user
export function deleteUser(userId) {
  return apiRequest(`/users/${userId}`, {
    method: "DELETE",
  });
}