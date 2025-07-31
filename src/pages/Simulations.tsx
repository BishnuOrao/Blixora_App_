import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Clock, Users, Star, Search, Filter } from "lucide-react";

const Simulations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const simulations = [
    {
      id: 1,
      title: "Cybersecurity Incident Response",
      category: "Cybersecurity",
      difficulty: "Advanced",
      duration: "4-6 hours",
      description: "Simulate a real-world cyber attack and learn incident response protocols, forensics, and recovery procedures.",
      participants: 234,
      rating: 4.8,
      tags: ["Penetration Testing", "Forensics", "Security"]
    },
    {
      id: 2,
      title: "AI Model Training Pipeline",
      category: "AI & Machine Learning",
      difficulty: "Intermediate",
      duration: "3-4 hours",
      description: "Build and deploy a complete machine learning pipeline using modern MLOps practices and cloud infrastructure.",
      participants: 189,
      rating: 4.7,
      tags: ["TensorFlow", "MLOps", "Python"]
    },
    {
      id: 3,
      title: "AWS Cloud Architecture",
      category: "Cloud Computing",
      difficulty: "Intermediate",
      duration: "5-7 hours",
      description: "Design and implement scalable cloud solutions using AWS services including EC2, RDS, and Lambda.",
      participants: 312,
      rating: 4.9,
      tags: ["AWS", "Serverless", "Architecture"]
    },
    {
      id: 4,
      title: "React Full-Stack Development",
      category: "Web Development",
      difficulty: "Beginner",
      duration: "2-3 hours",
      description: "Create a modern web application using React, Node.js, and MongoDB with authentication and real-time features.",
      participants: 445,
      rating: 4.6,
      tags: ["React", "Node.js", "MongoDB"]
    },
    {
      id: 5,
      title: "Advanced SQL Injection Prevention",
      category: "Cybersecurity",
      difficulty: "Advanced",
      duration: "3-4 hours",
      description: "Learn advanced techniques to identify and prevent SQL injection attacks in web applications.",
      participants: 156,
      rating: 4.8,
      tags: ["SQL", "Web Security", "OWASP"]
    },
    {
      id: 6,
      title: "Computer Vision with OpenCV",
      category: "AI & Machine Learning",
      difficulty: "Intermediate",
      duration: "4-5 hours",
      description: "Implement real-time object detection and image processing using OpenCV and deep learning models.",
      participants: 203,
      rating: 4.7,
      tags: ["OpenCV", "Deep Learning", "Python"]
    }
  ];

  const categories = ["all", "Cybersecurity", "AI & Machine Learning", "Cloud Computing", "Web Development"];
  const difficulties = ["all", "Beginner", "Intermediate", "Advanced"];

  const filteredSimulations = simulations.filter(sim => {
    const matchesSearch = sim.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sim.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sim.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || sim.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || sim.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Intermediate": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Advanced": return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        {/* Header */}
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                <span className="bg-gradient-cyber bg-clip-text text-transparent">
                  Learning Simulations
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Choose from our extensive library of hands-on simulations designed to accelerate your tech skills.
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-card border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search simulations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Filters:</span>
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map(difficulty => (
                      <SelectItem key={difficulty} value={difficulty}>
                        {difficulty === "all" ? "All Levels" : difficulty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Simulations Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {filteredSimulations.length} Simulation{filteredSimulations.length !== 1 ? 's' : ''} Found
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSimulations.map((simulation) => (
                <Card key={simulation.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-xs">
                        {simulation.category}
                      </Badge>
                      <Badge className={`text-xs ${getDifficultyColor(simulation.difficulty)}`}>
                        {simulation.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {simulation.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {simulation.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {simulation.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{simulation.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{simulation.participants}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{simulation.rating}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full" asChild>
                      <a href={`/simulation/${simulation.id}`}>
                        Start Simulation
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredSimulations.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No simulations found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Simulations;