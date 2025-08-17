import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { Navigation, Pagination, Scrollbar, Autoplay, Grid } from 'swiper/modules';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import type { PaginationOptions } from "swiper/types";


export default () => {
  const skills: { name: string; description: string; image: string }[] = [
    {
      name: "Backend Engineering",
      description:
        "Architecting and building scalable, data-driven services using .NET, PHP, Node.js, and Python to support high-traffic applications.",
      image: "/skills/backend-engineering.webp",
    },
    {
      name: "RESTful APIs & Microservices",
      description:
        "Designing and implementing robust RESTful services and microservice architectures for seamless data integration and modular development.",
      image: "/skills/api-microservices.webp",
    },
    {
      name: "CI/CD & DevOps",
      description:
        "Automating build, test, and deployment pipelines with GitHub, Azure DevOps, Docker, and container orchestration to ensure reliable deliveries.",
      image: "/skills/devops.png",
    },
    {
      name: "Containerization & Docker",
      description:
        "Creating and optimizing Docker images and container workflows for LAMP, ASP.NET, and Node environments to accelerate deployments.",
      image: "/skills/docker.jpg",
    },
    {
      name: "Databases & ETL",
      description:
        "Crafting efficient SQL queries, stored procedures, and ETL pipelines (SSIS, Pandas) across MySQL, Postgres, and MSSQL for analytics and reporting.",
      image: "/skills/databases.jpg",
    },
    {
      name: "Frontend Development",
      description:
        "Translating Figma and Adobe XD designs into reusable React and Vue components, leveraging HTML5, CSS3 (Tailwind, SASS), and modern JS.",
      image: "/skills/frontend.jpg",
    },
    {
      name: "Web Accessibility & Responsive Design",
      description:
        "Ensuring WCAG-compliant, mobile-first experiences that load quickly (FCP/LCP optimizations) and work across all devices.",
      image: "/skills/ada.png",
    },
    {
      name: "CMS & Headless CMS",
      description:
        "Building custom themes and plugins in WordPress, Drupal, Umbraco, and headless integrations with Builder.io and Contentful via GraphQL.",
      image: "/skills/cms.png",
    },
    {
      name: "Testing & Quality Assurance",
      description:
        "Driving test-first development with NUnit, Jest, and Cypress to cover unit, integration, and end-to-end scenarios, reducing bugs by 25%.",
      image: "/skills/testing.jpg",
    },
    {
      name: "Performance Optimization",
      description:
        "Profiling and tuning full-stack applications—minifying assets, lazy-loading resources, and optimizing database queries for faster UX.",
      image: "/skills/performance.png",
    },
  ];

  const pagination:PaginationOptions ={ clickable: true,enabled: true, el:'.my-pagination',   }

  return (
    <>
    <Swiper
      spaceBetween={20}
      slidesPerView={4}
      modules={[Navigation, Pagination, Scrollbar, Autoplay, Grid]}
      breakpoints={{
        0: {
          slidesPerView: 1,
          centeredSlidesBounds: true,
          centeredSlides: true,
          pagination,
        },
        768: {
          slidesPerView: 2,
            centeredSlidesBounds: true,
          centeredSlides: true,
          pagination,

        },
        1024: {
          slidesPerView: 3,
            centeredSlidesBounds: true,
          centeredSlides: true,
          pagination,

        },
        1280: {
          slidesPerView: 4,
            centeredSlidesBounds: true,
          centeredSlides: true,
          pagination,

        },
      }}
  
      centeredSlides={true}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      pagination={pagination}
      loop={true}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {skills.map((skill) => {
        return (
          <SwiperSlide key={skill.name} className="">
            <div className="w-screen flex justify-center">
              <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                  <img
                    src={skill.image}
                    alt={skill.name}
                  className="h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{skill.name}</h2>
                  <p>
                    {skill.description}
                  </p>
                  <div className="card-actions justify-end">
              
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
    <div className="w-screen flex justify-center">
      <div className="my-pagination min-h-10 mt-10 !w-fit"></div>
    </div>
    </>
  );
};
