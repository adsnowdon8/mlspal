import { Route, Routes } from "react-router-dom";
import NavBar from "./navBar";
import { InputView } from "./trade/Input";
import { LandingPage } from "./landingPage/LandingPage";
import TeamTable from "./teamTable/teamTable";
import { PlayerTable } from "./playerTable/PlayerTable";
import { Analytics } from "@vercel/analytics/react";
import { PlayerPage } from "./playerTable/PlayerPage";
import { Glossary } from "./glossary/Glossary";
import YoungPerfLeaders from "./MLSNextPro/YoungPerfLeaders";
import AboutUs from "./AboutUs/AboutUs";
import { PasswordGate } from "./PasswordGate";

const App = () => {
  return (
    <PasswordGate>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/players" element={<PlayerTable />} />
        <Route path="/teams" element={<TeamTable />} />
        <Route path="/trade" element={<InputView />} />
        <Route path="/mlsNextPro" element={<YoungPerfLeaders />} />
        <Route path="/rules" element={<Glossary />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="players/:playerId" element={<PlayerPage />} />
      </Routes>
      <Analytics />
    </PasswordGate>
  );
};

export default App;
