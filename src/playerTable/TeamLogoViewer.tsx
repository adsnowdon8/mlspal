import { useMemo } from "react";

export const TeamLogoViewer: React.FC<{ club: string }> = ({ club }) => {
  const teamLogoFilepath = useMemo(() => {
    if (club === "Atlanta United") {
      return "/teamLogos/atl.png";
    } else if (club === "Chicago Fire") {
      return "/teamLogos/chi.png";
    } else if (club === "Charlotte FC") {
      return "/teamLogos/clt.png";
    } else if (club === "Columbus Crew") {
      return "/teamLogos/col.png";
    } else if (club === "DC United") {
      return "/teamLogos/dcu.png";
    } else if (club === "FC Cincinnati") {
      return "/teamLogos/fcc.png";
    } else if (club === "Inter Miami") {
      return "/teamLogos/mia.png";
    } else if (club === "NE Revolution") {
      return "/teamLogos/ner.png";
    } else if (club === "Nashville SC") {
      return "/teamLogos/nsc.png";
    } else if (club === "New York City FC") {
      return "/teamLogos/nycfc.png";
    } else if (club === "NY Red Bulls") {
      return "/teamLogos/nyrb.png";
    } else if (club === "Orlando City") {
      return "/teamLogos/orl.png";
    } else if (club === "Philadelphia Union") {
      return "/teamLogos/phl.png";
    } else if (club === "Toronto FC") {
      return "/teamLogos/tfc.png";
    } else if (club === "Austin FC") {
      return "/teamLogos/afc.png";
    } else if (club === "CF Montreal") {
      return "/teamLogos/cfm.png";
    } else if (club === "FC Dallas") {
      return "/teamLogos/dal.png";
    } else if (club === "Houston Dynamo") {
      return "/teamLogos/hou.png";
    } else if (club === "LAFC") {
      return "/teamLogos/lafc.png";
    } else if (club === "LA Galaxy") {
      return "/teamLogos/lag.png";
    } else if (club === "Minnesota United") {
      return "/teamLogos/mnu.png";
    } else if (club === "Portland Timbers") {
      return "/teamLogos/ptl.png";
    } else if (club === "Real Salt Lake") {
      return "/teamLogos/rsl.png";
    } else if (club === "San Diego FC") {
      return "/teamLogos/sdfc.png";
    } else if (club === "Seattle Sounders") {
      return "/teamLogos/sea.png";
    } else if (club === "SJ Earthquakes") {
      return "/teamLogos/sjo.png";
    } else if (club === "Sporting KC") {
      return "/teamLogos/skc.png";
    } else if (club === "Vancouver Whitecaps") {
      return "/teamLogos/vcr.png";
    } else if (club === "Colorado Rapids") {
      return "/teamLogos/cor.png";
    } else if (club === "St Louis City SC") {
      return "/teamLogos/stl.png";
    } else {
      return "/logo512.png";
    }

    // if(club === ''):
    // return '';
  }, [club]);

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
