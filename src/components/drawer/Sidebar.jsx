
import { useAuth } from "../../hooks/useAuth";
import Sidebarmenu from "./Sidebarmenu";
import { navUserLinks,navAdminLinks } from "../../datas/SidebarData";
const Sidebar = () => {
  const { user } = useAuth();
  const navLinks = user?.Role === "Admin" ? navAdminLinks : navUserLinks;

  return (
    <Sidebarmenu menu={navLinks} />
  );
};

export default Sidebar;
