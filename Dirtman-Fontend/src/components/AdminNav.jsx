import { useState } from "react";
import MobileNav from "./MobileNav";
import Icon from "@mdi/react";
import { mdiMenu, mdiClose } from "@mdi/js";

const PageNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setClosing(false);
      }, 300); // Duration of the smooth transition
    } else {
      setIsMenuOpen(true);
    }
  };

  return (
    <header>
      <nav className="fixed top-0 left-1/6 right-0 z-50 flex w-[100%] md:w-[82%] lg:w-[83%]  lg:flex-wrap lg:py-1 bg-nav">
        <div className="flex w-full flex-wrap items-center justify-between md:px-3">
          <div className="ms-2">
            <a className="text-3xl text-white font-semibold" href="#">
              DirtMan
            </a>
          </div>
          {/* Mobile Menu Toggle */}
          <div onClick={toggleMenu} className="cursor-pointer md:hidden">
            <Icon
              path={isMenuOpen ? mdiClose : mdiMenu}
              size={1}
              className="mr-2 text-white"
            />
          </div>
        </div>
        {/* Conditional Rendering of MobileNav */}
        {isMenuOpen && (
          <div className={`w-full bg-nav ${closing ? "closing" : ""}`}>
            {/* Pass props to MobileNav */}
            <MobileNav isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          </div>
        )}
      </nav>
    </header>
  );
};

export default PageNav;
