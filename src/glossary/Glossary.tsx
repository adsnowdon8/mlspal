import "./Glossary.css";

export const Glossary: React.FC = () => {
  return (
    <div
      className="items-center justify-center w-full h-full px-80 py-10"
      style={{
        overflow: "auto",
        position: "relative",
        height: "100%",
      }}
    >
      Here is a breakdown of the most important rules and regulations in MLS.
      Understanding these regulations is key to properly assessing team
      performance and potential trades. Here are why certain rules and
      designations matter.
      <ul className="list-disc pl-5 space-y-2 pt-3 ">
        <li>
          <b>Roster Rules & Builds:</b> Gives insights into the club's vision
          and strategy for how they want to build their roster. When assessing a
          trade, it is also important to consider how many roster spots an
          acquiring team has available
        </li>
        <li>
          <b>Roster Designations:</b> The type of roster designation a player
          has gives direct insight into the type of contract the player is on
          and furthermore, how valuable a player is for his club.
        </li>
        <li>
          <b>International / Domestic Slots:</b> Considering each club has a set
          amount of international slots available, whether a player occupies a
          domestic or international slot is a key factor when evaluating the
          feasibility of a transfer Spending Money: There are a few ways clubs
          can acquire players and assets, understanding these mechanisms is
          important for fans, coaches, and executives alike.
        </li>
        <li>
          <b>Spending Money:</b> There are a few ways clubs can acquire players
          and assets, understanding these mechanisms is important for fans,
          coaches, and executives alike.
        </li>
      </ul>
      <Heading>The Roster Rules & Build</Heading>
      <p className="font-bold">Roster Rules and Regulations</p>
      <ul className="list-disc pl-5 space-y-2 pt-3 ">
        <li>
          A team’s active roster is composed of up to 30 players, all who are
          eligible for game day selection.
        </li>
        <li>
          Slots 1-20 are known as the Senior Roster, salaries of players in the
          Senior Roster all count against the team’s salary budget ( Designated
          Players, U-22 Initiative, Senior TAM, and Senior players all form part
          of the Senior Roster).
        </li>
        <li>
          Slots 21-30 are known as the Supplemental Roster, the salaries of
          these players do not count towards the salary cap (Players on the
          supplemental roster may include Senior Minimum Salary Players,
          Homegrowns, 1st Term Generation Adidas, and Reserve Minimum Salary
          Players) .
        </li>
      </ul>
      <p className="font-bold mt-5"> Roster Construction Path</p>
      <ul className="list-disc pl-5 space-y-2 pt-3 ">
        <li>
          MLS teams must choose between one of two models for their roster
          building strategy and be compliant to it by the league's Roster
          Compliance Date.
        </li>
        <li>
          3 Designated Player Model: Club may sign up to 3 Designated Players &
          Up to 3 U22 Initiative Players.
        </li>
        <li>
          U22 Initiative Player Model: Club may sign up to 2 Designated Players,
          Up to 4 U22 Initiative Players, and receive $2 Million of General
          Allocation Money (GAM).
        </li>
      </ul>
      <Heading>Player Roster Designations</Heading>
      <p className="font-bold">Designated Player:</p>
      <ul className="list-disc pl-5 space-y-2 pt-3 ">
        <li>
          Clubs can acquire up to three DPs who hit the salary cap at the
          Maximum Salary Budget Charge (~$743,750), despite having compensations
          that exceed that number.
        </li>
        <li>Generally the biggest investment made by clubs.</li>
      </ul>
      <InfoSection
        head="U22 Initiative Players"
        lis={[
          "Incentivizes clubs to spend on young talent.",
          "To be eligible for a U22 Initiative Contract, a player must be 22 years old or younger in his first year in MLS.",
          "A player may occupy the U22 Initiative Slot through the year in which he turns 25.",
          "U22 Initiative players hit the salary cap at a fixed rate ($150,000 for those aged 20 & younger and $200,000 for those aged 21-25) despite their actual compensation exceeding those numbers. ",
        ]}
      />
      <InfoSection
        head="Senior TAM"
        lis={[
          "Clubs receive Target Allocation Money or TAM to buy down budget charges of best paid senior players. In 2025, MLS Clubs received $2,225,000 TAM per club and expect to receive $2,125,000 in 2026 and $2,025,000 in 2027.",
          "A TAM Player is a player whose Salary budget charge is above the Maximum Salary Budget Charge ($743,750) and at or below the Maximum Target Allocation Money Amount ($1,743,750).",
          "Generally expected to be the base of the team.",
        ]}
      />
      <InfoSection
        head="Senior"
        lis={[
          "Players occupying slots 1-20 with the exception of the designations above.",
          "Salary counts against salary budget.",
        ]}
      />
      <InfoSection
        head="Supplemental"
        lis={["Salary does not count against salary budget."]}
      />
      <InfoSection
        head="Homegrown"
        lis={[
          "Club’s can sign a player to a homegrown contract if he has been a member of that club’s youth academy for at least one year and has met the necessary requirements.",
          "A homegrown player can form part of either the Supplemental or Senior roster.",
        ]}
      />
      <InfoSection
        head="Generation Adidas"
        lis={[
          "Every year, a handful of top collegiate players enter the league via The Super Draft.",
          "Until end of the of the guarantee contract up to 3 years, GAs are on a club’s supplemental roster.",
        ]}
      />
      <InfoSection
        head="Off Roster Homegrowns (Short Term Agreement)"
        lis={[
          "Can appear in MLS matches via short term agreement",
          "Players on MLS NEXT Pro affiliate may also feature in an MLS match via short term agreement",
        ]}
      />
      <Heading> International and Domestic Slots</Heading>
      <p>
        There are 241 International roster slots in MLS for the year 2025. These
        slots are tradable, meaning that these are distributed in different
        portions around the league. A player is either International or
        Domestic. An International takes up an international roster slot
      </p>
      <InfoSection
        head="US Based Clubs"
        lis={[
          "Any player with US Permanent Residency, United States citizenship, or who qualifies for the Homegrown International Rule is considered a Domestic Player",
          "Any player not under the categories above is an International Player",
        ]}
      />
      <InfoSection
        head="Canadian Based Clubs"
        lis={[
          "Each Canadian franchise can designate up to 3 international players who have been under contract with MLS and a Canadian club for at least a year who will not count towards the team’s international slots.",
          "A domestic slot can be occupied by a Canadian citizen or a US Domestic Player (US citizens and permanent residents)",
        ]}
      />
      <Heading>Spending Money</Heading>
      <InfoSection
        head="General Allocation Money"
        lis={[
          "Each year every club receives an annual allotment of GAM.",
          "GAM can be traded for players, international slots, and it can be used to buy down salary charges.",
        ]}
      />
      <InfoSection
        head="Cash for Trade"
        lis={[
          "Cash for trade allows teams to purchase players directly with cash instead of using assets such as General Allocation Money or international slots.",
        ]}
      />
      <p className="pt-12">
        For the full 2025 MLS Roster Rules and Regulations click{" "}
        <a
          href="https://www.mlssoccer.com/about/roster-rules-and-regulations"
          className="text-blue-600"
        >
          HERE
        </a>
      </p>
    </div>
  );
};

export function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="pt-14 text-center font-bold text-[20px]">{children}</h1>
  );
}

export const InfoSection: React.FC<{ head: string; lis: string[] }> = ({
  head,
  lis,
}) => {
  return (
    <>
      <p className="font-bold mt-5">{head}</p>
      <ul className="list-disc pl-5 space-y-2 pt-3 ">
        {lis.map((i) => (
          <li>{i}</li>
        ))}
      </ul>
    </>
  );
};
