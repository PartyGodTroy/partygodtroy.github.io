import type { SiteSectionDesc } from "@/lib/SiteSectionDesc";
import { useEffect, useState } from "react";
import { FaCodepen, FaGithub, FaLinkedin } from "react-icons/fa";

const HeaderComponent: React.FC = () => {
  const [siteSections, setSiteSections] = useState<SiteSectionDesc[]>([]);
  const [selectedSection, setSelectedSection] = useState<SiteSectionDesc>();

  useEffect(() => {
    const initialDataTimer = setInterval(() => {
      if ((window as any).siteSections) {
        setSiteSections((window as any).siteSections);
        clearInterval(initialDataTimer);
      }
    }, 200);

    const checkSelectedSection = setInterval(() => {
      if ((window as any).selectedSection) {
        if (selectedSection != (window as any).selectedSection){
          setSelectedSection((window as any).selectedSection);
        }
      }
    }, 200);

    return () => {
      clearInterval(initialDataTimer);
      clearInterval(checkSelectedSection);
    };
  }, []);

  return (
    <header>
      <nav>
        <div className="navbar bg-base-100 justify-between shadow-sm">
          <div className="flex-none">
            <a className="btn btn-ghost text-xl" href="#section-hero">
              Home
            </a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              {siteSections.map((section) => {
                return (
                  <li key={section.name}>
                    <a
                      title={section.name ?? ""}
                      href={`#section-${section.index}`}
                      className={`${selectedSection?.name && selectedSection.name == section.name ? 'font-bold' : ''} transition-all`}
                    >
                      {section.name ?? ""}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a
                  title="linkedin"
                  href="https://linkedin.com/in/ventroyrolle"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin size={20} />
                </a>
              </li>
              <li>
                <a
                  title="codepen"
                  href="https://codepen.io/PartyGodTroy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaCodepen size={20} />
                </a>
              </li>
              <li>
                <a
                  title="github"
                  href="https://github.com/PartyGodTroy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub size={20} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
