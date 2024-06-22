import { ChangeEvent, useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import logo from "./logo.svg";
import "./styles.css";
import Layout from "../../../Templates/Layout";
import { NavLink } from "react-router-dom";

const strengthLabels = ["weak", "medium", "strong"];

export const SignupAdmin = () => {
  const [strength, setStrength] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const getStrength = (password: string) => {
    let strengthIndicator: number = 0;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (
      password.length >= 8 &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialCharacter
    ) {
      strengthIndicator = 2; // Strong
    } else if (
      password.length >= 6 &&
      (hasUpperCase || hasLowerCase) &&
      (hasNumber || hasSpecialCharacter)
    ) {
      strengthIndicator = 1; // Medium
    }

    setStrength(strengthLabels[strengthIndicator] ?? "");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "password") {
      setPassword(value);
      getStrength(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "name") {
      setName(value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // Password validation
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (
      !(
        password.length >= 8 &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumber &&
        hasSpecialCharacter
      )
    ) {
      setPasswordError(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    // Name validation
    if (!name || name.length > 20) {
      setNameError("Please enter a name (maximum 20 characters).");
      return;
    }

    // If all validations pass, proceed with form submission
    // ...

    // Reset error messages
    setEmailError("");
    setPasswordError("");
    setNameError("");
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-8 bg-white shadow-md rounded-md">
          <img src={logo} alt="Logo" className="mx-auto mb-8" />
          <h2 className="text-3xl font-semibold mb-8">Sign Up as an Admin</h2>
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="flex items-center gap-4">
              <input
                name="name"
                autoComplete="off"
                spellCheck="false"
                className={`border p-4 w-full rounded ${
                  nameError ? "border-red-500" : "border-gray-300"
                }`}
                type="text"
                placeholder="Name"
                onChange={handleChange}
              />
            </div>
            {nameError && (
              <div className="text-red-500 text-sm">{nameError}</div>
            )}

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
              {/* <div id="spinner" className="spinner"></div> */}
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

            <div className={`flex items-center gap-2 bars ${strength}`}>
              <div className="h-4 bg-blue-400 rounded"></div>
            </div>
            <div className="text-sm text-gray-600">
              {strength && <>{strength} password</>}
            </div>

            {passwordError && (
              <div className="text-red-500 text-sm">{passwordError}</div>
            )}

            <button
              className="bg-blue-700 text-white py-4 rounded w-full"
              type="submit"
            >
              JOIN NOW
            </button>

            <div className="flex items-center gap-4">
              <p>Already have an account?</p>
              <NavLink className="text-sky-800" to="/admin/login">
                Log In
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SignupAdmin;
