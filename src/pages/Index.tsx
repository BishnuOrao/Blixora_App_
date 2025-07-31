import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Brain, Shield, Cloud, Code, Users, Trophy, ChevronRight, Zap } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Cybersecurity Puzzles",
      description: "Master ethical hacking, vulnerability assessment, and security protocols through hands-on challenges."
    },
    {
      icon: Brain,
      title: "AI Mini Projects",
      description: "Build machine learning models, neural networks, and intelligent systems with guided simulations."
    },
    {
      icon: Cloud,
      title: "Cloud Deployment",
      description: "Deploy scalable applications on AWS, Azure, and GCP with real-world scenarios."
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Create modern web applications using the latest frameworks and best practices."
    }
  ];

  const stats = [
    { number: "1000+", label: "Active Students" },
    { number: "50+", label: "Simulations" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Lab Access" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-background/80" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold">
                <span className="bg-gradient-cyber bg-clip-text text-transparent">
                  Simulate. Solve.
                </span>
                <br />
                <span className="text-foreground">Succeed.</span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Master cutting-edge technology through immersive, hands-on simulations designed for the next generation of innovators.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="group" asChild>
                <Link to="/simulations">
                  Explore Simulations
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/register">Start Free Trial</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-3 h-3 bg-primary rounded-full animate-glow" />
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-2 h-2 bg-secondary rounded-full animate-glow" />
        </div>
        <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-4 h-4 bg-accent rounded-full animate-glow" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Cutting-Edge Learning Experiences
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Dive into hands-on simulations that mirror real-world challenges in the tech industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow duration-300 border-border bg-card/50 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-cyber relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground">
              Ready to Transform Your Tech Career?
            </h2>
            <p className="text-xl text-primary-foreground/80">
              Join thousands of students who have accelerated their learning through our innovative simulation platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/register">
                  <Users className="mr-2 h-4 w-4" />
                  Join the Community
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/simulations">
                  <Trophy className="mr-2 h-4 w-4" />
                  View Challenges
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
