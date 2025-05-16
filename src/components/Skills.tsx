
import React from "react";
import { motion } from "framer-motion";

interface SkillCategoryProps {
  title: string;
  skills: string[];
  colorClass: string;
  icon: string;
  index: number;
}

const SkillCategory = ({ title, skills, colorClass, icon, index }: SkillCategoryProps) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3 + (index * 0.1),
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <motion.div 
      className="relative overflow-hidden rounded-xl p-6 bg-white dark:bg-gray-800/60 backdrop-blur-sm shadow-md border border-gray-100 dark:border-gray-700/30 transition-all duration-300"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      whileHover={{
        boxShadow: `0 0 15px 3px ${colorClass.replace('text-', '').includes('brand-blue') ? 'rgba(59, 130, 246, 0.4)' : 
                   colorClass.replace('text-', '').includes('brand-coral') ? 'rgba(255, 111, 97, 0.4)' : 
                   colorClass.replace('text-', '').includes('green') ? 'rgba(16, 185, 129, 0.4)' : 
                   colorClass.replace('text-', '').includes('purple') ? 'rgba(139, 92, 246, 0.4)' : 
                   colorClass.replace('text-', '').includes('amber') ? 'rgba(245, 158, 11, 0.4)' : 
                   colorClass.replace('text-', '').includes('sky') ? 'rgba(14, 165, 233, 0.4)' : 'rgba(99, 102, 241, 0.4)'}`,
        borderColor: `${colorClass.replace('text-', '').includes('brand-blue') ? 'rgba(59, 130, 246, 0.6)' : 
                      colorClass.replace('text-', '').includes('brand-coral') ? 'rgba(255, 111, 97, 0.6)' : 
                      colorClass.replace('text-', '').includes('green') ? 'rgba(16, 185, 129, 0.6)' : 
                      colorClass.replace('text-', '').includes('purple') ? 'rgba(139, 92, 246, 0.6)' : 
                      colorClass.replace('text-', '').includes('amber') ? 'rgba(245, 158, 11, 0.6)' : 
                      colorClass.replace('text-', '').includes('sky') ? 'rgba(14, 165, 233, 0.6)' : 'rgba(99, 102, 241, 0.6)'}`,
        scale: 1.02,
      }}
    >
      {/* Background decoration */}
      <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full ${colorClass.replace('text-', 'bg-').split(' ')[0]}/10 blur-2xl`}></div>
      <div className={`absolute -bottom-8 -left-8 w-24 h-24 rounded-full ${colorClass.replace('text-', 'bg-').split(' ')[0]}/5 blur-xl`}></div>
      
      <div className="flex items-center mb-5">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${colorClass.replace('bg-', '').replace('dark:bg-', 'dark:')}`}>
          <span className="text-xl" dangerouslySetInnerHTML={{ __html: icon }}></span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{title}</h3>
      </div>
      
      <div className="flex flex-wrap gap-2 relative z-10">
        {skills.map((skill, skillIndex) => (
          <motion.span
            key={skillIndex}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              boxShadow: `0 0 12px 2px ${colorClass.includes('brand-blue') ? 'rgba(59, 130, 246, 0.5)' : 
                          colorClass.includes('brand-coral') ? 'rgba(255, 111, 97, 0.5)' : 
                          colorClass.includes('green') ? 'rgba(16, 185, 129, 0.5)' : 
                          colorClass.includes('purple') ? 'rgba(139, 92, 246, 0.5)' : 
                          colorClass.includes('amber') ? 'rgba(245, 158, 11, 0.5)' : 
                          colorClass.includes('sky') ? 'rgba(14, 165, 233, 0.5)' : 'rgba(99, 102, 241, 0.5)'}`
            }}
            className={`px-3 py-1.5 rounded-lg ${colorClass} font-medium text-sm border border-current/10 shadow-sm backdrop-blur-sm transition-all duration-300`}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const skillsData = [
    {
      title: "Programming",
      skills: ["Java", "Python", "JavaScript", "TypeScript", "C++"],
      colorClass: "bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20",
      icon: "💻"
    },
    {
      title: "Web Development",
      skills: ["HTML", "CSS", "React", "Node.js", "Next.js", "Tailwind CSS", "Redux", "Vite"],
      colorClass: "bg-brand-coral/10 text-brand-coral dark:bg-brand-coral/20",
      icon: "🌐"
    },
    {
      title: "Databases",
      skills: ["MySQL", "MongoDB", "PostgreSQL", "Firebase"],
      colorClass: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
      icon: "🗃️"
    },
    {
      title: "Tools",
      skills: ["Git", "GitHub", "VS Code", "Docker", "Google Colab", "Figma"],
      colorClass: "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
      icon: "🔧"
    },
    {
      title: "AI/ML",
      skills: ["TensorFlow", "PyTorch", "Scikit-learn", "NLP", "Computer Vision", "Deep Learning"],
      colorClass: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
      icon: "🧠"
    }
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-12 left-0 w-40 h-40 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-12 right-0 w-60 h-60 bg-gradient-to-l from-amber-500/5 to-coral-500/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title inline-block relative">
            Skills & Expertise
            <motion.div 
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-brand-blue to-brand-coral rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            ></motion.div>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">
            A showcase of my technical toolkit and expertise across various domains in technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category, index) => (
            <SkillCategory
              key={index}
              index={index}
              title={category.title}
              skills={category.skills}
              colorClass={category.colorClass}
              icon={category.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
