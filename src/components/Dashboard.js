import React, {useMemo, useState} from 'react'
import SidebarComponent from "./SidebarComponent";
import {JOBS} from "./constants";
import Work from "./Work";
import Job from "../pages/job/Job";
import Stat from "./Stat";
import Fleet from "../pages/fleet/Fleet";
import VehicleProfile from "../pages/vehicleProfile/VehicleProfile";


const Dashboard = () => {
    const [selectedTab, setSelectedTab] = useState(JOBS.Dashboard)
    const selectedComponent = useMemo(() => {
        switch (selectedTab) {
            case JOBS.Dashboard:
                return <Stat/>
            case JOBS.Work:
                return <Work/>
            case JOBS.Job:
                return <Job/>
            case JOBS.Fleet:
                return <Fleet/>
            case JOBS.VehicleProfile:
                return <VehicleProfile />
            default:
                return <Stat/>
        }
    }, [selectedTab])
    return (
        <div className="grid grid-cols-6 gap-x-4">
            <div className="col-span-1 bg-white min-h-screen">
                <SidebarComponent setSelectedTab={setSelectedTab}/>
            </div>
            <div className='col-span-5 bg-gray-100 text-3xl'>
                {selectedComponent}
            </div>
        </div>
    );
};


export default Dashboard;