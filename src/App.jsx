import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import "./App.css";
import Login from "./Login/Login";
import MainLayout from "./MainLayout.jsx";
import Home from "./Home/Home.jsx";
import Cookie from 'js-cookie'

function App() {
  const token = Cookie.get('uId')
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route element={token ? <MainLayout /> : ""}>
        <Route path="/" element={token ? <Home /> : <Login/>} />
      </Route>
    </Route>
  ))

  return (
    // <div className="body bg-white">
    // <LineChart/>
    // </div>
    <RouterProvider router={router} />
  )
}

export default App;
