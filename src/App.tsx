import { Route, Routes } from "react-router-dom";
import NavBar from "./navBar";
import { InputView } from "./trade/Input";
import { LandingPage } from "./LandingPage";
import TeamTable from "./teamTable/teamTable";
import { PlayerTable2 } from "./playerTable/PlayerTable2";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/players" element={<PlayerTable2 />} />
        <Route path="/teams" element={<TeamTable />} />
        <Route path="/trade" element={<InputView />} />
      </Routes>
      <Analytics />
    </>
  );
};

export default App;
