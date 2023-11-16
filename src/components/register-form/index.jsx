import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { registerUser } from "../../lib/api";

const Input = ({ type, placeholder, value, onChange, name }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={true}
    minLength={4}
    aria-label={placeholder}
    className="bg-neutral-100 border-2 border-orange-100 text-gray-900 leading-tight tracking-tight sm:text-sm rounded-3xl focus:ring-primary-600 focus:border-primary-600 block w-full min-w-[220px] sm:min-w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  />
);

const steps = [
  { label: "user name", fields: ["username"] },
  { label: "email", fields: ["email"] },
  { label: "password", fields: ["password", "confirmPassword"] },
  { label: "confirmation ", fields: [] }, // Empty fields for the final step
];

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [currentStep, setCurrentStep] = useState(0);

  const validateForm = () => {
    const { username, email, password, confirmPassword } = formData;
    let errorMessages = [];
    let emailValid = /\S+@\S+\.\S+/.test(email);

    if (!username || username.trim() === "") {
      errorMessages.push("Username is required.");
    }
    if (!emailValid) {
      errorMessages.push("Invalid email.");
    }
    if (password.length < 4) {
      errorMessages.push("Password must be at least 4 characters");
    }
    if (password !== confirmPassword) {
      errorMessages.push("Passwords do not match.");
    }

    // Handle error messages as needed, you can log them or display to the user
    console.log("Error Messages:", errorMessages);

    return errorMessages.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    console.log("Current Step:", currentStep);

    if (validateForm()) {
      if (currentStep === steps.length - 1) {
        try {
          // Use the registerUser function
          const data = await registerUser({
            name: username,
            email,
            password,
            avatar: "default-avatar-url",
          });

          localStorage.setItem("jwt", data.accessToken);
          localStorage.setItem("user_email", data.email);

          // Navigate to the desired location after registration
          navigate("/");

        } catch (error) {
          // Handle registration failure, log the error or display a message to the user
          console.error("Registration failed:", error);
        }
      }

      setCurrentStep((prevStep) => {
        const nextStep = Math.min(prevStep + 1, steps.length - 1);
        console.log("Prev Step:", prevStep, "Next Step:", nextStep);
        return nextStep;
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  return (
    <div className="flex items-center justify-center h-screen card glass">
      <div className="w-full max-w-md p-4 rounded-lg bg-orange-200 border-2 border-orange-100 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-bold">{steps[currentStep].label}</h2>
          <form onSubmit={handleSubmit} className="space-y-4" action="/profile">
            {steps[currentStep].fields.map((fieldName) => (
              <Input
                key={fieldName}
                type={fieldName === "password" ? "password" : "text"}
                name={fieldName}
                placeholder={fieldName}
                value={formData[fieldName]}
                onChange={handleChange}
              />
            ))}
            {currentStep === steps.length - 1 ? (
              <button
                type="submit"
                className="w-full px-4 py-2 my-2 leading-tight text-white bg-blue-500 border-2 border-blue-500 rounded-3xl hover:border-blue-400 shadow-custom"
              >
                Create Profile
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="w-full px-4 py-2 my-2 leading-tight text-white bg-blue-500 border-2 border-blue-500 rounded-3xl hover:border-blue-400 shadow-custom"
              >
                Next
              </button>
            )}
          </form>
          <div className="flex justify-between">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="px-4 py-2 text-blue-500 underline"
              >
                Previous
              </button>
            )}
            <ul className="steps">
              {steps.map((step, index) => (
                <li
                  key={index}
                  className={`step ${index === currentStep ? "step-info" : ""} ${
                    index < currentStep ? "step-success" : ""
                  } ${index > currentStep ? "step-pending" : ""}`}
                >
                  {step.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
