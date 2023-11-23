import { API_URL } from "./constants";

function updateOptions(options) {
  const update = { ...options };
  const accessToken = localStorage.getItem("access_token");

  if (accessToken) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return update;
}

export default async function fetcher(url, options) {
  try {
    const response = await fetch(url, updateOptions(options));

    if (!response.ok) {
      console.error('Error Response:', await response.text());
      throw new Error('Request failed. Please check your inputs and try again.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Something went wrong. Please try again later.');
  }
}

export async function registerUser({ name, email, password, avatar }) {
  const apiUrl = new URL(`${API_URL}/auth/register`);
  const userData = {
    name,
    email,
    password,
    avatar: isValidURL(avatar) ? avatar : "",
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };

  try {
    const data = await fetcher(apiUrl, options);

    console.log('Response Status:', data.status);

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Registration failed. Please check your inputs and try again.');
  }
}

export async function loginUser({ email, password }) {
  const apiUrl = new URL(`${API_URL}/auth/login`);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  };

  try {
    const data = await fetcher(apiUrl, options);

    // Store user information in local storage upon successful login
    if (data.accessToken && data.name && data.credits && data.avatar) {
      localStorage.setItem('access_token', data.accessToken);
      localStorage.setItem('user_name', data.name);
      localStorage.setItem('credits', data.credits);
      localStorage.setItem('avatar', data.avatar);
    }

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to log in. Please check your credentials and try again.');
  }
}

export async function getProfile(userName) {
    const apiUrl = `${API_URL}/profiles/${userName}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };
  
    try {
      const response = await fetch(apiUrl, options);
  
      if (response.ok) {
        const userProfile = await response.json();
        return userProfile;
      } else {
        throw new Error('Failed to fetch user profile. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw new Error('Failed to get profile. Please try again later.');
    }
  }
  
  
  function isValidURL(str) {
    try {
      new URL(str);
      return true;
    } catch (error) {
      return false;
    }
  }

export function logoutUser() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user_name');
  localStorage.removeItem('credits');
  localStorage.removeItem('avatar');
}
