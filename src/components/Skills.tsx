
import React from "react";

interface SkillCategoryProps {
  title: string;
  skills: string[];
  colorClass: string;
}

const SkillCategory = ({ title, skills, colorClass }: SkillCategoryProps) => {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <span
            key={index}
            className={`skill-badge ${colorClass} transition-transform hover:scale-105`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const skillsData = [
    {
      title: "Programming",
      skills: ["Java", "Python", "JavaScript"],
      colorClass: "bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20",
    },
    {
      title: "Web Development",
      skills: ["HTML", "CSS", "React", "Node.js", "Next.js", "Tailwind"],
      colorClass: "bg-brand-coral/10 text-brand-coral dark:bg-brand-coral/20",
    },
    {
      title: "Databases",
      skills: ["MySQL", "MongoDB"],
      colorClass: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
    },
    {
      title: "Tools",
      skills: ["GitHub", "Google Colab"],
      colorClass: "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
    },
    {
      title: "AI/ML",
      skills: ["TensorFlow", "PyTorch", "Scikit-learn", "NLP"],
      colorClass: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
    },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container-custom">
        <h2 className="section-title text-center">Skills</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {skillsData.map((category, index) => (
            <SkillCategory
              key={index}
              title={category.title}
              skills={category.skills}
              colorClass={category.colorClass}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
