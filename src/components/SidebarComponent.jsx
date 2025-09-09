import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react';
import { BiSolidCategory } from 'react-icons/bi';
import { FaCaravan, FaNetworkWired } from 'react-icons/fa';
import { GiCarWheel } from 'react-icons/gi';
import { MdLeaderboard, MdWork } from 'react-icons/md';
import { JOBS } from './constants';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoMdLogOut } from 'react-icons/io';

const JOB_ICON = {
  Dashboard: MdLeaderboard,
  Job: MdWork,
  Work: FaNetworkWired,
  Fleet: FaCaravan,
  VehicleProfile: GiCarWheel,
  JobCategory: BiSolidCategory,
};


export default function SidebarComponent() {
  const navigate = useNavigate();
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    if (window.CSRF_TOKEN) {
      setCsrfToken(window.CSRF_TOKEN);
    }
  }, []);

  return (
    <Sidebar aria-label="Default sidebar" className="w-full bg-gray-100">
      <SidebarItems>
        <SidebarItemGroup>
          {
            JOBS.map((e, index) => {
              return <SidebarItem key={index}
                                  className="cursor-pointer"
                                  onClick={() => navigate(e.path)}
                                  icon={JOB_ICON[e.name]}>
                {e.name}
              </SidebarItem>;
            })
          }
        </SidebarItemGroup>
        <SidebarItemGroup>
          <SidebarItem icon={IoMdLogOut}>
            <form method="POST" action="/logout/">
              <input
                type="hidden"
                name="csrfmiddlewaretoken"
                value={csrfToken}
              />
              <button type="submit">Logout</button>
            </form>
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}

