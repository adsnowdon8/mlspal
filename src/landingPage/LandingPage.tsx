export const LandingPage: React.FC = () => {
  return (
    <div className="flex w-full h-min overflow-hidden  items-center justify-center pb-40 pl-10 relative">
      <div className="w-full h-full flex flex-col justify-center">
        <h1>
          <b>Welcome to MLS PAL</b>, your trusted source for key contract
          information on every MLS player, up and coming young stars in MLS NEXT
          Pro, and up to date information on franchise leadership throughout the
          league.
        </h1>
        <div className="text-sm pt-5">
          <h3>We encourage you to check out the following: </h3>
          <ul className="pl-5 list-disc">
            <li className="mt-2">
              <b>Rules Appendix: </b>
              An explanation of MLS rules and some important key terms.
            </li>
            <li className="mt-2">
              <b>Player Table: </b>
              Minutes leaderboard of every single player in MLS with the most
              up-to-date contract information for each.
            </li>
            <li className="mt-2">
              <b>Standings: </b>
              Current league standings and franchises’ leadership and ownership
              information.
            </li>
            <li className="mt-2">
              <b>Trade Machine: </b>
              Explore the feasibility of any intra league transfer using our
              trade machine that takes into consideration all of MLS’ rules and
              regulations.
            </li>
            <li className="mt-2">
              <b>Young Performance Leaders MLS NEXT PRO: </b>
              The top performers in MLS NEXT Pro aged 17 and younger.
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full items-center justify-center text-center">
        <img
          src={"/coverImg.JPG"}
          alt="team logo"
          className="inline-block"
          style={{
            width: "500px",
            aspectRatio: 1,
            objectFit: "contain",
          }}
        />
      </div>
      {/* <img src={"./landingPage/coverImg.JPG"} width={500} alt="Logo" /> */}
    </div>
  );
};
