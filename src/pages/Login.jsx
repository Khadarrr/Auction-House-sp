import { loginUser } from "../lib/api"
import { useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "../assets/icon-auction.png"

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
  
    const navigateToHome = () => {
      setTimeout(() => {
        navigate({ to: "/" });
      }, 2000);
    };
  
    const handleOnSubmit = async (event) => {
      event.preventDefault();
  
      const { email, password } = event.target.elements;
      const payload = {
        email: email.value,
        password: password.value,
      };
  
      try {
        setIsLoading(true); // Set loading to true before making the API call
        const res = await loginUser(payload);
        setData(res);
        setIsSuccess(true);
        navigateToHome();
      } catch (error) {
        console.warn("An error occurred", error);
        setError(error);
      } finally {
        setIsLoading(false); // Set loading to false after the API call completes
      }
    };
  
    if (error) return <div>An error occurred: {error?.message}</div>;
    
    return (
        <>
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full sm:w-96">
        <div className="flex items-center justify-center">
          <img
            className="h-20 mb-4"
            src={logo}
            alt="Logo"
          />
        </div>
        <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
          Welcome back!
        </h1>
        {isSuccess ? (
          <div className="text-center text-green-900">
            👋 Hi {data?.name}. You will now be redirected to the home page!
          </div>
        ) : (
          <form onSubmit={handleOnSubmit}>
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
                defaultValue="Mirmir2023@stud.noroff.no"
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
                minLength={8}
                defaultValue="Pushing-P"
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
              disabled={isLoading}
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-400"
            >
              {isLoading ? "Signing in..." : "Login"}
            </button>
            <p className="mt-4 text-sm text-gray-700 dark:text-white">
              Not a member?{" "}
              <Link
                to="/register"
                className="font-semibold text-blue-500 hover:underline"
              >
                Sign up now
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
        </>
    )
}