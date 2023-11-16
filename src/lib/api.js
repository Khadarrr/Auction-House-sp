import { API_URL } from "./constants";

function updateOptions(options) {
  const update = { ...options };
  if (localStorage.getItem("jwt")) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    };
  }
  return update;
}

export default function fetcher(url, options) {
  return fetch(url, updateOptions(options));
}

export async function registerUser({ name, email, password, avatar }) {
  const apiUrl = new URL(`${API_URL}auction/auth/register`); // Adjust the endpoint
  const userData = {
    name,
    email,
    password,
    avatar,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };
  try {
    const response = await fetch(apiUrl, options);

    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    localStorage.setItem("jwt", data.accessToken);
    localStorage.setItem("user_email", data.email);

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

// Additional endpoint example
export async function getAuctionData() {
  const apiUrl = new URL(`${API_URL}/some-endpoint`);
  try {
    const response = await fetcher(apiUrl.href);

    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export function logoutUser() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("user_email");
  localStorage.removeItem("user_credits");
}
