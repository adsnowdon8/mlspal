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
      <div className="flex gap-3 p-5 items-center bg-gray-100">
        <NavLink className="pr-8" to="/">
          <h1 className="font-bold  text-xl"> MLS-pal</h1>
        </NavLink>
        <NavLink to="/players">Player Table</NavLink>
        <NavLink to="/teams">Team Table</NavLink>
        <NavLink to="/trade">Trade</NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
