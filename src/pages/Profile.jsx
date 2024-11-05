import { RiMenu3Fill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { useState } from "react";
import {
  FaAngleDown,
  FaBell,
  FaDollarSign,
  FaUserAlt,
  FaUsers,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { HiDocumentReport } from "react-icons/hi";
import NavBar from "../components/Navbar";

const Profile = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar closed by default
  const [openDropdownMobile, setOpenDropdownMobile] = useState(null);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);
  const toggleMobileDropdown = (dropdown) => {
    setOpenDropdownMobile((prev) => (prev === dropdown ? null : dropdown));
  };

  return (
    <div>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        <div
          className={`flex flex-col flex-1 transition-all duration-300 ${
            isSidebarOpen ? "lg:ml-64" : ""
          }`}
        >
          <NavBar />

          {/* Content Area */}
          <main className="flex-1 overflow-y-auto pt-24 p-6 lg:ml-64">
            <h2 className="text-2xl font-semibold">
              Welcome to your Dashboard!
            </h2>
            {/* Add your main content here */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
