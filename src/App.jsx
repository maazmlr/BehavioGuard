import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import "./App.css";
import SignUp from "./component/Sign/SignUp.jsx";
import SignIn from "./component/Sign/SignIn.jsx";
import Login from "./Login/Login";
import Header from "./component/HeadNav/Header.jsx";
import Sidebar from "./component/Sidebar/Sidebar.jsx";
import MainLayout from "./MainLayout.jsx";
import Home from "./Home/Home.jsx";
import LineChart from "./component/Charts/LineChart.jsx";

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    // <Route >
    //   <Route path='/' element={<SignIn />} />
    //   <Route path='/signUp' element={<SignUp />} />
    //   <Route path='/home' element={<Home />} />
    // </Route >
    <Route>
      <Route path="/login" element={<Login/>} />
    <Route element={<MainLayout/>}>
      <Route path="/" element={<Home/>}/>

    </Route>
    </Route>
  ))

  return (
    // <div className="body bg-white">
    // <LineChart/>
    // </div>
    <RouterProvider router={router}/>
  )
}

export default App;
