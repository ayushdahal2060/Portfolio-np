"use client"

import { motion } from "framer-motion"
import {
  ArrowDown,
  Linkedin,
  Mail,
  MapPin,
  Code,
  Database,
  Globe,
  Facebook,
  Instagram,
  Download,
  GraduationCap,
  Github,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Earth3D from "@/components/earth-3d"
import { Suspense } from "react"
import AdvancedTurfDemo from "@/components/advanced-turf-demo"

export default function Portfolio() {
  const skills = [
    { name: "GIS Platforms", icon: MapPin, level: 95 },
    { name: "ENVI", icon: Globe, level: 90 },
    { name: "AutoCAD", icon: Code, level: 85 },
    { name: "PostgreSQL", icon: Database, level: 80 },
    { name: "Python", icon: Code, level: 85 },
    { name: "Java", icon: Code, level: 80 },
    { name: "C/C++", icon: Code, level: 75 },
    { name: "Web Development", icon: Globe, level: 88 },
  ]

  const projects = [
    {
      title: "Ecotourism Mapping of Jhapa Districts",
      description: "Comprehensive GIS analysis and mapping for sustainable ecotourism development in Jhapa district.",
      tech: ["GIS", "Remote Sensing", "ENVI"],
      status: "Completed",
      type: "GIS Analysis",
    },
    {
      title: "Thematic Mapping of Dhulikhel Municipality",
      description: "Detailed thematic mapping project for urban planning and development of Dhulikhel Municipality.",
      tech: ["GIS", "AutoCAD", "PostgreSQL"],
      status: "Featured",
      type: "Urban Planning",
    },
    {
      title: "LST Analysis of Kathmandu Valley",
      description:
        "Land Surface Temperature analysis using satellite imagery for climate and urban heat island studies.",
      tech: ["ENVI", "Remote Sensing", "Python"],
      status: "Research",
      type: "Climate Analysis",
    },
    {
      title: "Land Use/Land Cover Mapping",
      description: "LULC mapping of Jhapa and Taplejung districts using satellite imagery and GIS techniques.",
      tech: ["GIS", "ENVI", "Remote Sensing"],
      status: "Completed",
      type: "Environmental",
    },
  ]

  const experience = [
    {
      title: "Event Manager",
      organization: "Youth For Change (Kathmandu University)",
      location: "Dhulikhel",
      year: "2024/25",
      type: "Leadership",
    },
    {
      title: "Supervisor",
      organization: "Nawasrijana Club (Goldengate Intl College)",
      location: "Kathmandu",
      year: "2018-2020",
      type: "Management",
    },
  ]

  const education = [
    {
      level: "Bachelor's Degree",
      institution: "Kathmandu University",
      field: "Geomatics Engineering",
      year: "2021-Present",
      status: "Ongoing",
    },
    {
      level: "Higher Secondary (+2)",
      institution: "Goldengate International College",
      year: "2018-2020",
      grade: "A+",
    },
    {
      level: "Secondary Education",
      institution: "Siddhartha Boarding Secondary School",
      year: "2018",
      grade: "A+",
    },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const downloadCV = () => {
    const link = document.createElement("a")
    link.href = "/Ayush_Dahal_CV.txt"
    link.download = "Ayush_Dahal_CV.txt"
    link.click()
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* 3D Earth Background */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-black via-blue-900/20 to-black" />}>
          <Earth3D />
        </Suspense>
      </div>

      {/* Animated Grid Overlay */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "40px 40px"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20">
        {/* Navigation */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/20"
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
              >
                Ayush Dahal
              </motion.div>
              <div className="hidden md:flex space-x-8">
                {[
                  { name: "About", id: "about" },
                  { name: "Experience", id: "experience" },
                  { name: "Skills", id: "skills" },
                  { name: "Projects", id: "projects" },
                  { name: "Turf.js", id: "turf-implementation" },
                  { name: "Education", id: "education" },
                  { name: "Contact", id: "contact" },
                ].map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => scrollToSection(item.id)}
                    className="text-white/80 hover:text-cyan-400 transition-colors duration-300 hover:scale-105 cursor-pointer"
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden border-4 border-gradient-to-r from-cyan-500 to-blue-600 p-1 bg-gradient-to-r from-cyan-500 to-blue-600"
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-black">
                <Image
                  src="/profile.jpg"
                  alt="Ayush Dahal"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Ayush Dahal
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/80 mb-4 leading-relaxed"
            >
              Geomatics Engineering Student & GIS Specialist
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg text-cyan-400 mb-8"
            >
              Mapping the World Through Spatial Intelligence
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white border-0"
              >
                View My Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={downloadCV}
                className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="animate-bounce cursor-pointer"
              onClick={() => scrollToSection("about")}
            >
              <ArrowDown className="w-6 h-6 text-cyan-400/60 mx-auto" />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 bg-black/40 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                About Me
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-6">
                <p className="text-lg text-white/80 leading-relaxed">
                  Geomatics Engineering undergraduate with a strong foundation in{" "}
                  <span className="text-cyan-400 font-semibold">GIS and Remote Sensing</span>. Experienced in project
                  management, event coordination, and technical reporting.
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  Adept at leveraging geospatial technologies and software for mapping, analysis, and visualization.
                  Passionate about{" "}
                  <span className="text-blue-400 font-semibold">
                    environmental applications, urban studies, and youth engagement
                  </span>
                  .
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-4 text-white/60">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    <span>Kathmandu, Bagmati, Nepal</span>
                  </div>
                  <div className="flex items-center space-x-4 text-white/60">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <span>ayushdahal2060@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-4 text-white/60">
                    <GraduationCap className="w-5 h-5 text-cyan-400" />
                    <span>Kathmandu University</span>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="w-80 h-80 mx-auto rounded-2xl bg-white/5 backdrop-blur-sm border border-cyan-500/20 overflow-hidden">
                  <Image
                    src="/profile.jpg"
                    alt="Ayush Dahal"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Experience
              </h2>
            </motion.div>

            <div className="space-y-8">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/5 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">{exp.title}</h3>
                          <p className="text-cyan-400 font-medium">{exp.organization}</p>
                          <p className="text-white/60 text-sm">{exp.location}</p>
                        </div>
                        <div className="flex items-center space-x-4 mt-4 md:mt-0">
                          <span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                            {exp.type}
                          </span>
                          <span className="text-white/60">{exp.year}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-6 bg-black/40 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Technical Skills
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="group"
                >
                  <Card className="bg-white/5 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mr-4">
                          <skill.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="h-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                        />
                      </div>
                      <p className="text-white/60 text-sm mt-2">{skill.level}% Proficiency</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Featured Projects
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Card className="bg-white/5 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex flex-col gap-2">
                          <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-full">
                            {project.status}
                          </span>
                          <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                            {project.type}
                          </span>
                        </div>
                      </div>
                      <p className="text-white/70 mb-4 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech) => (
                          <span key={tech} className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 w-full bg-transparent"
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Turf.js Implementation Section */}
        <section id="turf-implementation" className="py-20 px-6 bg-black/40 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Turf.js Spatial Analysis
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Interactive demonstrations of geospatial analysis using Turf.js library
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <AdvancedTurfDemo />
            </motion.div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 px-6 bg-black/40 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Education
              </h2>
            </motion.div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/5 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">{edu.level}</h3>
                          <p className="text-cyan-400 font-medium">{edu.institution}</p>
                          {edu.field && <p className="text-white/60 text-sm">{edu.field}</p>}
                        </div>
                        <div className="flex items-center space-x-4 mt-4 md:mt-0">
                          {edu.grade && (
                            <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                              {edu.grade}
                            </span>
                          )}
                          {edu.status && (
                            <span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                              {edu.status}
                            </span>
                          )}
                          <span className="text-white/60">{edu.year}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Let's Connect
              </h2>
              <p className="text-xl text-white/80 mb-12">
                Ready to collaborate on geospatial projects or discuss opportunities?
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-8"
            >
              <Button
                size="lg"
                onClick={() => window.open("mailto:ayushdahal2060@gmail.com", "_blank")}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white border-0"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Me
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open("https://github.com/ayushdahal2060", "_blank")}
                className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 bg-transparent"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open("https://www.linkedin.com/in/ayush-dahal-630225315", "_blank")}
                className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 bg-transparent"
              >
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={downloadCV}
                className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 bg-transparent"
              >
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </Button>
            </motion.div>

            {/* Social Media Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex justify-center gap-6"
            >
              <motion.a
                href="https://github.com/ayushdahal2060"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-gray-600/20 transition-colors"
              >
                <Github className="w-6 h-6 text-white" />
              </motion.a>
              <motion.a
                href="https://www.facebook.com/ayush.dahal.982489"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600/20 transition-colors"
              >
                <Facebook className="w-6 h-6 text-white" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/ayush.dahal_/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-600/20 transition-colors"
              >
                <Instagram className="w-6 h-6 text-white" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/ayush-dahal-630225315"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-700/20 transition-colors"
              >
                <Linkedin className="w-6 h-6 text-white" />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-cyan-500/20">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-white/60">© 2024 Ayush Dahal. Mapping the future through geospatial innovation.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
