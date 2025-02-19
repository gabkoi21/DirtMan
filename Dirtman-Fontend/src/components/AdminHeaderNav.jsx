import { useState } from "react";
import MobileNav from "./MobileNav";
import Icon from "@mdi/react";
import { mdiMenu, mdiClose, mdiAccountCircle } from "@mdi/js";
import { Button } from "flowbite-react";

const PageNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [dropNav, setDropNav] = useState(false);

  function toggledrowpdown() {
    setDropNav((prev) => !prev);
  }

  const toggleMenu = () => {
    if (isMenuOpen) {
      setClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setClosing(false);
      }, 300);
    } else {
      setIsMenuOpen(true);
    }
  };

  return (
    <header>
      <nav className="fixed top-0 left-1/6 right-0 z-50 flex w-[100%] md:w-[82%] lg:w-[83%] lg:flex-wrap lg:py-1 bg-nav">
        <div className="flex w-full flex-wrap items-center justify-between md:px-3">
          <div className="flex justify-between w-full items-center">
            <div>
              <a className="text-2xl text-white font-semibold" href="#">
                DirtMan
              </a>
            </div>

            <div className="relative">
              <Button onClick={toggledrowpdown} className="border-none">
                <Icon path={mdiAccountCircle} size={1.5} className="mr-1" />
              </Button>

              {/* Dropdown */}
              {dropNav && (
                <div className="absolute right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg w-40">
                  <ul className="text-black">
                    <li className="px-4 py-2 text-sm font-semibold text-black">
                      <p className="whitespace-normal font-bold text-base">
                        Admin account
                      </p>
                      <hr />
                    </li>

                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-black">
                      <a href="#">Profile</a>
                    </li>

                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-black">
                      <a href="#">Settings</a>
                    </li>

                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-black">
                      <a href="#">Logout</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
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
            <MobileNav isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          </div>
        )}
      </nav>
    </header>
  );
};

export default PageNav;
