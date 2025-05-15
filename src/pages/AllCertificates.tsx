import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ExternalLink, Calendar, Award, User, BookOpen, Clock, Key, ChevronRight, CheckCircle2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Importing the CertificateItem component and data from the main Certificates component
import { CertificateItem, allCertificates } from "@/components/Certificates";

const AllCertificates = () => {
  return (
    <div className="py-20 relative overflow-hidden min-h-screen">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-brand-blue/5 dark:bg-brand-blue/10"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-brand-blue/5 dark:bg-brand-blue/10"></div>
        <div className="absolute inset-0 bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-sm"></div>
      </div>
      
      <div className="container-custom max-w-6xl relative z-10">
        {/* Page header */}
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-brand-blue transition-colors">
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>
          
          <div>
            <Badge variant="outline" className="px-3 py-1 font-medium text-brand-blue border-brand-blue/20 bg-brand-blue/5 shadow-sm">
              <Award className="mr-1 h-3 w-3" />
              All Certificates
            </Badge>
          </div>
        </div>
        
        {/* Page title */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300">
            Complete Certificate Portfolio
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive collection of all my professional certifications and achievements
          </p>
        </div>
        
        {/* Certificates grid */}
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {allCertificates.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <CertificateItem {...item} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AllCertificates;
