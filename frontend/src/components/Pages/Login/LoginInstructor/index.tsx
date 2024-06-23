import React, { ChangeEvent, FormEvent, useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import logo from "./logo.svg";
// import "./styles.css";
import Layout from "../../../Templates/Layout";
import { NavLink } from "react-router-dom";

interface LoginPageProps {}

const LoginInstructor: React.FC<LoginPageProps> = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // Password validation
    if (!password) {
      setPasswordError("Please enter your password.");
      return;
    }

    // If all validations pass, you can proceed with form submission or further actions
    // ...

    // Reset error messages
    setEmailError("");
    setPasswordError("");
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-8 bg-white shadow-md rounded-md">
          <img src={logo} alt="Logo" className="mx-auto mb-8" />
          <h2 className="text-3xl font-semibold mb-8">
            Login as an instructor
          </h2>
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="flex items-center gap-4">
              <input
                name="email"
                autoComplete="off"
                spellCheck="false"
                className={`border p-4 w-full rounded ${
                  emailError ? "border-red-500" : "border-gray-300"
                }`}
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            {emailError && (
              <div className="text-red-500 text-sm">{emailError}</div>
            )}

            <div className="flex items-center gap-4 relative">
              <input
                name="password"
                spellCheck="false"
                className={`border p-4 w-full rounded ${
                  passwordError ? "border-red-500" : "border-gray-300"
                }`}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={handleChange}
              />
              <span
                className="absolute right-4 top-4 cursor-pointer"
                onClick={handleTogglePassword}
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </span>
            </div>

            {passwordError && (
              <div className="text-red-500 text-sm">{passwordError}</div>
            )}

            <div className="flex items-center gap-4">
              <a href="#" className="text-blue-600">
                Forgot Password?
              </a>
            </div>
            <div className="flex items-center gap-4">
              <p>Dont have an account?</p>
              <NavLink className="text-sky-800" to="/instructor/signup">
                Sign up
              </NavLink>
            </div>
            <button
              className="bg-blue-700 text-white py-4 rounded w-full"
              type="submit"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LoginInstructor;
