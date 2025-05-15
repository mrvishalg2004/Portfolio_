import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Briefcase, MapPin, Calendar, ExternalLink, ChevronDown, ChevronUp, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface InternshipProps {
  title: string;
  company: string;
  duration: string;
  period: string;
  location: string;
  isRemote: boolean;
  description: string[];
  skills: string[];
  logo: string;
  category?: string;
  certificate?: {
    title: string;
    description: string;
  };
}

interface InternshipCardProps {
  internship: InternshipProps;
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      layout
      className="w-full"
    >
      <Card 
        className={cn(
          "relative overflow-hidden border-0 transition-all duration-300",
          "backdrop-blur-sm shadow-lg hover:shadow-xl",
          "bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-800/90 dark:to-gray-900/80",
          "group cursor-pointer"
        )}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Subtle card lighting effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-brand-blue/20 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>

        <CardContent className="p-0">
          {/* Main card content with logo and basic info */}
          <div className="p-6 flex items-center gap-5">
            {/* Logo with hover effect */}
            <div className="relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <img 
                src={internship.logo} 
                alt={internship.company} 
                className="w-full h-full object-contain p-2" 
              />
            </div>

            {/* Main info with pulse effect on hover */}
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-blue/90 transition-colors duration-200">
                    {internship.title}
                  </h3>
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300">{internship.company}</p>
                </div>
                
                {/* Expand/collapse indicator */}
                <div className="flex-shrink-0 transition-transform duration-300 ease-in-out">
                  {expanded ? (
                    <ChevronUp className="w-5 h-5 text-brand-blue" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-brand-blue transition-colors duration-200" />
                  )}
                </div>
              </div>
              
              {/* Time and location info row */}
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-brand-blue/70" />
                  <span>{internship.period}</span>
                  <span className="font-medium text-gray-500 dark:text-gray-500 mx-1">·</span>
                  <span className="font-medium">{internship.duration}</span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-brand-blue/70" />
                  <span>{internship.location}</span>
                  {internship.isRemote && (
                    <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-brand-blue/80">
                      Remote
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Expandable content */}
          <AnimatePresence>
            {expanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-gray-200 dark:border-gray-700/50"
              >
                <div className="p-6 pt-5">
                  {/* Experience description with elegant bulletpoints */}
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-brand-blue" />
                    <span>Responsibilities & Achievements</span>
                  </h4>
                  
                  <ul className="space-y-3 mb-6">
                    {internship.description.map((item, idx) => (
                      <motion.li 
                        key={idx} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
                        className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-brand-blue"></div>
                        </div>
                        <span className="text-sm">{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Certificate information with fancier design */}
                  {internship.certificate && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="mb-5 p-4 rounded-xl bg-gradient-to-r from-brand-blue/5 via-brand-blue/10 to-brand-blue/5 border border-brand-blue/20 dark:from-brand-blue/10 dark:via-brand-blue/15 dark:to-brand-blue/10"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center">
                          <Award className="w-4 h-4 text-brand-blue" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-brand-blue dark:text-brand-blue">{internship.certificate.title}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">{internship.certificate.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Skills with animated appearance */}
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                      <div className="w-4 h-4 relative">
                        <div className="absolute inset-0 rounded-full bg-brand-blue animate-ping opacity-20"></div>
                        <div className="absolute inset-0 rounded-full bg-brand-blue opacity-80"></div>
                      </div>
                      <span>Skills & Technologies</span>
                    </h4>
                    
                    <div className="flex flex-wrap gap-2">
                      {internship.skills.map((skill, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                        >
                          <Badge
                            variant="outline"
                            className="bg-gradient-to-r from-brand-blue/20 to-brand-blue/10 text-brand-blue hover:from-brand-blue/30 hover:to-brand-blue/20 dark:from-brand-blue/30 dark:to-brand-blue/20 dark:text-brand-blue/90 border-brand-blue/20 px-3 py-1 text-xs font-medium transition-all duration-200"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Internship = () => {
  // Tab categories for different experience types
  const [selectedType, setSelectedType] = useState("all");

  const internships: InternshipProps[] = [
    {
      title: "Green Skills Using AI Intern",
      company: "All India Council for Technical Education (AICTE)",
      duration: "1 mos",
      period: "April 2025 to April 2025",
      location: "",
      isRemote: true,
      description: [
        "Successfully completed a 4-week internship centered on sustainable technologies and Green Skills using Artificial Intelligence.",
        "Developed a practical AI-based project from planning to deployment with mentoring support.",
        "Attended expert-led sessions covering data pre-processing, DAX, dashboard building, model optimization, and visualization techniques.",
        "Delivered a final project presentation to industry leaders from Shell and received constructive feedback.",
        "Gained hands-on experience in end-to-end data modeling and visualization for eco-conscious applications.",
        "Awarded certifications by Shell, AICTE, and Edunet Foundation for the internship accomplishment."
      ],
      skills: ["Artificial Intelligence Applications","Data Pre-processing & Modeling","Technical Presentation Skills"],
      logo: "https://media.licdn.com/dms/image/v2/D4D0BAQFYMo4H4lYsmA/company-logo_100_100/company-logo_100_100/0/1698144781838?e=1752710400&v=beta&t=H_jsha5eWVq5On6JgPpKeOFS27uhHLbjJC4ST_YkgEA",
      category: "education"
    },
    {
      title: "Full Stack Web Development Intern (MERN Stack)",
      company: "Ernst & Young (EY) with AICTE",
      duration: "1 mos",
      period: "March 2025 to April 2025",
      location: "",
      isRemote: true,
      description: [
        "Completed a 6-week project-based internship focused on Full Stack Web Development using the MERN stack.",
        "Participated in masterclasses covering Branding, UI/UX Design, and Containerization in Web Development.",
        "Engaged in personalized mentorship and “Ask Me Anything” sessions to receive expert feedback.",
        "Independently developed a web application prototype addressing a real-world challenge, guided by a mentor.",
        "Presented the final project to industry experts from EY GDS during a capstone event.",
        "Earned certifications from EY GDS, AICTE, and Edunet Foundation for successful completion."
      ],
      skills: ["MongoDB","React.js","Node.js","Version Control"],
      logo: "https://media.licdn.com/dms/image/v2/C510BAQGpRhkpxp5A9A/company-logo_100_100/company-logo_100_100/0/1630570672166/ernstandyoung_logo?e=1752710400&v=beta&t=ARWJzBh26idtnCMLtNfuytaWRN3OYTWNNzTnv0-tAaw",
      category: "corporate",
      // certificate: {
      //   title: "Technology Consulting Certificate",
      //   description: "Professional certificate for completing the EY Technology Consulting Internship Program with excellence."
      // }
    },
    {
      title: "Emerging Technologies Intern",
      company: "Edunet Foundation",
      duration: "1 mos",
      period: "Dec 2023 to Jan 2024",
      location: "",
      isRemote: true,
      description: [
       "Gained hands-on experience with the IBM Cloud Platform and SkillsBuild, expanding technical skills in cloud computing.",
       "Worked alongside mentors and colleagues, learning best practices and insights from leaders in emerging technologies.",
       "Contributed to a collaborative, team-oriented environment, improving communication and project management abilities."
      ],
      skills: ["Artificial Intelligence (AI)","Python with machine learning ","Cloud","Problem Solving"],
      logo: "https://media.licdn.com/dms/image/v2/C4E0BAQEA0V9yzn_dPg/company-logo_100_100/company-logo_100_100/0/1646199475973/edunetfoundation_logo?e=1752710400&v=beta&t=aIrh9vYr6jfy5vFR5li5T9BlUPPIwYTHLAIvyrENClQ",
      category: "education"
    },
    {
      title: "AI Intern",
      company: "_VOIS",
      duration: "1 mos",
      period: "Oct 2023 to Nov 2023",
      location: "",
      isRemote: true,
      description: [
       "Gained hands-on experience in artificial intelligence, building skills that enhance employability and industry readiness.",
       "Contributed to an AI-driven project, honing problem-solving abilities and developing technical solutions to real-world challenges.",
       "Developed independent working skills through project-based learning, strengthening self-management and adaptability in AI tasks.",
       "Enhanced understanding of AI applications, boosting confidence in delivering meaningful solutions in the field."
        
      ],
      skills: ["Machine Learning", "Natural Language Processing (NLP)", "Python for AI", "Deep Learning", "Python with machine learning", "Data Analysis"],
      logo: "https://media.licdn.com/dms/image/v2/D4D0BAQF2ToADEarOqA/company-logo_100_100/company-logo_100_100/0/1733054966467/vois_logo?e=1752710400&v=beta&t=BjZErcWxF_YaGEzm-6hpjKUORNthC2nw61hsWGNo6cw",
      category: "corporate"
    },
    {
      title: "Python Developer",
      company: "iBase Electrosoft LLP",
      duration: "1 mos",
      period: "Jul 2022 to Aug 2022",
      location: "Nagpur, Maharashtra, India",
      isRemote: false,
      description: [
        "Developed and optimized Python-based solutions with a strong focus on machine learning, contributing to real-world, data-driven projects.",
        "Collaborated with a skilled team to implement innovative solutions, enhancing my understanding of Python's applications in machine learning.",
        "Engaged in hands-on projects that strengthened my programming skills, including developing models and algorithms to address practical challenges.",
        "Applied machine learning techniques to derive insights, adding value to the company's projects and delivering impactful results.",
        "Gained exposure to industry-leading practices in machine learning, expanding my technical expertise and readiness for future roles in AI and software development."
      ],
      skills: ["Java", "Python with machine learning", "Python (Programming Language)", "IDLE", "MySQL"],
      logo: "https://media.licdn.com/dms/image/v2/C560BAQGG8EPwRomhMw/company-logo_100_100/company-logo_100_100/0/1672741491911/ibaseelctrosoft_logo?e=1752710400&v=beta&t=oLG5saqLCq2Rt4NwX-Ld7cjfTaWwppTljlev5JVwsQo",
      category: "startup"
    }
  ];

  // Filter internships based on selected category
  const filteredInternships = selectedType === "all" 
    ? internships 
    : internships.filter(internship => internship.category === selectedType);

  return (
    <section id="experience" className="relative py-24 overflow-hidden">
      {/* Modern geometric background elements */}
      <div className="absolute inset-0 bg-white dark:bg-gray-900 z-0">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[30rem] h-[30rem] rounded-full bg-gradient-to-br from-brand-blue/10 to-brand-coral/5 filter blur-3xl opacity-50 dark:opacity-30"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[30rem] h-[30rem] rounded-full bg-gradient-to-tr from-brand-coral/5 to-brand-blue/10 filter blur-3xl opacity-50 dark:opacity-30"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none dark:opacity-[0.05]"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-center mb-3 font-bold text-3xl md:text-4xl text-gray-900 dark:text-gray-100">
            Professional Experience
          </h2>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            My professional journey has equipped me with a diverse skill set through experiences in AI, software development, and emerging technologies across various organizations.          
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="mb-10">
          <Tabs defaultValue="all" className="w-full max-w-2xl mx-auto">
            <TabsList className="grid grid-cols-4 mb-8 bg-gray-100/80 dark:bg-gray-800/50 p-1 rounded-xl">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-brand-blue rounded-lg transition-all duration-200"
                onClick={() => setSelectedType("all")}
              >
                All
              </TabsTrigger>
              <TabsTrigger 
                value="corporate" 
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-brand-blue rounded-lg transition-all duration-200"
                onClick={() => setSelectedType("corporate")}
              >
                Corporate
              </TabsTrigger>
              <TabsTrigger 
                value="education" 
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-brand-blue rounded-lg transition-all duration-200"
                onClick={() => setSelectedType("education")}
              >
                Education
              </TabsTrigger>
              <TabsTrigger 
                value="startup" 
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-brand-blue rounded-lg transition-all duration-200"
                onClick={() => setSelectedType("startup")}
              >
                Startup
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="space-y-6">
                {filteredInternships.map((internship, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <InternshipCard internship={internship} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="corporate" className="mt-0">
              <div className="space-y-6">
                {filteredInternships.map((internship, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <InternshipCard internship={internship} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="education" className="mt-0">
              <div className="space-y-6">
                {filteredInternships.map((internship, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <InternshipCard internship={internship} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="startup" className="mt-0">
              <div className="space-y-6">
                {filteredInternships.map((internship, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <InternshipCard internship={internship} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Internship;
