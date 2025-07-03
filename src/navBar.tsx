import { NavLink, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <nav>
      <div className="flex bg-gray-200 items-center justify-between">
        <div className="flex gap-3 p-5 items-center">
          <NavLink className="pr-8 pl-5" to="/">
            <h1
              className="font-black  text-xl hover:underline italic"
              // style={{ fontFamily: "Courier New, monospace" }}
            >
              {" "}
              MLS Pal
            </h1>
          </NavLink>
          |
          <NavLink to="/trade" className="hover:underline">
            Trade Machine
          </NavLink>
          |
          <NavLink to="/rules" className="hover:underline">
            Rules Appendix
          </NavLink>
          |
          <NavLink to="/players" className="hover:underline">
            Player Table
          </NavLink>
          |
          <NavLink to="/teams" className="hover:underline">
            Standings
          </NavLink>
          |
          {/* <NavLink to="/teams" className="hover:underline">
            News
          </NavLink> */}
          <NavLink to="/MLSNextPro" className="hover:underline">
            Young Performance Leaders MLS Next Pro
          </NavLink>
          |
          <NavLink to="/aboutUs" className="hover:underline">
            About Us
          </NavLink>
          |
        </div>
        {(currentPath === "/teams" || currentPath === "/players") && (
          <text className="text-xs"> Data updated 6/19/2025</text>
        )}
        {/* how to diplay only on data pages */}
        <a
          href="mailto:hi@mlspal.app"
          className="pr-5 className='hover:underline'"
        >
          Contact
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
