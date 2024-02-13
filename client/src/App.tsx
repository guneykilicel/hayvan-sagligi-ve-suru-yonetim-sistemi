import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import { Login } from "./pages/login/Login";
import User from "./pages/user/User";
import Product from "./pages/product/Product";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { Register } from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Examination from "./pages/examination/Examination";
import Rasyon from "./pages/rasyon/Rasyon";

import "./styles/global.scss";
import "./styles/variables.scss";
import Rapor from "./pages/rapor/Rapor";


const queryClient = new QueryClient();

function App() {
  axios.defaults.baseURL = `http://localhost:5000`

  const { user } = useContext(AuthContext);

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  const Layout = () => {
    return (
      <div className={`main ${darkMode ? "dark" : ""}`}>
        {/* <button onClick={toggleDarkMode}>Toggle Dark Mode</button> */}
        <Navbar toggleDarkMode={toggleDarkMode} />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: user ? <Layout /> : <Navigate to="/login" replace />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/profile',
          element: <Profile />,
        },
        {
          path: '/animals',
          element: <Users />,
        },
        {
          path: '/rasyon',
          element: <Rasyon />,
        },
        {
          path: '/animal/:id',
          element: <User />,
        },
        {
          path: '/rapor',
          element: <Rapor />,
        },
      ],
    },
    {
      path: '/examination',
      element: <Examination />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App;
