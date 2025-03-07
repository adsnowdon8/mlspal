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
          <NavLink className="pr-8" to="/">
            <h1 className="font-bold  text-xl"> MLS Pal</h1>
          </NavLink>
          <NavLink to="/players">Player Table</NavLink>
          <NavLink to="/teams">Team Table</NavLink>
          <NavLink to="/trade">Trade</NavLink>
        </div>

        <div className="text-xs">
          4️⃣7️⃣ days until the transfer window closes
        </div>
        <a href="mailto:hi@mlspal.app" className="pr-5">
          Contact
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
