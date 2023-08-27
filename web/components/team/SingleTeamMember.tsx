import { TeamMember } from "@/lib/types";
import Image from "next/legacy/image";
import { FaLinkedin } from "react-icons/fa";

const SingleTeamMember = ({ member }: { member: TeamMember }) => {
const { name, image, designation, education, experience, linkedin } = member;

  return (
    <div className="w-full">
      <div className="wow fadeInUp rounded-md bg-white p-8 shadow-one dark:bg-[#1D2144] lg:px-5 xl:px-8" data-wow-delay=".1s">
        <div className="flex items-center">
          <div className="relative flex-shrink-0 mr-4 h-32 w-32 overflow-hidden rounded-full">
            <Image src={image} alt={name} layout="fill" objectFit="cover" />
          </div>
          <div className="w-full">
            <div className="flex items-center mb-2">
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="mr-2">
                <FaLinkedin className="text-blue-500 text-xl" />
              </a>
              <h5 className="text-xl font-semibold text-dark dark:text-white mb-1">
                {name}
              </h5>
            </div>
            <p className="text-sm text-body-color mb-2">{designation}</p>
            <div className="border-t border-body-color border-opacity-10 pt-3">
              <p className="text-sm text-body-color mb-2">
                <span className="font-semibold">Education:</span> {education}
              </p>
              <h6 className="text-sm font-semibold text-body-color mb-1">
                Previous Experience
              </h6>
              <ul className="list-disc list-inside text-sm text-body-color">
                {experience.map((exp, index) => (
                  <li key={index}>{exp}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTeamMember;