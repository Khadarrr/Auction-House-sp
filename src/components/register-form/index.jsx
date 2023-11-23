import { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { registerUser } from "../../lib/api";

const Input = ({ type, placeholder, value, onChange, name, isValid, errorMessage }) => (
  <div className="relative">
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={true}
      minLength={4}
      aria-label={placeholder}
      className={`bg-neutral-100 border-2 ${isValid ? 'border-orange-100' : 'border-red-500'} text-gray-900 leading-tight tracking-tight sm:text-sm rounded-3xl focus:ring-primary-600 focus:border-primary-600 block w-full min-w-[220px] sm:min-w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
    />
    {!isValid && errorMessage && (
      <p className="absolute top-full left-0 text-red-500 text-xs mt-1">{errorMessage}</p>
    )}
  </div>
);

const steps = [
  { label: "user name", fields: ["username"] },
  { label: "email", fields: ["email"] },
  { label: "password", fields: ["password", "confirmPassword"] },
  { label: "avatar", fields: ["avatar"] },
  { label: "confirmation", fields: [] },
];

const SignUpForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: "",
    });
    const [currentStep, setCurrentStep] = useState(0);
  
    const [inputValidities, setInputValidities] = useState({
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
      avatar: true,
    });
  
    const validateForm = () => {
      const { username, email, password, confirmPassword, avatar } = formData;
  
      if (currentStep === 0) {
        // User name step
        if (!username || username.length < 2) {
          setInputValidities((prev) => ({ ...prev, username: false }));
          return false;
        }
      } else if (currentStep === 1) {
        // Email step
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          setInputValidities((prev) => ({ ...prev, email: false }));
          return false;
        }
      } else if (currentStep === 2) {
        // Password step
        if (!password || password.length < 4) {
          setInputValidities((prev) => ({ ...prev, password: false }));
          return false;
        }
        if (password !== confirmPassword) {
          setInputValidities((prev) => ({ ...prev, confirmPassword: false }));
          return false;
        }
      } else if (currentStep === 3) {
        // Avatar step
        if (!avatar.trim()) {
          setInputValidities((prev) => ({ ...prev, avatar: false }));
          return false;
        }
      }
  
      return true;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const { username, email, password, confirmPassword, avatar } = formData;
  
      if (validateForm()) {
        if (currentStep === steps.length - 1) {
          try {
            const data = await registerUser({
              name: username,
              email,
              password,
              confirmPassword,
              avatar,
            });
  
            localStorage.setItem("jwt", data.accessToken);
            localStorage.setItem("user_email", data.email);
  
            // Alert for successful registration
            alert("Registration successful! You can now log in.");
  
            navigate("/login");
  
          } catch (error) {
            console.error("Registration failed:", error);
            // Alert for registration error
            alert("Registration failed. Please try again.");
          }
        }
  
        setCurrentStep((prevStep) => {
          const nextStep = Math.min(prevStep + 1, steps.length - 1);
          return nextStep;
        });
      }
    };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setInputValidities((prev) => ({ ...prev, [name]: true }));
  };

  const handleNext = () => {
    if (validateForm()) {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
    } else {
      // Alert for validation error
      alert("Please fill in the required fields correctly.");
    }
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
                isValid={inputValidities[fieldName]}
                errorMessage={
                  !inputValidities[fieldName] &&
                  `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is invalid`
                }
              />
            ))}
            {currentStep === steps.length - 1 ? (
              <Link to="/login" className="w-full block">
                <button
                  type="submit"
                  className="w-full px-4 py-2 my-2 leading-tight text-white bg-blue-500 border-2 border-blue-500 rounded-3xl hover:border-blue-400 shadow-custom"
                >
                  Create Profile
                </button>
              </Link>
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
