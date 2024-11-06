import React from "react";
import NavBar from "./../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Spinner from "../components/Spinner";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setToken, setUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState(null); // To display any error messages
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [role, setRole] = useState("");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleCaptcha = (value) => {
    setVerified(true);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!verified) {
      alert("Please complete the reCAPTCHA to register.");
      return;
    }
    setLoading(true);
    try {
      // Reset error state
      setError(null);

      // Make API request to register the user
      const res = await axios.post(
        "https://backend-six-kappa-64.vercel.app/auth/register",
        // "http://localhost:5000/auth/register",
        {
          email,
          password,
          fullName,
          role,
        }
      );

      // Store the token in Redux
      dispatch(setToken(res.data.token));

      // Fetch user details with the token
      const userRes = await axios.get(
        "https://backend-six-kappa-64.vercel.app/auth/me",
        // "http://localhost:5000/auth/me",
        {
          headers: { Authorization: res.data.token },
        }
      );
      dispatch(setUser(userRes.data));

      // Redirect to the dashboard after successful registration
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Registration failed. Please try again."); // Display error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="relative">
      <NavBar />
      {loading && <Spinner />}
      <div>
        <section className="text-black md:py-0 py-8">
          <div className="max-w-[1400px] mx-auto">
            <div className="lg:mt-28 mt-20">
              <div className="flex flex-col justify-center px-6 pb-8">
                <div className="flex justify-center items-center">
                  <div className="w-full bg-white rounded-lg shadow md:mt-0 xl:p-0 max-w-md">
                    <div className="p-6 space-y-4 sm:p-8">
                      <h1 className="text-3xl text-center font-semibold text-colorThree">
                        Get started with us
                      </h1>
                      <form
                        className="space-y-4 md:space-y-6"
                        onSubmit={handleRegister}
                      >
                        {/* Role Selection */}
                        <div className="flex flex-col space-y-2">
                          <label className="text-sm font-bold text-colorThree">
                            I am a:
                          </label>
                          <div className="flex flex-row items-center">
                            <div className="w-[50%]">
                              <input
                                type="radio"
                                name="role"
                                value="landlord"
                                id="landlord"
                                checked={role === "landlord"}
                                onChange={handleRoleChange}
                                className="mr-2 "
                              />
                              <label htmlFor="landlord" className="mr-4">
                                Landlord
                              </label>
                            </div>

                            <div className="w-[50%]">
                              <input
                                type="radio"
                                name="role"
                                value="tenant"
                                id="tenant"
                                checked={role === "tenant"}
                                onChange={handleRoleChange}
                                className="mr-2"
                              />
                              <label htmlFor="tenant">Tenant</label>
                            </div>
                          </div>
                        </div>

                        {/* Full Name Input */}
                        <div>
                          <label
                            htmlFor="text"
                            className="block mb-2 text-sm font-bold text-colorThree"
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            className="border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="Your Full Name"
                            required
                            onChange={(e) => setFullName(e.target.value)}
                          />
                        </div>

                        {/* Email Input */}
                        <div>
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-bold text-colorThree"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="name@domain.com"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        {/* Password Input */}
                        <div>
                          <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-bold text-colorThree"
                          >
                            Password
                          </label>
                          <div className="flex flex-row">
                            <input
                              type="password"
                              name="password"
                              id="password"
                              value={password}
                              placeholder="••••••••"
                              className="border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              required
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                        </div>

                        {/* reCAPTCHA */}
                        <div className="w-[100%] flex justify-center items-center">
                          <ReCAPTCHA
                            sitekey="6LchMmUqAAAAANKg1dNzYDXJnCMf-L6TjRsUVAfG"
                            onChange={handleCaptcha}
                          />
                        </div>

                        {/* Sign Up Button */}
                        <button
                          type="submit"
                          disabled={!verified || !role} // Disable if captcha or role is not completed
                          className={`w-full text-base font-medium rounded px-5 py-2.5 text-center transition ease-in-out duration-1000 ${
                            verified && role
                              ? "bg-mainColor hover:bg-colorFour text-white"
                              : "bg-[#f8f9fa] cursor-not-allowed text-gray-400"
                          }`}
                        >
                          Sign Up{" "}
                          {role &&
                            `as ${
                              role.charAt(0).toUpperCase() + role.slice(1)
                            }`}
                        </button>

                        <div className="relative flex items-center">
                          <div className="flex-grow border-t border-gray-400"></div>
                          <span className="flex-shrink mx-4 text-black text-sm">
                            or
                          </span>
                          <div className="flex-grow border-t border-gray-400"></div>
                        </div>

                        {/* Social Sign In Buttons */}
                        <button className="w-full flex text-black font-medium items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
                          <img
                            src="https://secure.meetupstatic.com/next/images/login/google.svg?w=48"
                            alt=""
                            className="w-5 h-5"
                          />
                          Sign Up with Google
                        </button>

                        <button className="w-full flex text-black font-medium items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
                          <img
                            src="https://secure.meetupstatic.com/next/images/login/apple.svg?w=48"
                            alt=""
                            className="w-5 h-5"
                          />
                          Sign Up with Apple
                        </button>

                        <p className="text-sm text-center font-light text-gray-500">
                          Already have an account?{" "}
                          <a
                            href="/login"
                            className="font-medium text-primary-600 hover:underline"
                          >
                            Sign In Here
                          </a>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
