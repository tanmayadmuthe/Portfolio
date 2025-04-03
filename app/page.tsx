"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useInView } from 'react-intersection-observer';
import { format } from 'date-fns';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  ArrowRight,
  Calendar,
  Clock,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  Palette,
  Database,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Send,
  Loader2,
  ExternalLink
} from 'lucide-react';

// Skills data for About section
const skills = [
  { name: "Web Development", progress: 70 },
  { name: "Machine Learning", progress: 80 },
  { name: "DevOps", progress: 30 },
  { name: "Mobile Development", progress: 65 }
];

// Timeline data for About section
const timeline = [
  {
    year: "May 2024 - July 2024",
    title: "Research Intern",
    company: "Vellore Institute of Technology",
    description: "Developed a machine learning model for detection of diseases in Tea Leaves",
    icon: Code2
  },
  {
    year: "October 2023 - August 2024",
    title: "PRISM Research Intern",
    company: "Samsung R and D Institute",
    description: "Worked on Secure virtual OS and high memory capabilities in Android Open Source Project(AOSP)",
    icon: Code2
  },
  {
    year: "2021 - 2025",
    title: "Bachelors of Technology in Electronics and Computer Engineering",
    company: "Vellore Institute of Technology, Chennai",
    description: "Current CGPA: 8.57",
    icon: GraduationCap
  },
  {
    year: "2019 - 2021",
    title: "Junior College",
    company: "Sanjay Ghodawat Juinor College, Atigre",
    description: "Completed 12th with a percentage of 93.67",
    icon: GraduationCap
  },
  {
    year: "2014-2019",
    title: "High School",
    company: "Jawahar Navodaya Vidyalaya, Palus",
    description: "Finished 10th with a percentage of 93.6",
    icon: GraduationCap
  }
];

// Projects data
const projects = [
  {
    title: "Avian Response on Climate Change",
    description: "Analyzed four decades of bird sightings and climate data to predict species distribution in the Scottish Highlands, Utilized machine learning to assess the impact of climate change on bird species distribution.",
    image: "https://images.unsplash.com/photo-1486365227551-f3f90034a57c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["R", "Machine Learning"],
    github: "https://github.com/tanmayadmuthe/Avian-Responses-to-Climate-Change",
    demo: "https://medium.com/@tanmayadmuthe32/birds-on-the-brink-how-climate-change-is-affecting-our-feathered-friends-2c7005fd14ef",
    category: "AI/ML"
  },
  {
    title: "Video Calling App using NextJs",
    description: "A full fledged video call app that can be integrated in existing projects with ease. Can start an instant meeting, schedule a meeting, record a meeting, send invitations to people.",
    image: "https://images.unsplash.com/photo-1586985564150-11ee04838034?q=80&w=2029&auto=format&fit=crop",
    tags: ["NextJs", "TailWind CSS", "TypeScript","Clerk"],
    github: "https://github.com/tanmayadmuthe/yoom-videocall",
    demo: "https://yoom-videocall-iota.vercel.app/",
    category: "Frontend"
  },
  {
    title: "Gestational Diabetes Prediction",
    description: "Predicted gestational diabetes using machine learning models with maternal health data. Achieved an accuracy of 97% in the final model",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
    tags: ["Python", "Machine Learning", "TensorFlow", "scikit-learn"],
    github: "https://github.com/tanmayadmuthe/Gestational-Diabetes-Prediction",
    demo: "https://demo.com",
    category: "AI/ML"
  },
  {
    title: "Virtubell",
    description: "A QR-based virtual doorbell enabling secure, real-time video calls between visitors and homeowners, with SMS notifications and strong authentication.",
    image: "https://images.unsplash.com/photo-1600147131759-880e94a6185f?q=80&w=1936&auto=format&fit=crop",
    tags: ["JavaScript", "Pug", "CSS", "SQL", "NodeJs"],
    github: "https://github.com/tanmayadmuthe/virtubell",
    demo: "#",
    category: "Full Stack"
  },
  {
    title: "Valorant Themed Site",
    description: "Valorant themed fan-site showcasing game features, characters, and maps. Built with Next.js and Tailwind CSS for a responsive design.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6BLERDc-f5azLo0xiZAH_YSjukcORI3vPGRerlqj8Px0m3l-fgXu6iApO2wCkdvsjevA",
    tags: ["JavaScript", "TailWind CSS", "NextJs"],
    github: "https://github.com/tanmayadmuthe/valorant-themed-site",
    demo: "https://valorant-themed-site.vercel.app/",
    category: "Frontend"
  }
];

// Blog posts data
const dummyPosts = [
  {
    title: "OpenAI Releases GPT-01 “Strawberry”: The First Model With Advanced Reasoning",
    description: "OpenAI's New GPT-01 Model: A Game Changer in AI Reasoning",
    publishDate: "Sep 16, 2024",
    readTime: "6 min read",
    image: "https://miro.medium.com/v2/resize:fit:600/format:webp/1*0f-CzFzQ_sMNn15aXLjpVQ.jpeg",
    link: "https://medium.com/@tanmayadmuthe32/openai-releases-gpt-01-strawberry-the-first-model-with-advanced-reasoning-2d3376ea99d1"
  },
  {
    title: "How I mastered GitHub: A Developer’s Essential Guide to Collaboration and Version Control",
    description: "Tips and Tricks for getting the most out of GitHub",
    publishDate: "Sep 16, 2024",
    readTime: "6 min read",
    image: "https://miro.medium.com/v2/resize:fit:640/format:webp/1*QisVGribmiLTxOQfihSq8w.png",
    link: "https://medium.com/@tanmayadmuthe32/how-i-mastered-github-a-developers-essential-guide-to-collaboration-and-version-control-8f5a9ded2329"
  },
  {
    title: "I found 12 best VScode Extensions for 2024",
    description: "Top VSCode Extensions to Boost Your Productivity in 2025",
    publishDate: "Sep 14, 2024",
    readTime: "6 min read",
    image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*hPWatI99PSz984kAr-qkJg.png",
    link: "https://medium.com/@tanmayadmuthe32/unlock-your-coding-potential-top-vscode-extensions-to-turbocharge-your-workflow-11bca01ecc8f"
  },
  {
    title: "How AI Coding Tools Like GitHub Copilot Are Making Developers' Lives Easier",
    description: "GitHub Copilot: Revolutionizing Coding with AI Assistance",
    publishDate: "Sep 14, 2024",
    readTime: "6 min read",
    image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*nxUt0dTiLMN9bRBq0onCkg.jpeg",
    link: "https://medium.com/@tanmayadmuthe32/the-rise-of-ai-powered-coding-assistants-how-tools-like-github-copilot-are-shaping-the-future-of-fcdde2f547e3"
  }
];

// Social links for Contact section
const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/tanmayadmuthe",
    color: "hover:text-[#333]"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/tanmay-admuthe/",
    color: "hover:text-[#0077B5]"
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com",
    color: "hover:text-[#1DA1F2]"
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:tanmayadmuthe@gmail.com",
    color: "hover:text-primary"
  }
];

// Contact form schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Project categories
const categories = ["All", "Full Stack", "Frontend", "AI/ML"];

export default function Home() {
  // States for different sections
  const [posts, setPosts] = useState(dummyPosts);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form setup for contact section
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    },
  });

  // Filter projects based on selected category
  const filteredProjects = projects.filter(project => 
    selectedCategory === "All" || project.category === selectedCategory
  );

  // Intersection observer for animations
  const [projectsRef, projectsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Simulate loading blog posts
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Contact form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Message sent successfully!");
    form.reset();
    setIsSubmitting(false);
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background z-0" />
        
        {/* Animated background circles */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full border border-primary/30"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full border border-primary/20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Tanmay Admuthe
            <span className="text-primary">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Crafting digital experiences that blend creativity with technical excellence.
            Bringing ideas to life through clean code and stunning design.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center gap-4"
          >
            <Button 
              size="lg" 
              className="group"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* About Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Me
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              I'm a passionate developer with expertise in creating beautiful and functional web applications.
              With a strong foundation in both design and development, I bring creative ideas to life.
            </p>
          </motion.div>

          {/* Skills Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-semibold mb-8">Skills & Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{skill.name}</h3>
                      <span className="text-sm text-muted-foreground">{skill.progress}%</span>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Timeline Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-8">Journey</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />
              
              {timeline.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative flex items-center mb-8 ${
                      index % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <div className="flex-1 md:w-1/2" />
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center relative z-10">
                      <Icon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <Card className={`flex-1 md:w-1/2 p-4 ${
                      index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                    }`}>
                      <div className="text-sm text-muted-foreground mb-1">{item.year}</div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <div className="text-sm text-primary mb-2">{item.company}</div>
                      <p className="text-muted-foreground">{item.description}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            Featured Projects
          </h1>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="transition-all"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div
            ref={projectsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                      <Button size="sm" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

            {/* Blog Section */}
            <section id="blog" className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            Latest Blog Posts
          </h1>

          <div className="space-y-6">
            {loading ? (
              // Loading skeletons
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="p-4">
                  <div className="flex gap-4">
                    <Skeleton className="w-48 h-32" />
                    <div className="flex-1 space-y-4">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <div className="flex gap-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              posts.map((post, index) => (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <a href={post.link} target="_blank" rel="noopener noreferrer" className="flex flex-col md:flex-row">
                      <div className="w-full md:w-48 aspect-video md:aspect-auto relative">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          {post.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {format(new Date(post.publishDate), 'MMM d, yyyy')}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.readTime}
                          </div>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </a>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground">
              Have a question or want to work together? I'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Project Inquiry" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me about your project..."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-semibold mb-4">Connect With Me</h2>
                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-full border transition-colors ${social.color}`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="sr-only">{social.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Location</h2>
                <p className="text-muted-foreground">
                  Sangli, Maharashtra, India
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
