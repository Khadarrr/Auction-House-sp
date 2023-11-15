import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from '@tanstack/react-router';
import { registerUser, loginUser } from '../../lib/api';
import logo from '../../assets/icon-auction.png';

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
  
  const SignUpForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentStep, setCurrentStep] = useState(0);
  
   const steps = [
    { label: 'Step 1', fields: ['username'] },
    { label: 'Step 2', fields: ['email'] },
    { label: 'Step 3', fields: ['password'] },
    { label: 'Step 4', fields: ['confirmPassword'] },
  ];
  
    const handleNextStep = () => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Your registration logic here...
  
      // For example, navigate to the next step on successful registration
      handleNextStep();
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    return (
        <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md p-4 rounded-lg bg-orange-200 border-2 border-orange-100 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-bold">{steps[currentStep].label}</h2>
            <form onSubmit={handleSubmit} className="space-y-4" action="/profile">
              {steps[currentStep].fields.map((fieldName) => (
                <Input key={fieldName} type="text" name={fieldName} placeholder={fieldName} value={formData[fieldName]} onChange={handleChange} />
              ))}
              <button
                type="submit"
                className="w-full px-4 py-2 my-2 leading-tight text-white bg-blue-500 border-2 border-blue-500 rounded-3xl hover:border-blue-400 shadow-custom"
              >
                {currentStep === steps.length - 1 ? 'Sign Up' : 'Next'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default SignUpForm;