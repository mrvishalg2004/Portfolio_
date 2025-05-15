
import React, { useEffect } from "react";

interface EducationItemProps {
  degree: string;
  institution: string;
  duration: string;
  description: string;
  logo: string;
}

const EducationItem = ({
  degree,
  institution,
  duration,
  description,
  logo,
}: EducationItemProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div className="relative pl-8 pb-8 group">
      {/* Timeline Line */}
      <div className="absolute top-0 left-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>

      {/* Timeline Dot */}
      <div className="absolute top-0 left-0 w-5 h-5 rounded-full bg-brand-blue -translate-x-1/2 group-hover:scale-125 transition-transform"></div>

      {/* Content with glowing border */}
      <div 
        className="card p-6 ml-4 transition-all duration-300 rounded-lg bg-white dark:bg-gray-800 backdrop-blur-sm education-card" 
        style={{
          transform: isHovered ? 'translateX(0.5rem) translateY(-0.25rem)' : 'translateX(0)',
          border: '2px solid transparent',
          backgroundClip: 'padding-box',
          boxShadow: isHovered ? '0 0 20px 3px rgba(79, 70, 229, 0.6), 0 0 40px 6px rgba(59, 130, 246, 0.3)' : '0 1px 3px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-white dark:bg-gray-700 p-1 border border-gray-100 dark:border-gray-600 shadow-sm">
            <img 
              src={logo} 
              alt={institution} 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{degree}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-1">{institution}</p>
            <p className="text-sm text-brand-blue mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {duration}
            </p>
            <p className="text-gray-700 dark:text-gray-300">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Education = () => {
  const educationItems = [
    {
      degree: "B.Tech in Artificial Intelligence",
      institution: "G.H. Raisoni College of Engineering",
      duration: "2023 - 2026",
      description:
        "Specializing in AI algorithms, machine learning, and data science with a focus on practical applications.",
      logo: "https://rgicdn.s3.ap-south-1.amazonaws.com/ghrcenagpur/new-images/ghrce-logo-img.webp",
    },
    {
      degree: "Diploma in Computer Technology",
      institution: "Govt Polytechnic Bramhapuri",
      duration: "2021 - 2023",
      description:
        "Studied core computer science concepts, programming fundamentals, and systems design.",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL8qZuReIA8agi83Ww4mWrMM2p9sOjLcC9pQ&s",
    },
  ];

  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <h2 className="section-title text-center">Education</h2>
        <div className="mt-12 max-w-3xl mx-auto">
          {educationItems.map((item, index) => (
            <EducationItem key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

// We're now using inline styles for the glow effect instead of CSS injection

export default Education;
