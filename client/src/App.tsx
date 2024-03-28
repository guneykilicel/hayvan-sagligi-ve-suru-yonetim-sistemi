import React, { lazy, Suspense, useContext } from "react";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";
import { ThemeContext } from "./context/ThemeContext";
import "./styles/global.scss";
// import "./styles/variables.scss";

// Lazy-loaded components
const Home = lazy(() => import("./pages/home/Home"));
const Users = lazy(() => import("./pages/users/Users"));
const Products = lazy(() => import("./pages/products/Products"));
const Navbar = lazy(() => import("./components/navbar/Navbar"));
const Footer = lazy(() => import("./components/footer/Footer"));
const Menu = lazy(() => import("./components/menu/Menu"));
const Login = lazy(() => import("./pages/login/Login"));
const User = lazy(() => import("./pages/user/User"));
const Product = lazy(() => import("./pages/product/Product"));
const Register = lazy(() => import("./pages/register/Register"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const Examination = lazy(() => import("./pages/examination/Examination"));
const Rasyon = lazy(() => import("./pages/rasyon/Rasyon"));
const Rapor = lazy(() => import("./pages/rapor/Rapor"));

const queryClient = new QueryClient();

function App() {
  axios.defaults.baseURL = `http://localhost:5000`;
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const Layout = () => (
    <div className={`main ${theme}`}>
      {/* <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle Dark Mode</button> */}
      <Navbar />
      <div className="container background text">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </div>
      </div>
      <div className="background text">
        <Footer />
      </div>
    </div>
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <Layout /> : <Navigate to="/login" replace />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/profile", element: <Profile /> },
        { path: "/animals", element: <Users /> },
        { path: "/rasyon", element: <Rasyon /> },
        { path: "/animal/:id", element: <User /> },
        { path: "/rapor", element: <Rapor /> },
      ],
    },
    { path: "/examination", element: <Examination /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);

  return (
    <Suspense fallback={<div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'orange'}}>Loading...</div>}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Suspense>
  );
}

export default App;
