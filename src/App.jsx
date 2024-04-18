import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import "./App.css";
import Login from "./Login/Login";
import MainLayout from "./MainLayout.jsx";
import Home from "./Home/Home.jsx";
import Cookie from 'js-cookie'
import { useAppContext } from './context.jsx';
import Profile from './profile/profile.jsx';

function App() {
  const { token } = useAppContext()
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      
      <Route element={token ? <MainLayout /> : ""}>
        <Route path="/" element={token ? <Home/> : <Login />} />
        <Route path="/profile" element={token ? <Profile/> : <Login />} />
      </Route>
    </Route>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App;
