interface ProjectDesc {
  name: string;
  description: string;
  image: string;
  link: string;
}

const ProjectsComponent: React.FC = () => {
  const projects: ProjectDesc[] = [
    {
      name: "Brunnerworks.com",
      description:
        "Brunnerworks site built with Next.js, Vercel, and Builder.io",
      image: "/projects/brunner-sc.png",
      link: "https://brunnerworks.com",
    },
    {
      name: "Brusters.com",
      description: "Brusters marketing site built with React and Umbraco",
      image: "/projects/brusters-sc.png",
      link: "https://brusters.com",
    },
    {
      name: "Green Building Alliance",
      description: "GBA site built with Vue and Umbraco",
      image: "/projects/gba-sc.png",
      link: "https://gba.org",
    },
    {
      name: "Wesbanco.com",
      description: "Wordpress site for Wesbanco built with Elementor",
      image: "/projects/wesbanco-sc.png",
      link: "https://wesbanco.com",
    },
    {
      name: "Goodwill North GA",
      description: "Wordpress site for Goodwill of North GA built with ACF",
      image: "/projects/goodwill-sc.png",
      link: "https://goodwillng.com",
    },
    {
      name: "Advect",
      description: "Library for building and sharing webcomponents",
      image: "/projects/advect-sc.png",
      link: "https://github.com/PartyGodTroy/advect",
    },
  ];

  return (
    <>
      <div className="my-10">
        <h2 className="text-4xl text-center font-bold mb-5">Projects</h2>
        <div className="grid gap-4 lg:grid-cols-2 place-content-center max-w-5xl mx-auto pb-5">
          {projects.map((proj,index) => {
            return (
              <div
                key={proj.name}
                className="mockup-window bg-base-100 border border-base-300 w-full  fade-in-bottom" 
              >
                <a className="bg-base-300 p-2 rounded-2xl" target="_blank" rel="noopener noreferrer" href={proj.link}>
                  {proj.link}
                </a>
                <div>
                  <a href={proj.link} target="_blank" rel="noopener noreferrer">
                      <img
                        className="aspect-video"
                        src={proj.image}
                        alt={proj.name}
                      />
                  </a>
                </div>
                <div className="p-4">
                  {proj.name}
                  {proj.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProjectsComponent;
