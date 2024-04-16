import React, { useState } from "react";
import "./login.css";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, getDoc, addDoc, collection, where, query } from 'firebase/firestore'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookie from 'js-cookie'


const Login = () => {
  const navigate = useNavigate()
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://mail.google.com',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'example.page.link'
  };
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  const [loginError, setLoginError] = useState({ name: true, email: true, password: true });
  const [signupError, setSignupError] = useState({ name: true, email: true, password: true });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
    console.log()
  };

  const validateEmail = (email) => {
    // Simple email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    // Password length validation
    return password.length >= 8;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);
    setLoginError({ email: !emailValid, password: !passwordValid });

    if (emailValid && passwordValid) {
      console.log("Login Data:", loginData);
      signInWithEmailAndPassword(auth, loginData.email, loginData.password)
        .then((data) => {
          const user = data.user;
          console.log(data._tokenResponse.idToken)
          axios.post('http://localhost:5000/api/signin', {
            uid: user.uid,
            email: user.email,
          })
            .then(function (res) {
              Cookie.set('uId', res.data.token)
              setLoginData({ email: "", password: "" });
            })
            .catch(function (err) {
              console.log(err)
            })
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(error);
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
      console.log("Signup Data:", signupData);
      createUserWithEmailAndPassword(auth, signupData.email, signupData.password)
        .then(async data => {
          await sendEmailVerification(data.user)
          await setDoc(doc(db, "fypAppUsers", data.user.uid), {
            name: signupData.name,
            email: signupData.email,
          });
          axios.post('http://localhost:5000/api/signup', {
            uid: data.user.uid,
            email: data.user.email,
            name: signupData.name
          })
            .then(function (res) {
              Cookie.set('uId', res.data.token)
              setSignupData({ name: "", email: "", password: "" });
            })
            .catch(function (err) {
              console.log(err)
            })
        })
    }
  };
  return (
    <div className="h-screen w-screen bg-black flex justify-center items-center">
      <div className="wrapper">
        <div className="card-switch">
          <label className="switch">
            <input className="toggle" type="checkbox" />
            <span className="slider" />
            <span className="card-side" />
            <div className="flip-card__inner">
              <div className="flip-card__front">
                <div className="title">Log in</div>
                <form onSubmit={handleLoginSubmit} className="flip-card__form">
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
                    name="password"
                    className={`flip-card__input`}
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                  <button type="submit" className="flip-card__btn">Let`s go!</button>
                </form>
              </div>
              <div className="flip-card__back">
                <div className="title">Sign up</div>
                <form onSubmit={handleSignupSubmit} className="flip-card__form">
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
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    onChange={handleSignupChange}
                    required
                  />
                  <button type="submit" className="flip-card__btn">Confirm!</button>
                </form>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Login;
