import { TeamMember } from "@/lib/types";
import SectionTitle from "../common/SectionTitle";
import SingleTeamMember from "./SingleTeamMember";
import { SectionGradient } from "../common/section-gradient";

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "David Nordström",
    designation: "CEO & Co-Founder",
    image: "/images/team/david-nordstrom.png",
    education: "M.Sc from Chalmers in Engineering Mathematics",
    experience: ["Private Equity (NREP)", "Investment Banking (SEB, DNB)"],
    linkedin: "https://www.linkedin.com/in/david-nordstr%C3%B6m-807b64183/",
  },
  {
    id: 2,
    name: "William Holmberg",
    designation: "CTO & Co-Founder",
    image: "/images/team/william-holmberg.png",
    education: "Started Chalmers IT program",
    experience: ["4 years as Fullstack Developer at Dotnet Mentor managing large scale projects for companies such as Castellum"],
    linkedin: "https://www.linkedin.com/in/william-holmberg-361357164/?originalSubdomain=se",
  },
  {
    id: 3,
    name: "Sara Arnesen",
    designation: "Member of the Board",
    image: "/images/team/sara-arnesen.jpeg",
    education: "M.Sc from Chalmers in Data Science and AI",
    experience: ["Management Consulting (McKinsey, BCG)", "Investment Banking (Morgan Stanley)", "Asset Management (NBIM)"],
    linkedin: "https://www.linkedin.com/in/saraarnesen/",
  },
  {
    id: 4,
    name: "Jawad Feizi",
    designation: "Chief Sales Officer",
    image: "/images/team/jawad-feizi.jpeg",
    education: "M.Sc from Chalmers in Supply Chain Mgm.",
    experience: ["Chief Operating Officer & Category Manager at Palliance", "ASICS FrontRunner Sweden"],
    linkedin: "https://www.linkedin.com/in/jawad-feizi/",
  },

];

const Team = () => {
  return (
    <section className="relative z-10 bg-primary/[.03] py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Möt vårt Team"
          paragraph="Vårt team växer kontinuerligt, känn dig välkommen att kontakta oss om du är intresserad av att delta på vår resa."
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-2">
          {teamMembers.map((member) => (
            <SingleTeamMember key={member.id} member={member} />
          ))}
        </div>
      </div>
      <div className="absolute top-5 right-0 z-[-1]">
        {/* Replace with your SVG shape */}
      </div>
      <div className="absolute left-0 bottom-5 z-[-1]">
        {/* Replace with your SVG shape */}
      </div>
      <SectionGradient />
    </section>
  );
};

export default Team;
