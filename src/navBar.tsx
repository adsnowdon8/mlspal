import { NavLink } from "react-router-dom";

{
  /* <div className="flex gap-3 p-5 items-center">
  <h1 className="font-bold text-xl"> MLS pal</h1>
  <button>Player Table</button>
  <button>Team Table</button>
  <button
    className=" rounded bg-grey-50"
    onClick={() => {
      //   setPromptView(true);
    }}
  >
    Propose Trade
  </button>
</div>; */
}

const NavBar = () => {
  return (
    <nav>
      <div className="flex bg-gray-100 items-center justify-between">
        <div className="flex gap-3 p-5 items-center">
          <NavLink className="pr-8 pl-5" to="/">
            <h1 className="font-bold  text-xl hover:underline"> MLS Pal</h1>
          </NavLink>
          <NavLink to="/players" className="hover:underline">
            Player Table
          </NavLink>
          <NavLink to="/teams" className="hover:underline">
            Team Table
          </NavLink>
          <NavLink to="/teams" className="hover:underline">
            News
          </NavLink>

          <NavLink to="/trade" className="hover:underline">
            Trade
          </NavLink>
        </div>
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
