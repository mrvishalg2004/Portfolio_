
import React, { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ExternalLink, Calendar, Award, User, BookOpen, Clock, Key, ChevronRight, CheckCircle2, Database } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface CertificateItemProps {
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  description?: string;
  skills?: string[];
  logo: string;
  image?: string;
}

export const CertificateItem = ({
  title,
  issuer,
  issueDate,
  expiryDate,
  credentialId,
  description,
  skills,
  logo,
  image,
}: CertificateItemProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div 
          whileHover={{ y: -3, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          className="h-full"
        >
          <Card className="certificate-card h-full overflow-hidden backdrop-blur-sm relative bg-white/90 dark:bg-slate-800/90 border border-gray-100 dark:border-gray-700" 
            style={{
              boxShadow: hovered ? '0 0 20px 3px rgba(79, 70, 229, 0.6), 0 0 40px 6px rgba(59, 130, 246, 0.3)' : 'none',
              transition: 'all 0.3s ease'
            }}
          >
            {/* AWS Certified tags removed as requested */}
            
            {/* Card content */}
            <CardContent className="p-5 pt-6">
              {/* No images for certificate cards as requested */}
              
              {/* Header section with logo and title */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white dark:bg-slate-700 p-1.5 border border-gray-100 dark:border-gray-700 shadow-sm">
                  <img src={logo} alt={issuer} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  {/* Only show title here if there's no image */}
                  <div className="flex flex-col">
                    <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 leading-tight">
                      {/* Format certificate name to look nicer with proper colors */}
                      {title.includes("RDBMS") ? (
                        <>
                          <span className="text-blue-600 dark:text-blue-400">PostgreSQL</span> Database Training
                        </>
                      ) : title.includes("Electronic Art") ? (
                        <>
                          <span className="text-red-500 dark:text-red-400">Electronic Arts</span> Engineering
                        </>
                      ) : title.includes("AWS") && title.includes("APAC") ? (
                        <>
                          <span className="text-orange-500 dark:text-orange-400">AWS</span> Solutions Architecture
                        </>
                      ) : title.includes("Accenture") ? (
                        <>
                          <span className="text-purple-600 dark:text-purple-400">Accenture</span> Developer Technology
                        </>
                      ) : title.includes("Overview of") ? (
                        <>
                          <span className="text-green-600 dark:text-green-400">GIS</span> - Geographic Information Systems
                        </>
                      ) : title.includes("Remote Sensing") ? (
                        <>
                          <span className="text-emerald-600 dark:text-emerald-400">Remote Sensing</span> & Image Analysis
                        </>
                      ) : title.includes("SysOps") ? (
                        <>
                          <span className="text-orange-500 dark:text-orange-400">AWS</span> SysOps Administrator
                        </>
                      ) : title.includes("Cloud Practitioner") ? (
                        <>
                          <span className="text-orange-500 dark:text-orange-400">AWS</span> Cloud Practitioner
                        </>
                      ) : (
                        title
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{issuer}</p>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-500 gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} className="text-brand-blue" />
                      <span>{issueDate}</span>
                    </div>
                    {credentialId && (
                      <div className="flex items-center gap-1">
                        <Key size={12} className="text-brand-blue" />
                        <span className="font-mono truncate max-w-[80px]">{credentialId.substring(0, 8)}...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Description - truncated */}
              {description && (
                <div className="mb-3">
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                    {description}
                  </p>
                </div>
              )}
              
              {/* Skills tags with visual distinction */}
              {skills && skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-1">
                  {skills.slice(0, 3).map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="text-xs py-0 font-normal text-white"
                      style={{
                        background: index % 3 === 0 ? 'linear-gradient(135deg, #2563EB, #3B82F6)' : 
                        index % 3 === 1 ? 'linear-gradient(135deg, #059669, #10B981)' : 
                        'linear-gradient(135deg, #D97706, #F59E0B)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                      }}
                    >
                      {skill}
                    </Badge>
                  ))}
                  {skills.length > 3 && (
                    <Badge variant="outline" className="text-xs py-0 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                      +{skills.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
            
            <CardFooter className="p-0 mt-auto">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-between text-xs rounded-none h-10 border-t border-gray-100 dark:border-gray-700 text-brand-blue hover:text-brand-blue hover:bg-brand-blue/5"
              >
                <span className="flex items-center gap-1">
                  <Award size={14} />
                  View Certificate
                </span>
                <ChevronRight size={14} />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </DialogTrigger>
      
      {/* Certificate detail dialog */}
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <DialogHeader className="p-6 pb-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-2">
            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white dark:bg-slate-700 p-2 border-2 border-gray-100 dark:border-gray-700 shadow-sm">
              <img src={logo} alt={issuer} className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <Badge variant="secondary" className="text-xs bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Verified
                </Badge>
                <Badge variant="outline" className="text-xs">{issueDate}</Badge>
              </div>
              <DialogTitle className="text-xl font-bold">
                {/* Format certificate name to look nicer with proper colors */}
                {title.includes("RDBMS") ? (
                  <>
                    <span className="text-blue-600 dark:text-blue-400">PostgreSQL</span> Database Training
                  </>
                ) : title.includes("Electronic Art") ? (
                  <>
                    <span className="text-red-500 dark:text-red-400">Electronic Arts</span> Engineering
                  </>
                ) : title.includes("AWS") && title.includes("APAC") ? (
                  <>
                    <span className="text-orange-500 dark:text-orange-400">AWS</span> Solutions Architecture
                  </>
                ) : title.includes("Accenture") ? (
                  <>
                    <span className="text-purple-600 dark:text-purple-400">Accenture</span> Developer Technology
                  </>
                ) : title.includes("Overview of") ? (
                  <>
                    <span className="text-green-600 dark:text-green-400">GIS</span> - Geographic Information Systems
                  </>
                ) : title.includes("Remote Sensing") ? (
                  <>
                    <span className="text-emerald-600 dark:text-emerald-400">Remote Sensing</span> & Image Analysis
                  </>
                ) : title.includes("SysOps") ? (
                  <>
                    <span className="text-orange-500 dark:text-orange-400">AWS</span> SysOps Administrator
                  </>
                ) : title.includes("Cloud Practitioner") ? (
                  <>
                    <span className="text-orange-500 dark:text-orange-400">AWS</span> Cloud Practitioner
                  </>
                ) : (
                  title
                )}
              </DialogTitle>
              <DialogDescription className="text-base">{issuer}</DialogDescription>
            </div>
          </div>
          
          {/* No images in certificate dialogs as requested */}
        </DialogHeader>
        
        {/* Tabs for organizing information */}
        <Tabs defaultValue="details" className="p-4 sm:p-6 pt-3 sm:pt-4">
          <TabsList className="mb-4 grid w-full grid-cols-3 max-w-full overflow-x-auto">
            <TabsTrigger value="details" className="text-xs">
              <FileText className="h-4 w-4 mr-2" />
              Details
            </TabsTrigger>
            <TabsTrigger value="skills" className="text-xs">
              <BookOpen className="h-4 w-4 mr-2" /> 
              Skills
            </TabsTrigger>
            <TabsTrigger value="credential" className="text-xs">
              <User className="h-4 w-4 mr-2" />
              Credential
            </TabsTrigger>
          </TabsList>
          
          {/* Details tab */}
          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                <Calendar size={18} className="text-brand-blue" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Issue Date</p>
                  <p className="text-sm font-medium">{issueDate}</p>
                </div>
              </div>
              
              {expiryDate && (
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                  <Clock size={18} className="text-brand-blue" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Expiry Date</p>
                    <p className="text-sm font-medium">{expiryDate}</p>
                  </div>
                </div>
              )}
            </div>
            
            {description && (
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                <h4 className="text-sm font-semibold mb-2 flex items-center">
                  <FileText size={14} className="mr-2 text-brand-blue" />
                  Certificate Description
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
              </div>
            )}
          </TabsContent>
          
          {/* Skills tab */}
          <TabsContent value="skills" className="space-y-4">
            {skills && skills.length > 0 ? (
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                <h4 className="text-sm font-semibold mb-3">Skills & Competencies</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 border border-gray-100 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900">
                      <CheckCircle2 size={14} className="text-green-500" />
                      <span className="text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center p-4 text-gray-500 dark:text-gray-400">
                <p>No specific skills listed for this certificate</p>
              </div>
            )}
          </TabsContent>
          
          {/* Credential tab */}
          <TabsContent value="credential" className="space-y-4">
            {credentialId ? (
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Credential Verification</h4>
                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3 bg-white dark:bg-gray-900">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Credential ID</p>
                  <p className="text-sm font-mono bg-gray-50 dark:bg-gray-800 p-2 rounded-md">{credentialId}</p>
                </div>
                <p className="text-xs text-gray-500 mt-2">This credential can be verified on the issuer's website</p>
              </div>
            ) : (
              <div className="text-center p-4 text-gray-500 dark:text-gray-400">
                <p>No credential ID available for this certificate</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="p-4 px-6 border-t border-gray-100 dark:border-gray-800 flex justify-center">
          <a 
            href={image || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-md text-sm font-medium relative overflow-hidden shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #4F46E5, #2563EB)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #3730a3, #1d4ed8)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #4F46E5, #2563EB)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <ExternalLink size={14} />
            See Certificate
            <div className="absolute inset-0 bg-white opacity-10 blur-lg">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent skew-x-15 animate-shimmer"></div>
            </div>
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Export certificate data for use in AllCertificates page
export const certificateItems = [
  {
    title: "Electronic Art - Software Engineering Job Simulation",
    issuer: "Electronic Arts (EA)",
    issueDate: "Feb 2025",
    expiryDate: "Nov 2026",
    credentialId: "a2SY4C8MaN48uZr9P",
    description: "I just completed Electronic Arts's Software Engineering on Forage. In the simulation I: Proposed a new feature for the EA Sports College Football and wrote a Feature Proposal describing it to other stakeholders. Built a class diagram and created a header file in C++ with class definitions for each object. Patched a bugfix and optimized the EA Sports College Football codebase by implementing an improved data structure.",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQGQxdnYoe0DZQ/company-logo_100_100/B4EZVJmsPmGgAU-/0/1740696634652/electronic_arts_logo?e=1752710400&v=beta&t=1ZRL03dLKoY8V4xt3ca3MQHuWLv8ZMkhrWrvHjR_1DY",
    image: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/j43dGscQHtJJ57N54/a77WE3de8qrxWferQ_j43dGscQHtJJ57N54_YhbYQvopSSvkcEEJa_1740768080082_completion_certificate.pdf",
  },
  {
    title: "RDBMS PostgreSQL Training",
    issuer: "Indian Institute of Technology, Bombay",
    issueDate: "Jan 2025",
    credentialId: "3960741BUL",
    description: "RDBMS PostgreSQL Training is a certification program offered by the Spoken Tutorial Project, IIT Bombay. It focuses on building foundational skills in PostgreSQL, a powerful open-source relational database management system. This training covers database design, SQL querying, and efficient data management techniques, equipping learners with practical knowledge for real-world applications.",
    skills: ["PostgreSQL", "RDBMS"],
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQGmDoDCx_FYpA/company-logo_200_200/company-logo_200_200/0/1660636307357/indian_institute_of_technology_bombay_logo?e=1752710400&v=beta&t=nlT4vUiDsKzq3C7xdujR-EUin_HJkI1MJuwpnGrydgw",
    image: "https://media.licdn.com/dms/image/v2/D4D2DAQGRTYKAcLUgMA/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1736224131225?e=1747854000&v=beta&t=fTXpRuoPKeS-ORGom581XSjL3sygwNDGQ_NNK8I9WZg",
  },
  {
    title: "AWS APAC - Solutions Architecture Job Simulation",
    issuer: "Forage",
    issueDate: "Nov 2024",
    credentialId: "Hu7hYAGC6sbkZm2ms",
    description: "AWS - Designed and simple and scalable hosting architecture based on Elastic Beanstalk for a client experiencing significant growth and slow response times. - Described my proposed architecture in plain language ensuring my client understood how it works and how costs will be calculated for it.",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQEhb_j1_sDRJQ/company-logo_100_100/company-logo_100_100/0/1720817595519/theforage_logo?e=1752710400&v=beta&t=_hbAeGbOZEQLyqvxKXSzXUkx3hSZvrA6NPO7Nmva24Q",
    image: "https://media.licdn.com/dms/image/v2/D4D2DAQEn9evuYoNS0Q/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1732697758705?e=1747854000&v=beta&t=wZ_2Z71witnR-nriGOoxpCMEt5XDkVIKjGlhySgKhK4",
  },
  {
    title: "Accenture UK - Developer and Technology Job Simulation",
    issuer: "Forage",
    issueDate: "Nov 2024",
    credentialId: "PZ3vC7zyWJk4oES64",
    description: "Accenture UK - Developer and Technology Job Simulation",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQEhb_j1_sDRJQ/company-logo_100_100/company-logo_100_100/0/1720817595519/theforage_logo?e=1752710400&v=beta&t=_hbAeGbOZEQLyqvxKXSzXUkx3hSZvrA6NPO7Nmva24Q",
    image: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/ovyvuqqNRQKBjNxbj/3xnZEj9kfpoQKW885_ovyvuqqNRQKBjNxbj_YhbYQvopSSvkcEEJa_1732524794354_completion_certificate.pdf",
  },
  {
    title: "Overview of Geographical Information System",
    issuer: "Indian Institute of Remote Sensing (IIRS), Indian Space Research Organization (ISRO)",
    issueDate: "Nov 2024",
    credentialId: "2024234293485",
    description: "This certificate acknowledges the successful completion of the \"Overview of Geographical Information System\" online course conducted by the Indian Institute of Remote Sensing (IIRS), ISRO. This program covered essential GIS topics such as spatial data models, map projections, spatial analysis, network analysis, and open-source tools, providing practical knowledge of geospatial technologies and their applications.",
    skills: ["Open-Source Software", "Spatial Analysis", "Geoinformatics", "Big Data Analytics"],
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQFAvy0KqPRfig/company-logo_100_100/company-logo_100_100/0/1631312209996?e=1752710400&v=beta&t=xKWGrGm2O11K059pHpq3rgJ0U-IAhNOAyb6Uc6n8IoI",
    image: "https://media.licdn.com/dms/image/v2/D4D2DAQED39whD3NbcQ/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1732172875758?e=1747854000&v=beta&t=qK_arPhMJ5OQ8WqjNaLU3w1TblufI6qtmHOiHhyAY-w",
  },
  {
    title: "Remote Sensing and Digital Image Analysis",
    issuer: "Indian Institute of Remote Sensing (IIRS), Indian Space Research Organization (ISRO)",
    issueDate: "Sep 2024",
    credentialId: "2024234293485",
    description: "This certification from Indian Institute of Remote Sensing (IIRS), ISRO, highlights my expertise in Remote Sensing and Digital Image Analysis. The course covered satellite data interpretation, image classification, and geospatial applications. It has enhanced my ability to apply advanced remote sensing techniques in areas like environmental monitoring, urban planning, and resource management.",
    skills: ["Space Science", "Digital Image Processing", "Remote Sensing", "Geospatial Data"],
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQFAvy0KqPRfig/company-logo_100_100/company-logo_100_100/0/1631312209996?e=1752710400&v=beta&t=xKWGrGm2O11K059pHpq3rgJ0U-IAhNOAyb6Uc6n8IoI",
    image: "https://media.licdn.com/dms/image/v2/D4D2DAQEd171DnUnQ0Q/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1728151781982?e=1747854000&v=beta&t=k5IjI-DK1EZHfufuC3BNQ9dX0pcmGWm0xgrb_P1N-zc",
  },
  {
    title: "AWS Certified SysOps Administrator - Associate (SOA-C02)",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "Jul 2024",
    expiryDate: "Jan 2034",
    description: "Successfully completed the AWS Certified SysOps Administrator - Associate (SOA-C02) Exam Prep Standard Course. This certification validates my expertise in deploying, managing, and operating scalable, highly available, and fault-tolerant systems on AWS. It covers essential areas such as system operations, security, monitoring, automation, and disaster recovery on the AWS platform.",
    skills: ["AWS Management and Operations", "Networking and Content Delivery", "Troubleshooting and Technical Support"],
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQE0fp2sCqnVLg/company-logo_100_100/company-logo_100_100/0/1738855736997/amazon_web_services_logo?e=1752710400&v=beta&t=taVDVD9Dy2N3N2omh5hYbZd4T1VAxJs2WnlH4-X59fU",
    image: "https://media.licdn.com/dms/image/v2/D562DAQGjucCVEGVNdQ/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1720501858487?e=1747854000&v=beta&t=VdKG8Qw6czU1k6-nA1dw4dLUZXN58tBe9tiPry_SLXY",
  },
  {
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "Jul 2024",
    expiryDate: "Jul 2034",
    description: "This certification has provided me with a comprehensive understanding of AWS Cloud concepts, including core services, security, architecture, pricing, and support. With this knowledge, I am well-equipped to leverage AWS Cloud solutions effectively and contribute to cloud-based projects and strategies.",
    skills: ["Basic Cloud Computing Concepts", "AWS Pricing and Support Models", "AWS Security and Compliance", "Cloud Architecture Best Practices", "Core AWS Services"],
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQE0fp2sCqnVLg/company-logo_100_100/company-logo_100_100/0/1738855736997/amazon_web_services_logo?e=1752710400&v=beta&t=taVDVD9Dy2N3N2omh5hYbZd4T1VAxJs2WnlH4-X59fU",
    image: "https://media.licdn.com/dms/image/v2/D4D2DAQH2gHqD12soZw/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1719899270309?e=1747854000&v=beta&t=EYAOeBMqLlcMpjzIh2AVZw7pFpbs_UTJ9-2VHwNyFa8",
  }
];

// Additional certifications data
const additionalCertificates = [
  {
    title: "Electronic Art - Software Engineering Job Simulation",
    issuer: "Electronic Arts (EA)",
    issueDate: "Feb 2025",
    expiryDate: "Nov 2026",
    credentialId: "a2SY4C8MaN48uZr9P",
    description: "I just completed Electronic Arts's Software Engineering on Forage. In the simulation I: Proposed a new feature for the EA Sports College Football and wrote a Feature Proposal describing it to other stakeholders. Built a class diagram and created a header file in C++ with class definitions for each object. Patched a bugfix and optimized the EA Sports College Football codebase by implementing an improved data structure.",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQGQxdnYoe0DZQ/company-logo_100_100/B4EZVJmsPmGgAU-/0/1740696634652/electronic_arts_logo?e=1752710400&v=beta&t=1ZRL03dLKoY8V4xt3ca3MQHuWLv8ZMkhrWrvHjR_1DY",
    image: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/j43dGscQHtJJ57N54/a77WE3de8qrxWferQ_j43dGscQHtJJ57N54_YhbYQvopSSvkcEEJa_1740768080082_completion_certificate.pdf",
  },
  {
    title: "RDBMS PostgreSQL Training",
    issuer: "Indian Institute of Technology, Bombay",
    issueDate: "Jan 2025",
    credentialId: "3960741BUL",
    description: "RDBMS PostgreSQL Training is a certification program offered by the Spoken Tutorial Project, IIT Bombay. It focuses on building foundational skills in PostgreSQL, a powerful open-source relational database management system. This training covers database design, SQL querying, and efficient data management techniques, equipping learners with practical knowledge for real-world applications.",
    skills: ["PostgreSQL", "RDBMS"],
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQGmDoDCx_FYpA/company-logo_200_200/company-logo_200_200/0/1660636307357/indian_institute_of_technology_bombay_logo?e=1752710400&v=beta&t=nlT4vUiDsKzq3C7xdujR-EUin_HJkI1MJuwpnGrydgw",
    image: "https://media.licdn.com/dms/image/v2/D4D2DAQGRTYKAcLUgMA/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1736224131225?e=1747854000&v=beta&t=fTXpRuoPKeS-ORGom581XSjL3sygwNDGQ_NNK8I9WZg",
  },
  {
    title: "AWS APAC - Solutions Architecture Job Simulation",
    issuer: "Forage",
    issueDate: "Nov 2024",
    credentialId: "Hu7hYAGC6sbkZm2ms",
    description: "AWS - Designed and simple and scalable hosting architecture based on Elastic Beanstalk for a client experiencing significant growth and slow response times. - Described my proposed architecture in plain language ensuring my client understood how it works and how costs will be calculated for it.",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQEhb_j1_sDRJQ/company-logo_100_100/company-logo_100_100/0/1720817595519/theforage_logo?e=1752710400&v=beta&t=_hbAeGbOZEQLyqvxKXSzXUkx3hSZvrA6NPO7Nmva24Q",
    image: "https://media.licdn.com/dms/image/v2/D4D2DAQEn9evuYoNS0Q/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1732697758705?e=1747854000&v=beta&t=wZ_2Z71witnR-nriGOoxpCMEt5XDkVIKjGlhySgKhK4",
  },
  {
    title: "Accenture UK - Developer and Technology Job Simulation",
    issuer: "Forage",
    issueDate: "Nov 2024",
    credentialId: "PZ3vC7zyWJk4oES64",
    description: "Accenture UK - Developer and Technology Job Simulation",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQEhb_j1_sDRJQ/company-logo_100_100/company-logo_100_100/0/1720817595519/theforage_logo?e=1752710400&v=beta&t=_hbAeGbOZEQLyqvxKXSzXUkx3hSZvrA6NPO7Nmva24Q",
    image: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/ovyvuqqNRQKBjNxbj/3xnZEj9kfpoQKW885_ovyvuqqNRQKBjNxbj_YhbYQvopSSvkcEEJa_1732524794354_completion_certificate.pdf",
  },
  {
    title: "Overview of Geographical Information System",
    issuer: "Indian Institute of Remote Sensing (IIRS), Indian Space Research Organization (ISRO)",
    issueDate: "Nov 2024",
    credentialId: "2024234293485",
    description: "This certificate acknowledges the successful completion of the \"Overview of Geographical Information System\" online course conducted by the Indian Institute of Remote Sensing (IIRS), ISRO. This program covered essential GIS topics such as spatial data models, map projections, spatial analysis, network analysis, and open-source tools, providing practical knowledge of geospatial technologies and their applications.",
    skills: ["Open-Source Software", "Spatial Analysis", "Geoinformatics", "Big Data Analytics"],
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQFAvy0KqPRfig/company-logo_100_100/company-logo_100_100/0/1631312209996?e=1752710400&v=beta&t=xKWGrGm2O11K059pHpq3rgJ0U-IAhNOAyb6Uc6n8IoI",
    image: "https://media.licdn.com/dms/image/v2/D4D2DAQED39whD3NbcQ/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1732172875758?e=1747854000&v=beta&t=qK_arPhMJ5OQ8WqjNaLU3w1TblufI6qtmHOiHhyAY-w",
  },
  {
    title: "Remote Sensing and Digital Image Analysis",
    issuer: "Indian Institute of Remote Sensing (IIRS), Indian Space Research Organization (ISRO)",
    issueDate: "Sep 2024",
    credentialId: "2024234293485",
    description: "This certification from Indian Institute of Remote Sensing (IIRS), ISRO, highlights my expertise in Remote Sensing and Digital Image Analysis. The course covered satellite data interpretation, image classification, and geospatial applications. It has enhanced my ability to apply advanced remote sensing techniques in areas like environmental monitoring, urban planning, and resource management.",
    skills: ["Space Science", "Digital Image Processing", "Remote Sensing", "Geospatial Data"],
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQFAvy0KqPRfig/company-logo_100_100/company-logo_100_100/0/1631312209996?e=1752710400&v=beta&t=xKWGrGm2O11K059pHpq3rgJ0U-IAhNOAyb6Uc6n8IoI",
    image: "https://media.licdn.com/dms/image/v2/D4D2DAQEd171DnUnQ0Q/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1728151781982?e=1747854000&v=beta&t=k5IjI-DK1EZHfufuC3BNQ9dX0pcmGWm0xgrb_P1N-zc",
  },
  {
    title: "AWS Certified SysOps Administrator - Associate (SOA-C02)",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "Jul 2024",
    expiryDate: "Jan 2034",
    description: "Successfully completed the AWS Certified SysOps Administrator - Associate (SOA-C02) Exam Prep Standard Course. This certification validates my expertise in deploying, managing, and operating scalable, highly available, and fault-tolerant systems on AWS. It covers essential areas such as system operations, security, monitoring, automation, and disaster recovery on the AWS platform.",
    skills: ["AWS Management and Operations", "Networking and Content Delivery", "Troubleshooting and Technical Support"],
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQE0fp2sCqnVLg/company-logo_100_100/company-logo_100_100/0/1738855736997/amazon_web_services_logo?e=1752710400&v=beta&t=taVDVD9Dy2N3N2omh5hYbZd4T1VAxJs2WnlH4-X59fU",
    image: "https://media.licdn.com/dms/image/v2/D562DAQGjucCVEGVNdQ/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1720501858487?e=1747854000&v=beta&t=VdKG8Qw6czU1k6-nA1dw4dLUZXN58tBe9tiPry_SLXY",
  },
  {
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "Jul 2024",
    expiryDate: "Jul 2034",
    description: "This certification has provided me with a comprehensive understanding of AWS Cloud concepts, including core services, security, architecture, pricing, and support. With this knowledge, I am well-equipped to leverage AWS Cloud solutions effectively and contribute to cloud-based projects and strategies.",
    skills: ["Basic Cloud Computing Concepts", "AWS Pricing and Support Models", "AWS Security and Compliance", "Cloud Architecture Best Practices", "Core AWS Services"],
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQE0fp2sCqnVLg/company-logo_100_100/company-logo_100_100/0/1738855736997/amazon_web_services_logo?e=1752710400&v=beta&t=taVDVD9Dy2N3N2omh5hYbZd4T1VAxJs2WnlH4-X59fU",
    image: "https://media.licdn.com/dms/image/v2/D4D2DAQH2gHqD12soZw/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1719899270309?e=1747854000&v=beta&t=EYAOeBMqLlcMpjzIh2AVZw7pFpbs_UTJ9-2VHwNyFa8",
  }
];

// Combine all certificates for use in the AllCertificates page
export const allCertificates = [...certificateItems, ...additionalCertificates];

// Main Certificates component
const Certificates = () => {
  // Get only the 3 most recent certificates for main display
  const recentCertificates = allCertificates.slice(0, 3);

  return (
    <section id="certificates" className="py-24 relative overflow-hidden">
      {/* Background decoration with enhanced gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full" 
          style={{
            background: 'radial-gradient(circle, rgba(79,70,229,0.1) 0%, rgba(59,130,246,0.05) 70%, rgba(255,255,255,0) 100%)'
          }}></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full" 
          style={{
            background: 'radial-gradient(circle, rgba(79,70,229,0.1) 0%, rgba(59,130,246,0.05) 70%, rgba(255,255,255,0) 100%)'
          }}></div>
        <div className="absolute top-1/4 left-1/3 w-40 h-40 rounded-full opacity-40" 
          style={{
            background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, rgba(139,92,246,0.05) 70%, rgba(255,255,255,0) 100%)'
          }}></div>
        <div className="absolute inset-0 backdrop-blur-sm transition-colors duration-300 bg-white/80 dark:bg-slate-900/80">
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-blue-50/95 dark:from-slate-900/90 dark:to-slate-800/95"></div>
        </div>
      </div>
      
      <div className="container-custom max-w-6xl relative z-10">
        {/* Section header with enhanced styling */}
        <div className="mb-14 text-center">
          {/* <Badge variant="outline" className="mb-3 px-3 py-1 font-medium text-brand-blue border-brand-blue/20 bg-brand-blue/5 shadow-sm">
            <Award className="mr-1 h-3 w-3" />
          </Badge> */}
          <h2 className="section-title text-center mb-3 font-bold text-3xl md:text-4xl text-gray-900 dark:text-gray-100">
            Certificates & Achievements
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Professional certifications and accomplishments that showcase my expertise and continuous learning journey in technology and development
          </p>
        </div>
        
        {/* Recent Certificates - showing only 3 */}
        <div className="relative">
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-6 flex items-center">
              <Award className="h-5 w-5 mr-2 text-brand-blue" />
              Recent Certifications
            </h3>
          </div>
          
          {/* Certificate grid with glowing border effect */}
          
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="certificate-grid grid grid-cols-1 md:grid-cols-3 gap-5">
              {recentCertificates.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <CertificateItem {...item} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-12 h-12 border-2 border-brand-blue/20 rounded-xl rotate-12 hidden md:block"></div>
          <div className="absolute -bottom-6 -left-6 w-12 h-12 border-2 border-brand-blue/20 rounded-xl -rotate-12 hidden md:block"></div>
        </div>
        

        
        {/* View all button with enhanced styling - links to the AllCertificates page */}
        <div className="mt-12 flex justify-center">
          <Link to="/all-certificates">
            <Button variant="outline" className="group relative overflow-hidden px-6 py-6 h-auto border-brand-blue/20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:border-brand-blue/50 transition-all">
              <span className="relative z-10 flex items-center gap-2">
                <FileText size={16} className="text-brand-blue" />
                <span className="font-medium">View Complete Certificate Portfolio</span>
              </span>
              <span className="absolute inset-0 bg-brand-blue/5 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

// We're now using inline styles for the glow effect so we don't need this useEffect

export default Certificates;
