import { useMemo } from "react";

const SHORT_NAME_MAP: Record<string, string> = {
  ATL: "Atlanta United",
  CHI: "Chicago Fire",
  CLT: "Charlotte FC",
  CLB: "Columbus Crew",
  DC: "DC United",
  CIN: "FC Cincinnati",
  MIA: "Inter Miami",
  NE: "NE Revolution",
  NSH: "Nashville SC",
  NYCFC: "NYCFC",
  NY: "NY Red Bulls",
  ORL: "Orlando City",
  PHI: "Philadelphia Union",
  TOR: "Toronto FC",
  ATX: "Austin FC",
  MTL: "CF Montreal",
  DAL: "FC Dallas",
  HOU: "Houston Dynamo",
  LAFC: "LAFC",
  LA: "LA Galaxy",
  MIN: "Minnesota United",
  POR: "Portland Timbers",
  RSL: "Real Salt Lake",
  SD: "San Diego FC",
  SEA: "Seattle Sounders",
  SJ: "SJ Earthquakes",
  SKC: "Sporting KC",
  VAN: "Vancouver Whitecaps",
  COL: "Colorado Rapids",
  STL: "St Louis City SC",
};

export const TeamLogoViewer: React.FC<{ club: string }> = ({ club }) => {
  const resolvedClub = SHORT_NAME_MAP[club] ?? club;

  const teamLogoFilepath = useMemo(() => {
    if (resolvedClub === "Atlanta United") {
      return "/teamLogos/atl.png";
    } else if (resolvedClub === "Chicago Fire") {
      return "/teamLogos/chi.png";
    } else if (resolvedClub === "Charlotte FC") {
      return "/teamLogos/clt.png";
    } else if (resolvedClub === "Columbus Crew") {
      return "/teamLogos/col.png";
    } else if (resolvedClub === "DC United") {
      return "/teamLogos/dcu.png";
    } else if (resolvedClub === "FC Cincinnati") {
      return "/teamLogos/fcc.png";
    } else if (resolvedClub === "Inter Miami") {
      return "/teamLogos/mia.png";
    } else if (resolvedClub === "NE Revolution") {
      return "/teamLogos/ner.png";
    } else if (resolvedClub === "Nashville SC") {
      return "/teamLogos/nsc.png";
    } else if (resolvedClub === "NYCFC") {
      return "/teamLogos/nycfc.png";
    } else if (resolvedClub === "NY Red Bulls") {
      return "/teamLogos/nyrb.png";
    } else if (resolvedClub === "Orlando City") {
      return "/teamLogos/orl.png";
    } else if (resolvedClub === "Philadelphia Union") {
      return "/teamLogos/phl.png";
    } else if (resolvedClub === "Toronto FC") {
      return "/teamLogos/tfc.png";
    } else if (resolvedClub === "Austin FC") {
      return "/teamLogos/afc.png";
    } else if (resolvedClub === "CF Montreal") {
      return "/teamLogos/cfm.png";
    } else if (resolvedClub === "FC Dallas") {
      return "/teamLogos/dal.png";
    } else if (resolvedClub === "Houston Dynamo") {
      return "/teamLogos/hou.png";
    } else if (resolvedClub === "LAFC") {
      return "/teamLogos/lafc.png";
    } else if (resolvedClub === "LA Galaxy") {
      return "/teamLogos/lag.png";
    } else if (resolvedClub === "Minnesota United") {
      return "/teamLogos/mnu.png";
    } else if (resolvedClub === "Portland Timbers") {
      return "/teamLogos/ptl.png";
    } else if (resolvedClub === "Real Salt Lake") {
      return "/teamLogos/rsl.png";
    } else if (resolvedClub === "San Diego FC") {
      return "/teamLogos/sdfc.png";
    } else if (resolvedClub === "Seattle Sounders") {
      return "/teamLogos/sea.png";
    } else if (resolvedClub === "SJ Earthquakes") {
      return "/teamLogos/sjo.png";
    } else if (resolvedClub === "Sporting KC") {
      return "/teamLogos/skc.png";
    } else if (resolvedClub === "Vancouver Whitecaps") {
      return "/teamLogos/vcr.png";
    } else if (resolvedClub === "Colorado Rapids") {
      return "/teamLogos/cor.png";
    } else if (resolvedClub === "St Louis City SC") {
      return "/teamLogos/stl.png";
    } else {
      console.log(club + " no logo");
      return "/logo512.png";
    }
  }, [club, resolvedClub]);

  return (
    <div className="text-center">
      <img
        src={teamLogoFilepath}
        alt="team logo"
        className="inline-block"
        style={{ width: "20px", height: "20px", objectFit: "contain" }}
      />
    </div>
  );
};
