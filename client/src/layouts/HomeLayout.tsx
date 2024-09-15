import { Outlet } from "react-router-dom";
import SideBarAdmin from "../components/Sidebar/Sidebar";

const HomeLayout = () => {
  return (
    <div>
      <SideBarAdmin />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
