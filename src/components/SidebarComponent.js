import {ListGroup} from 'flowbite-react';
import {HiUserCircle} from "react-icons/hi2";
import {JOBS} from "./constants";
import {MdLeaderboard, MdWork} from "react-icons/md";
import {FaCaravan, FaNetworkWired} from "react-icons/fa";
import {GiCarWheel} from "react-icons/gi";

const JOBICON = {
    Dashboard: MdLeaderboard,
    Job: MdWork,
    Work: FaNetworkWired,
    Fleet: FaCaravan,
    VehicleProfile: GiCarWheel
}


export default function SidebarComponent({setSelectedTab}) {
    const handleSelected = (item) => () => {
        setSelectedTab(item)
    }
    return (
        <>
            <ListGroup className="rounded-t-none rounded-b-none mt-4">
                {
                    Object.keys(JOBS).map((e) => {
                        return <ListGroup.Item onClick={handleSelected(JOBS[e])} icon={JOBICON[e]}>
                            {e}
                        </ListGroup.Item>
                    })
                }
            </ListGroup>

        </>
    );
}
