import { useState } from "react";
import { Button } from "../ui/button";
import { useTheme } from "../ui/themeProvider";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isDark = theme === 'dark';

  // Detect if on /services route
  const isServices = location.pathname === '/services';

  // Logo click handler
  const handleLogoClick = () => {
    navigate('/');
  };
  // Chat Now click handler
  const handleChatNow = (e) => {
    e.preventDefault();
    window.open('https://wa.link/suk1hv', '_blank', 'noopener,noreferrer');
  };

  // NavLink active style
  const navLinkClass = ({ isActive }) =>
    `hover:text-yellow-400 transition-all font-['Gilroy-Bold'] text-white/80 px-2 py-1 ${isActive ? 'text-yellow-400 underline underline-offset-4' : ''}`;

  // Logo src
  const logoSrc = isServices ? '/Logo/EyeLogo-TransparentBg.png' : '../public/Logo/EyeLogo.jpg';
  const mobileLogoSrc = isServices ? '/Logo/EyeLogo-TransparentBg.png' : '../public/Logo/EyeLogo-TransparentBg.png';

  // Navbar bg
  // const navbarBg = isServices = '';

  // Chat Now button style
  const chatNowClass = isServices
    ? "text-black bg-[#5A9681] rounded-md hover:bg-[#4e856f] transition-all cursor-pointer"
    : "text-black bg-white rounded-md hover:bg-gray-200 transition-all cursor-pointer";

  return (
    <>
      <nav className={`hidden md:flex absolute z-[100] bg-black/50 backdrop-filter backdrop-blur-[6px] mt-4 mx-66 w-[65%] rounded-md justify-between items-center px-4 py-2 text-white fixed top-0`}>
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logoSrc} alt="Zeneration Logo" onClick={handleLogoClick} className="h-10 w-auto cursor-pointer" />
        </div>
        {/* Links */}
        <div className="flex items-center space-x-6 text-xs font-medium">
          <NavLink to="/services" className={navLinkClass}>Services</NavLink>
          <NavLink to="/clients" className={navLinkClass}>Clients</NavLink>
          <NavLink to="/why-zenmedia" className={navLinkClass}>Why Zenmedia?</NavLink>
          <NavLink to="/faqs" className={navLinkClass}>FAQs</NavLink>
          <Button onClick={handleChatNow} className={chatNowClass}>
            Chat now
          </Button>
        </div>
      </nav>
      {/* Mobile: Logo left, Menu+ center, Chat Now right */}
      <div className="relative flex md:hidden w-full items-center justify-between p-4 bg-black/50 backdrop-filter backdrop-blur-[6px] rounded-md px-4 py-2 text-white fixed top-0">
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
          <img src={mobileLogoSrc} alt="Zeneration Logo" className="h-8 w-8 object-contain" style={{ minWidth: 32 }} />
        </div>
        <div>
          <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
            <DropdownMenuTrigger asChild>
              <button
                className="ml-36 text-white font-['F3'] text-xs transition-all ease-in-out duration-400 focus:outline-0 whitespace-nowrap shrink-0"
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                {menuOpen ? 'Menu -' : 'Menu +'}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" sideOffset={8} className="md:hidden mr-[12px] mt-3 w-[95vw] max-w-[750px] border-none px-2 py-1 bg-white dark:bg-black text-[#181818] dark:text-white backdrop-blur-[5px]">
              <DropdownMenuItem onClick={() => { setMenuOpen(false); navigate('/services'); }} className="text-gray-700 dark:text-gray-300 cursor-pointer font-semibold text-xs py-2 px-2 rounded hover:bg-[#243eff]/10 transition">Services</DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setMenuOpen(false); navigate('/clients'); }} className="text-gray-700 dark:text-gray-300 cursor-pointer font-semibold text-xs py-2 px-2 rounded hover:bg-[#243eff]/10 transition">Clients</DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setMenuOpen(false); navigate('/why-zenmedia'); }} className="text-gray-700 dark:text-gray-300 cursor-pointer font-semibold text-xs py-2 px-2 rounded hover:bg-[#243eff]/10 transition">Why ZenMedia?</DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setMenuOpen(false); navigate('/faqs'); }} className="text-gray-700 dark:text-gray-300 cursor-pointer font-semibold text-xs py-2 px-2 rounded hover:bg-[#243eff]/10 transition">FAQs</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className={chatNowClass + " ml-4"} onClick={handleChatNow}>Chat Now</Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
