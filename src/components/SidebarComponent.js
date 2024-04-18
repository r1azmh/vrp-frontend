import { ListGroup } from 'flowbite-react';
import { BiSolidCategory } from "react-icons/bi";
import { FaCaravan, FaNetworkWired } from "react-icons/fa";
import { GiCarWheel } from "react-icons/gi";
import { MdLeaderboard, MdWork } from "react-icons/md";
import { JOBS } from "./constants";
import { useNavigate } from "react-router-dom";

const JOBICON = {
    Dashboard: MdLeaderboard,
    Job: MdWork,
    Work: FaNetworkWired,
    Fleet: FaCaravan,
    VehicleProfile: GiCarWheel,
    JobCategory: BiSolidCategory,
}


export default function SidebarComponent() {
    const navigate = useNavigate();
    return (
        <>
            <ListGroup className="rounded-t-none rounded-b-none mt-4">
                {
                    JOBS.map((e) => {
                        return <ListGroup.Item 
                        onClick={()=>navigate(e.path)}
                         icon={JOBICON[e.name]}>
                            {e.name}
                        </ListGroup.Item>
                    })
                }
            </ListGroup>

        </>
    );
}
