import { useRef } from "react";
import { MLSNextProTable } from "./MLSNextProTable";
import { Heading } from "../glossary/Glossary";

export const PlayerProfile: React.FC<{ name: string; blurb: string }> = ({
  name,
  blurb,
}) => {
  return (
    <>
      <p className="font-bold mt-5">{name}</p>
      <ul className="list-disc pl-5 space-y-2 pt-3 ">
        <li>{blurb}</li>
      </ul>
    </>
  );
};
function YoungPerfLeaders() {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="text-center w-full h-full border min-w-0"
      ref={tableContainerRef}
      style={{
        overflow: "auto",
        position: "relative",
        height: "100%",
      }}
    >
      <div className="px-20 py-10 text-start">
        <p>
          <b>MLS Next Pro</b> is a crucial part of player development in the
          Major League Soccer ecosystem. At MLS PAL, any player aged 17 or
          younger as of April, 2025 has been tracked and evaluated on their
          performances and continued growth. We strongly believe that there are
          numerous future top level pros currently finding their footing in MLS’
          development league and we remain excited to continue following their
          development. Below are some players and teams we believe are standouts
          among their peers.
        </p>
        <p className="pt-1">
          That said, we encourage all users to explore the Young Players MLS
          Next Pro Table at the bottom of this page.
        </p>
        <Heading>Young Standouts</Heading>
        <h1 className="pt-4 font-bold text-[20px] text-start">Goalkeepers</h1>
        <p>
          Patrick Los (2007) from the Chicago Fire and Aidan Stokes (2008) from
          the New York Red Bulls are both in the top 5 players aged 17 or
          younger with the most minutes played in Next Pro, each of them
          regularly starting for their respective sides.
        </p>
        <ul className="list-disc pl-5 space-y-2 pt-3 ">
          <li>
            Los has not signed a professional deal yet, but considering he has
            been with the USYNT and started most games for his team this year,
            it will definitely be interesting to see how he develops physically
            in the next few years.
          </li>
          <li>
            Stokes is signed to a first team deal that runs through 2027 with an
            option year for 2028. This year, Stokes has kept numerous clean
            sheets and has the potential to be a top level pro. Very impressive
            qualities and experience for such a young age.
          </li>
        </ul>
        <h1 className="pt-4 font-bold text-[20px] text-start">
          Standout Individuals
        </h1>

        <PlayerProfile
          name="Julien Lacher (2007)"
          blurb="Lacher sits top of the leaderboard for minutes played by players in his age group (2007). Lacher has made over 15 appearances in 2025 for NYCFC, contributing to his team with numerous goals and assists. He is a right footed winger, but has featured at outside back before. His best qualities are his 1v1s and ability to go down the line and cross. It will be very interesting to follow how Lacher continues to develop and whether or not he can continue to give his team meaningful minutes for the rest of 2025. Lacher has not signed a professional contract yet. "
        />
        <PlayerProfile
          name="Wyatt Holt (2009)"
          blurb="Wyatt is one of the most impressive young talents in MLS Next Pro this year. The young center back has consistently played 90 minutes for a team that does not play as many 17 and under players as other teams. This is a true testament to his high ceiling. He has represented the US at the youth level and has an excellent frame for his young age. Technically he is composed and has continued to grow every game. I would not be surprised if Holt signs a homegrown contract soon, he is a top defender for his age."
        />
        <PlayerProfile
          name="Gianmarco Di Noto (2009)"
          blurb="DiNoto is a center back for the Columbus Crew. Di Noto has shown composure and great decision making playing as the middle center back for a back three in the Crew’s second team. He reads the game well and is strong building out of the back. Di Noto is part of the USYNT."
        />
        <PlayerProfile
          name="Peter Molinari (2009)"
          blurb="Born in 2009, Molinari has already signed a contract with NYCFC. Molinari has featured on the first team bench this year and I am sure a senior debut is imminent. Molinari plays as a midfielder and is one of the talents to watch in US Soccer over the next few years. Molinari already displays great decision making and I am sure he will continue to physically develop over the next few years."
        />
        <PlayerProfile
          name="Joshua Toruato (2007)"
          blurb="Torquato (2007), plays as a left back for North Texas SC and is a real talent. Torquato is strong offensively, often contributing to his team through assists. He is physically strong and does well in his duels. With first team left back Marcos Farfan’s contract running out at the end of 2026, it will be very interesting to see if Torquato can be the next young homegrown player to make an impact in Dallas. "
        />
        <PlayerProfile
          name="Mateo Saja (2007)"
          blurb="Saja (2007) is a center forward for Inter Miami 2. The young Argentinian is a goal scorer, he is very dangerous inside the box and is strong physically. Features regularly as a starter for Inter Miami 2"
        />
        <PlayerProfile
          name="Ervin Torres (2007)"
          blurb="Torres is certainly one to watch. The Mexican-American is currently under contract with Austin FC’s second team and has made his MLS debut. Torres has over 30 professional appearances and finds the back of the net about once every 6 games, an impressive record for a midfielder. He is composed and the best part about his game is his passing ability. It will be exciting to watch him progress into the first team in the upcoming years."
        />
        <PlayerProfile
          name="Andrei Chirila (2008)"
          blurb="Andrei is one of the most exciting young defenders in MLS Next Pro. The left footed USA and Romanian national is a great defender and is a regular for Cincinnati 2. Andrei has all the qualities to be a top level pro. The 6’2 defender has a high ceiling and has continued to improve game by game with Cincinnati 2. If you watch him play, there is no surprise the club acquired the young defenders’ homegrown rights from the Philadelphia Union, the club at which he previously played in the academy. He is currently under contract with Cincinnati."
        />
        <PlayerProfile
          name="Dylan Vanney (2007)"
          blurb="Playing for Galaxy’s Ventura County, Vanney has made strong arguments to be one of the next players to sign a Homegrown deal with the Galaxy. The attacking midfielder is strong on the dribble, passes well, and is solid defensively. Additionally, the midfielder has shown that he can score goals from the midfield, a very valuable quality for any club. Vanney is not currently under contract. "
        />
        <PlayerProfile
          name="Justin Ellis (2007)"
          blurb="Signed with Orlando’s second team, Ellis is undoubtedly one of the best strikers in his age group. The Uruguayan American possesses good speed and is a constant goal threat. Worth noting, he is very good at pressing and has already made the first team bench for some MLS games. He is certainly one to watch for the future. "
        />
        <h1 className="pt-4 font-bold text-[20px] text-start">
          Teams To Watch
        </h1>
        <p className="font-bold pt-3">Houston Dynamo 2</p>
        <p>
          Houston Dynamo 2 have featured over 17 players aged 17 years old or
          younger this year, making them the team in the league to give the most
          minutes to young players. The fact that they have so much young talent
          on the pitch every game makes them a must watch team. Some standouts
          include
        </p>
        <ul className="list-disc pl-5 space-y-2 pt-3 ">
          <li>
            <b>Daniel Barrett (2009)</b> is a right footed defender who can play
            as both center and outside back. Daniel has featured in the starting
            11 for most of his side's games and is part of the USYNT. Daniel has
            all the great qualities to be a top level defender, at 16 years old
            it will be interesting to follow how he develops for the next few
            years. Barret has not yet signed a professional contract.
          </li>
          <li>
            <b>Sebastian Rodriguez (2007)</b> is signed to a homegrown deal with
            the Dynamo that runs through 2026 with multiple option years. At
            youth level, he has represented Mexico but holds dual citizenship
            with the US. Rodriguez is technically sound, bringing maturity to
            his team’s midfield despite his young age. In over 50 games in MLS
            Next Pro, Rodriguez has maintained above 84% passing accuracy.
          </li>
        </ul>
        <p className="font-bold pt-3">NYCFC 2</p>
        <p>
          City is another team that has numerous exciting young players.
          Mentioned above are Julian Lacher and Peter Molinari but the young
          talent does not stop there. City have had over 9 players aged 17 or
          younger featured this year. A couple other standouts include:
        </p>
        <ul className="list-disc pl-5 space-y-2 pt-3 ">
          <li>
            <b>Evan Lim (2008)</b> is a right footed central midfielder. Despite
            his small frame, Lim displays an outstanding level of awareness and
            decision making in the midfield. He is consistent and reliable, this
            being awarded by his coaching staff with numerous starts and a lot
            of minutes this year. Evan Lim is committed to the University of
            Notre Dame.
          </li>
          <li>
            <b>Seymour Garfield Reid (2008)</b>plays a center forward and
            possesses all the qualities to become a top level pro. Seymour has
            outstanding physical abilities, but he is also technically sound and
            a composed finisher with a lot of goals. Seymour is currently signed
            to a professional contract and has represented Jamaica at the
            national team level.
          </li>
        </ul>
        <p className="font-bold pt-3">Real Monarchs</p>
        <p>
          RSL’s second team has been a very exciting team to watch in this
          year's MLS Next Pro. Particularly because of some exciting young
          talent in the attack. Worth highlighting are Aiden Hezarkhani (2007),
          Omar Marquez (2008), and Owen Anderson (2007). All three young players
          are regulars for the side and they bring excitement and spark to the
          Monarchs attack. Aiden has consistently found the back of the net this
          year, Omar has shown his ability to contribute through both goals and
          assists, and Anderson is a natural playmaker.
        </p>
        <p>
          With these 3 young attackers in the roster, the Monarchs have become
          an exciting team to follow this year. Additionally, Diego Rocio (2007)
          has recently been introduced to the mix. He is an attacking midfielder
          who will join RSL’s first team next year. He is a dynamic and exciting
          attacker, RSL recently purchased his homegrown rights from
          Philadelphia Union.
        </p>
      </div>
      <div className="p-10">
        <b className="text-xl"> MLS Next Pro</b>
        <MLSNextProTable />
      </div>
    </div>
  );
}
export default YoungPerfLeaders;
