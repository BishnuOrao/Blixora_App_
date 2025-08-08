import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { 
  Brain, 
  Shield, 
  Cloud, 
  Code, 
  Users, 
  Trophy, 
  Target, 
  Lightbulb, 
  Rocket, 
  Award,
  CheckCircle,
  ArrowRight,
  Zap
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Innovation-Driven",
      description: "We leverage cutting-edge technology to create immersive learning experiences that prepare students for real-world challenges."
    },
    {
      icon: Users,
      title: "Student-Centered",
      description: "Every simulation is designed with the learner in mind, ensuring practical skills development and career readiness."
    },
    {
      icon: Lightbulb,
      title: "Future-Ready",
      description: "Our curriculum adapts to industry trends, keeping students ahead in the rapidly evolving tech landscape."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in educational content and platform performance for optimal learning outcomes."
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Cybersecurity Puzzles",
      description: "Master ethical hacking, vulnerability assessment, and security protocols through hands-on challenges.",
      highlights: ["Network Security", "Penetration Testing", "Incident Response", "Risk Assessment"]
    },
    {
      icon: Brain,
      title: "AI Mini Projects",
      description: "Build machine learning models, neural networks, and intelligent systems with guided simulations.",
      highlights: ["Machine Learning", "Deep Learning", "NLP Processing", "Computer Vision"]
    },
    {
      icon: Cloud,
      title: "Cloud Deployment",
      description: "Deploy scalable applications on AWS, Azure, and GCP with real-world scenarios.",
      highlights: ["Infrastructure Setup", "Auto Scaling", "DevOps Pipelines", "Monitoring"]
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Create modern web applications using the latest frameworks and best practices.",
      highlights: ["React/Vue.js", "Node.js APIs", "Database Design", "Performance Optimization"]
    }
  ];

  const stats = [
    { number: "1000+", label: "Active Students", description: "Learning and growing with us" },
    { number: "50+", label: "Interactive Simulations", description: "Across multiple tech domains" },
    { number: "95%", label: "Student Success Rate", description: "Career advancement achieved" },
    { number: "24/7", label: "Platform Access", description: "Learn at your own pace" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              About <span className="text-primary">Blixora Labs</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              A futuristic digital R&D lab that provides interactive learning simulations to tech students 
              and early-career developers, empowering the next generation of innovators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/simulations">
                  Explore Simulations <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/register">Start Learning Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To bridge the gap between theoretical knowledge and practical application by providing 
              immersive, hands-on learning experiences. We believe in learning by doing, where students 
              can experiment, fail, learn, and succeed in a safe, controlled environment that mirrors 
              real-world challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-card/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground text-lg">
              The principles that guide everything we do at Blixora Labs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-border/50 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What We Offer</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive learning simulations categorized into specialized challenges designed 
              to build practical skills for the modern tech industry
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {feature.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Impact</h2>
            <p className="text-muted-foreground text-lg">
              Numbers that reflect our commitment to student success
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-border/50 bg-background/50">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-lg font-semibold text-foreground mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Blixora Labs?</h2>
              <p className="text-muted-foreground text-lg">
                Experience the future of tech education with our innovative approach
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Interactive Learning</h3>
                    <p className="text-muted-foreground text-sm">
                      Hands-on simulations that provide real-world experience in a controlled environment.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Rocket className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Industry-Relevant</h3>
                    <p className="text-muted-foreground text-sm">
                      Curriculum designed with input from industry professionals and current market demands.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Trophy className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Proven Results</h3>
                    <p className="text-muted-foreground text-sm">
                      95% of our students report improved technical skills and career advancement.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Community Support</h3>
                    <p className="text-muted-foreground text-sm">
                      Join a thriving community of learners and mentors supporting each other's growth.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Flexible Learning</h3>
                    <p className="text-muted-foreground text-sm">
                      24/7 access to our platform allows you to learn at your own pace and schedule.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Certification</h3>
                    <p className="text-muted-foreground text-sm">
                      Earn recognized certificates upon completion of simulation challenges.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
