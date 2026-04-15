const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const apiFetch = async (endpoint, options = {}, token) => {
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  let data = {};
  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    throw new Error(data.message || "API Error");
  }

  return data;
};

export const syncUser = (token) =>
  apiFetch("/users/sync", { method: "POST" }, token);

export const getUsers = (token) =>
  apiFetch("/users", {}, token);

export const getConversations = (token) =>
  apiFetch("/conversations", {}, token);

export const getOrCreateConversation = (otherUserId, token) =>
  apiFetch(`/conversations/${otherUserId}`, {}, token);

export const getMessages = (conversationId, token) =>
  apiFetch(`/messages/${conversationId}`, {}, token);

export const sendMessage = (body, token) =>
  apiFetch("/messages", { method: "POST", body: JSON.stringify(body) }, token);