import React, { useState } from "react";
import "./login.css";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import { useAppContext } from "../context";
import { Link } from "../Link";
import toast, { Toaster } from "react-hot-toast";
import { invoke } from "@tauri-apps/api/tauri";
import logo from "../assets/logo2.png";

const Login = () => {
  const navigate = useNavigate();
  const { setTokenContext } = useAppContext();
  const [loginData, setLoginData] = useState({ email: "", password1: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState({ email: true, password: true });
  const [signupError, setSignupError] = useState({
    name: true,
    email: true,
    password: true,
  });
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleForgotPasswordChange = (e) => {
    setForgotPasswordEmail(e.target.value);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password1 } = loginData;
    const emailValid = validateEmail(email);

    if (emailValid && password1) {
      signInWithEmailAndPassword(auth, email, password1)
        .then(async (data) => {
          const user = data.user;

          if (user.emailVerified) {
            try {
              const res = await axios.post(`${Link}api/signin`, {
                uid: user.uid,
                email: user.email,
              });
              Cookie.set("uId", res.data.token);
              setTokenContext(res.data.token);
              const uid = res.data.user.uid;
              await invoke("start_data_collection", { uid });
              navigate("/");
              const token = res.data.token;
              axios
                .get(`${Link}toggleStatus`, {
                  headers: {
                    token: token,
                  },
                })
                .then(function (response) {
                  setData(response?.data.user);
                })
                .catch(function (error) {
                  console.log(error);
                });
              setLoginData({ email: "", password1: "" });
            } catch (err) {
              console.error(err);
            }
          } else {
            toast.error("Please verify your email before logging in.");
          }
        })
        .catch((error) => {
          toast.error(error.code);
        });
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = signupData;
    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);
    setSignupError({ email: !emailValid, password: !passwordValid });

    if (emailValid && passwordValid) {
      createUserWithEmailAndPassword(
        auth,
        signupData.email,
        signupData.password
      )
        .then(async (userCredential) => {
          const user = userCredential.user;
          console.log(user);
          await sendEmailVerification(user);
          await setDoc(doc(db, "fypAppUsers", user.uid), {
            name: signupData.name,
            email: signupData.email,
          });
          await axios.post(`${Link}api/signup`, {
            uid: user.uid,
            email: user.email,
            name: signupData.name,
          });
          toast.success(
            `Verification email sent to ${signupData.email}. Please verify your email.`
          );
          setSignupData({ name: "", email: "", password: "" });
          setIsLogin(true); // Switch to login view after successful signup
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    const emailValid = validateEmail(forgotPasswordEmail);
    if (emailValid) {
      try {
        await sendPasswordResetEmail(auth, forgotPasswordEmail);
        toast.success("If this email is registered, a password reset email has been sent.");
        setForgotPasswordEmail("");
        setIsForgotPassword(false); // Switch back to login view after sending reset email
      } catch (error) {
        toast.error("An error occurred while attempting to send the password reset email.");
      }
    } else {
      toast.error("Please enter a valid email address.");
    }
  };
  

  return (
    <div className="h-screen w-screen bg-white flex justify-center items-center bag">
      <div className="section">
        <div className="flex items-center">
          <img className="image" src={logo} alt="logo" />
          <div>
            <h1 className="heading1">BehavioGuard</h1>
            <p className="para-head f-26">
              Unlock with Confidence: Your Behaviors, Your Fortified Identity
            </p>
            <p className="para-head f-26">
              Key Features: <span className="change_content"></span>
            </p>
          </div>
        </div>
      </div>

      <div className="wrapper">
        {!isForgotPassword ? (
          <div className="card-switch bag">
            <label className="switch bag">
              <input
                className="toggle"
                type="checkbox"
                checked={!isLogin}
                onChange={() => setIsLogin(!isLogin)}
              />
              <span className="slider" />
              <span className="card-side" />
              <div className="flip-card__inner">
                <div className={`flip-card__front ${isLogin ? "active" : ""}`}>
                  <div className="title">Log in</div>
                  <form
                    onSubmit={handleLoginSubmit}
                    className="flip-card__form"
                  >
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      className={`flip-card__input`}
                      value={loginData.email}
                      onChange={handleLoginChange}
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      name="password1"
                      className={`flip-card__input`}
                      value={loginData.password1}
                      onChange={handleLoginChange}
                      required
                    />
                    <div className="forget-password">
                      <p onClick={() => setIsForgotPassword(true)}>
                        Forgot Password
                      </p>
                    </div>
                    <button type="submit" className="flip-card__btn">
                      Let's go!
                    </button>
                  </form>
                </div>
                <div
                  className={`flip-card__back ${isLogin ? "" : "active"}`}
                >
                  <div className="title">Sign up</div>
                  <form
                    onSubmit={handleSignupSubmit}
                    className="flip-card__form"
                  >
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      className={`flip-card__input`}
                      value={signupData.name}
                      onChange={handleSignupChange}
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      className={`flip-card__input`}
                      value={signupData.email}
                      onChange={handleSignupChange}
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      className={`flip-card__input`}
                      value={signupData.password}
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                      onChange={handleSignupChange}
                      required
                    />
                    <button type="submit" className="flip-card__btn">
                      Confirm!
                    </button>
                  </form>
                </div>
              </div>
            </label>
          </div>
        ) : (
          <div className="forgot-password-container">
            <div className="title">Reset Password</div>
            <form
              onSubmit={handleForgotPasswordSubmit}
              className="flip-card__form"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flip-card__input"
                value={forgotPasswordEmail}
                onChange={handleForgotPasswordChange}
                required
              />
              <button type="submit" className="flip-card__btn marging-top">
                Send Reset Email
              </button>
              <p
                className="back-to-login"
                onClick={() => setIsForgotPassword(false)}
              >
                Back to Login
              </p>
            </form>
          </div>
        )}
      </div>
      <div>
        <Toaster position="top-left" reverseOrder={false} />
      </div>
    </div>
  );
};

export default Login;
