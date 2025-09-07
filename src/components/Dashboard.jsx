import React from 'react';
import {
    Outlet
} from "react-router-dom";
import SidebarComponent from "./SidebarComponent";

const Dashboard = () => {
    return (
        <div className="grid grid-cols-6 gap-x-4">
            <div className="col-span-1 bg-gray-100 min-h-screen">
                <SidebarComponent />
                <h1 className="bg-red-400">hekrj</h1>
            </div>
            <div className='col-span-5 bg-gray-100 text-3xl'>
            <Outlet />
            </div>
        </div>
    );
};


export default Dashboard;