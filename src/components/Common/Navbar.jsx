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
    `hover:text-zinc-500 transition-all ease-in-out font-['Gilroy-Bold'] text-white/50 px-2 py-1 ${isActive ? 'text-zinc-100 underline underline-offset-4' : ''}`;

  // Logo src
  const logoSrc = isServices ? '/Logo/EyeLogo-TransparentBg.png' : '/Logo/EyeLogo.jpg';
  const mobileLogoSrc = isServices ? '/Logo/EyeLogo-TransparentBg.png' : '/Logo/EyeLogo-TransparentBg.png';

  // Chat Now button style
  const chatNowClass = isServices
    ? "text-black bg-[#5A9681] rounded-md hover:bg-[#4e856f] transition-all cursor-pointer"
    : "text-black bg-white rounded-md hover:bg-gray-200 transition-all cursor-pointer";

  return (
    <>
      {/* Desktop Navbar */}
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

      {/* Mobile & Tablet Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-[100] px-4 py-2">
        <div className="bg-black/50 backdrop-filter backdrop-blur-[6px] rounded-md px-4 py-2 text-white">
          <div className="flex items-center justify-between min-w-[320px] max-w-[750px] mx-auto">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
              <img src={mobileLogoSrc} alt="Zeneration Logo" className="h-8 w-8 object-contain" style={{ minWidth: 32 }} />
            </div>

            {/* Menu & Chat Now */}
            <div className="flex items-center gap-4">
              <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <button
                    className="text-white font-['F3'] text-xs transition-all ease-in-out duration-400 focus:outline-0 whitespace-nowrap shrink-0"
                    onClick={() => setMenuOpen((prev) => !prev)}
                  >
                    {menuOpen ? 'Menu -' : 'Menu +'}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  sideOffset={8}
                  className="w-[calc(100vw-32px)] max-w-[750px] border-none px-2 py-1 bg-black text-white backdrop-blur-[5px]"
                >
                  <DropdownMenuItem onClick={() => { setMenuOpen(false); navigate('/services'); }} className="text-zinc-300 cursor-pointer font-semibold text-xs py-2 px-2 rounded hover:bg-[#243eff]/10 transition">Services</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setMenuOpen(false); navigate('/clients'); }} className="text-zinc-300 cursor-pointer font-semibold text-xs py-2 px-2 rounded hover:bg-[#243eff]/10 transition">Clients</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setMenuOpen(false); navigate('/why-zenmedia'); }} className="text-zinc-300 cursor-pointer font-semibold text-xs py-2 px-2 rounded hover:bg-[#243eff]/10 transition">Why ZenMedia?</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setMenuOpen(false); navigate('/faqs'); }} className="text-zinc-300 cursor-pointer font-semibold text-xs py-2 px-2 rounded hover:bg-[#243eff]/10 transition">FAQs</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button className={chatNowClass} onClick={handleChatNow}>Chat Now</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
