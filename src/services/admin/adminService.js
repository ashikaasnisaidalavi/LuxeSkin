


import { apiRequest } from "../api";

// Get admin details using email
export async function getAdminByEmail(email) {
  const admins = await apiRequest(
    `/admins?email=${encodeURIComponent(email)}`
  );

  return admins.length > 0 ? admins[0] : null;
}

// Create admin session
export async function createAdminSession(sessionData) {
  return apiRequest("/sessions", {
    method: "POST",
    body: JSON.stringify(sessionData),
  });
}

// Delete admin session
export async function deleteAdminSession(sessionId) {
  return apiRequest(`/sessions/${sessionId}`, {
    method: "DELETE",
  });
}

// Get admin session
export async function getAdminSession(sessionId) {
  return apiRequest(`/sessions/${sessionId}`);
}

// Get admin details using ID
export async function getAdminById(id) {
  return apiRequest(`/admins/${id}`);
}