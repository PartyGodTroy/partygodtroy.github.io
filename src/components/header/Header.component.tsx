import type { SiteSectionDesc } from "@/lib/SiteSectionDesc";
import { useEffect, useState } from "react";
import { FaCodepen, FaGithub, FaLinkedin } from "react-icons/fa";

const HeaderComponent: React.FC = () => {
  const [siteSections, setSiteSections] = useState<SiteSectionDesc[]>([]);
  
  useEffect(()=>{
    const timer = setInterval(()=>{
        if ((window as any).siteSections){
          setSiteSections((window as any).siteSections);
          clearInterval(timer);
        }
    },200)
  },[])

  return (
    <header>
      <nav>
        <div className="navbar bg-base-100 justify-between shadow-sm">
          <div className="flex-none">
            <a className="btn btn-ghost text-xl">Ventroy Rolle</a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              {siteSections.map((section) => {
                return (
                  <li>
                    <a
                      title={section.name ?? ''}
                      href={`#section-${section.index}`}
                    >
                      {section.name ?? ''}
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
