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
   
    const registrationData = await fetcher(apiUrl, options);
    const newAccessToken = registrationData.access_token;

  
    localStorage.setItem("access_token", newAccessToken);

    console.log('Registration Response Status:', registrationData.status);

    
    return registrationData;
  } catch (error) {
    console.error('Registration Error:', error);
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

  export async function getListings(searchInput) {
    const apiUrl = `${API_URL}/listings?sort=created&sortOrder=desc`;
    console.log('API URL:', apiUrl);
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    };
  
    try {
      const response = await fetch(apiUrl, options);
  
      if (response.ok) {
        const listings = await response.json();
  
        const filteredListings = listings.filter((listing) => {
          return listing.title
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        });
  
        return filteredListings;
      } else {
        throw new Error('Failed to fetch listings. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
      throw new Error('Failed to get listings. Please try again later.');
    }
  }
  
  

  export async function placeBid(listingId, amount) {
    const apiUrl = `${API_URL}/listings/${listingId}/bids`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({
        amount: amount,
      }),
    };
  
    try {
      const data = await fetcher(apiUrl, options);
      return data;
    } catch (error) {
      console.error("Error placing bid:", error);
      throw new Error("Failed to place bid. Please try again later.");
    }
  }

  export async function getUserProfile(userName) {
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
      throw new Error('Failed to get user profile. Please try again later.');
    }
  }
  
  export async function updateUserAvatar(userName, avatarUrl) {
    const apiUrl = `${API_URL}/profiles/${userName}/media`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    };
  
    try {
      const response = await fetch(apiUrl, options);
  
      if (response.ok) {
        const updatedProfile = await response.json();
        return updatedProfile;
      } else {
        throw new Error('Failed to update user avatar. Please try again later.');
      }
    } catch (error) {
      console.error('Error updating user avatar:', error);
      throw new Error('Failed to update user avatar. Please try again later.');
    }
  }
  
  export async function getUserListings(userName) {
    const apiUrl = `${API_URL}/profiles/${userName}/listings`;
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
        const userlistings = await response.json();
        return userlistings;
      } else {
        throw new Error('Failed to fetch user listings. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching user listings:', error);
      throw new Error('Failed to get user listings. Please try again later.');
    }
  }
  
  export async function getUserBids(userName) {
    const apiUrl = `${API_URL}/profiles/${userName}/bids`;
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
        const userBids = await response.json();
        return userBids;
      } else {
        throw new Error('Failed to fetch user bids. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching user bids:', error);
      throw new Error('Failed to get user bids. Please try again later.');
    }
  }
  
  export async function getListingById(id) {
    const apiUrl = `${API_URL}/listings/${id}?_seller=true&_bids=true`;
    console.log('Constructed URL:', apiUrl);
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    };
  
    try {
      const response = await fetch(apiUrl, options);
  
      if (response.ok) {
        const listing = await response.json();
        return listing;
      } else {
        throw new Error('Failed to fetch listing. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching listing:', error);
      throw new Error('Failed to get listing. Please try again later.');
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
}
