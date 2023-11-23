import { loginUser } from "../../lib/api";
import { useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "../../assets/icon-auction.png";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = event.target.elements;
    const payload = {
      email: email.value,
      password: password.value,
    };

    try {
      setIsLoading(true);
      const res = await loginUser(payload);
      
      // Check if the response contains an access token
      if (res.accessToken) {
        // Store the access token and any other relevant data in local storage
        localStorage.setItem('access_token', res.accessToken);
        localStorage.setItem('user_name', res.name);
        localStorage.setItem('credits', res.credits);
        localStorage.setItem('avatar', res.avatar);
      }

      setData(res);
      setIsSuccess(true);
      alert("Login successful!"); // Alert for successful login
      window.location.href = "/"; // Navigate to the homepage after successful login
    } catch (error) {
      console.warn("An error occurred", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) return <div>An error occurred: {error?.message}</div>;

  return (
    <>
      <div className="flex items-center justify-center min-h-screen card glass">
        <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full sm:w-96 ">
          <div className="flex items-center justify-center">
            <img className="h-20 mb-4" src={logo} alt="Logo" />
          </div>
          <h1 className="mb-6 text-2xl text-center font-bold dark:text-white">
            Log in
          </h1>
          <form onSubmit={handleOnSubmit}>
            {isLoading && <p>Loading...</p>} {/* Show loading message or spinner */}
          
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email"
                autoComplete="email"
                defaultValue="@stud.noroff.no"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                autoComplete="current-password"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="mr-2 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-700 dark:text-white"
                >
                  Remember me
                </label>
              </div>
              <Link
                to="#"
                className="text-sm text-gray-700 dark:text-white hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-700 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
            <p className="mt-4 text-sm text-gray-700 dark:text-white">
              Not a member?{" "}
              <Link
                to="/register"
                className="font-semibold text-yellow-500 hover:underline"
              >
                Sign up now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
