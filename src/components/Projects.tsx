
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  image: string;
  githubLink?: string;
  demoLink?: string;
}

const ProjectCard = ({
  title,
  description,
  techStack,
  image,
  githubLink,
  demoLink,
}: ProjectCardProps) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="h-full"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div 
        className={cn(
          "h-full relative flex flex-col overflow-hidden rounded-xl",
          "border border-white/10 bg-white/5 backdrop-blur-md dark:bg-gray-800/30 shadow-md",
          "hover:shadow-lg hover:shadow-brand-blue/5 transition-all duration-300"
        )}
        style={{
          border: '2px solid transparent',
          backgroundClip: 'padding-box',
          boxShadow: hovered ? '0 0 20px 3px rgba(79, 70, 229, 0.6), 0 0 40px 6px rgba(59, 130, 246, 0.3)' : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        <div className="relative h-52 overflow-hidden rounded-t-xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 to-brand-coral/20 opacity-50 z-10"></div>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        
        <div className="p-6 flex flex-col flex-grow z-10">
          <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-blue/90 transition-colors duration-300">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {techStack.map((tech, index) => (
              <HoverCard key={index}>
                <HoverCardTrigger asChild>
                  <span className="bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-brand-blue/90 px-2.5 py-1 rounded-full text-xs font-medium cursor-default transition-all duration-300 hover:bg-brand-blue/20">
                    {tech}
                  </span>
                </HoverCardTrigger>
                <HoverCardContent className="w-auto p-2 text-xs">
                  {tech}
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
          
          <div className="flex gap-3 mt-auto">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-300"
              >
                <Github size={14} />
                Code
              </a>
            )}
            {demoLink && (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-brand-blue hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-300"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "InterviewPro",
      description: "AI platform for simulating interviews with real-time feedback on communication skills and technical knowledge.",
      techStack: ["Python", "React", "AI", "NLP"],
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1470&auto=format&fit=crop",
      githubLink: "https://github.com/mrvishalg2004/Interviewpro",
      demoLink: "https://liveinterviewpro.vercel.app/",
    },
    {
      title: "Disease Prediction ML App",
      description: "Machine learning model that analyzes symptoms to predict potential diseases with high accuracy rate.",
      techStack: ["Python", "Scikit-learn", "Django", "Machine Learning"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1470&auto=format&fit=crop",
      githubLink: "https://github.com/mrvishalg2004/Disease-Prediction-using-Django-and-Machine-Learning",
      demoLink: "https://github.com/mrvishalg2004/Disease-Prediction-using-Django-and-Machine-Learning",
    },
  ];

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-brand-blue/10 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-brand-coral/10 rounded-full filter blur-3xl opacity-20"></div>
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-center">Projects</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion
            for software development and AI.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
