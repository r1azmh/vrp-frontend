import React from 'react';
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from './App';
import Dashboard from './components/Dashboard';
import NavbarComponent from './components/NavbarComponent';
import Statistics from './components/Statistics';
import './index.css';
import About from './pages/about/About';
import Category from './pages/category/Category';
import Contact from './pages/contact/Contact';
import Fleet from './pages/fleet/Fleet';
import Job from './pages/job/Job';
import Error from './pages/not-found/Error';
import VehicleProfile from './pages/vehicleProfile/VehicleProfile';
import Work from './pages/work/Work';
import Login from "./pages/login";
import Signup from "./pages/signup";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/about",
        element: <About/>,
    },
    {
        path: "/contact",
        element: <Contact/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/signup",
        element: <Signup/>,
    },
    {
        path: "/Dashboard",
        Component: Dashboard,
        children: [
            {
                path: "",
                Component: Statistics,
            },
            {
                path: "work",
                Component: Work,
            },
            {
                path: "job",
                Component: Job,
            },
            {
                path: "job-category",
                Component: Category,
            },
            {
                path: "fleet",
                Component: Fleet,
            },
            {
                path: "vehicle-profile",
                Component: VehicleProfile,
            },
            {
                path: "about",
                Component: About,
            },
            {
                path: "contact",
                Component: Contact,
            },
        ],
    },
    {
        path: "*",
        Component: Error,
    },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <div className="min-h-screen font-poppins">
            <NavbarComponent/>
            {/* <div className=""> */}
            <div className="bg-white">
                <RouterProvider router={router}/>
                {/* </div> */}
            </div>
        </div>

    </React.StrictMode>
);