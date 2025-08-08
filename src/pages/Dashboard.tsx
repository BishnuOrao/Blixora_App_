import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  BookOpen, 
  Trophy, 
  Clock, 
  TrendingUp, 
  LogOut,
  Play,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    console.log('🏠 Dashboard: Checking authentication...');
    console.log('🏠 Dashboard: isAuthenticated:', isAuthenticated);
    console.log('🏠 Dashboard: user:', user);
    
    if (!isAuthenticated) {
      console.log('🚫 Dashboard: User not authenticated, redirecting to login');
      navigate("/login");
      return;
    }

    console.log('✅ Dashboard: User authenticated, displaying dashboard');
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    console.log('🚪 Dashboard: Logging out...');
    
    try {
      await logout();
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      
      navigate("/");
    } catch (error) {
      console.error('❌ Dashboard: Logout error:', error);
    }
  };

  // Show loading or redirect if not authenticated
  if (!isAuthenticated || !user) {
    return <div>Loading...</div>;
  }

  const enrolledSimulations = [
    {
      id: 1,
      title: "Cybersecurity Incident Response",
      category: "Cybersecurity",
      progress: 75,
      status: "In Progress",
      lastAccessed: "2 hours ago",
      estimatedCompletion: "1 hour remaining"
    },
    {
      id: 2,
      title: "AI Model Training Pipeline",
      category: "AI & Machine Learning",
      progress: 100,
      status: "Completed",
      lastAccessed: "1 day ago",
      completedDate: "Yesterday"
    },
    {
      id: 3,
      title: "AWS Cloud Architecture",
      category: "Cloud Computing",
      progress: 45,
      status: "In Progress",
      lastAccessed: "3 days ago",
      estimatedCompletion: "3 hours remaining"
    },
    {
      id: 4,
      title: "React Full-Stack Development",
      category: "Web Development",
      progress: 100,
      status: "Completed",
      lastAccessed: "1 week ago",
      completedDate: "Last week"
    },
    {
      id: 5,
      title: "Advanced SQL Injection Prevention",
      category: "Cybersecurity",
      progress: 20,
      status: "In Progress",
      lastAccessed: "5 days ago",
      estimatedCompletion: "4 hours remaining"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "In Progress":
        return <Play className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "In Progress":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      default:
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        {/* Header */}
        <section className="py-12 bg-gradient-hero border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                  Welcome back, <span className="bg-gradient-cyber bg-clip-text text-transparent">{user.name}</span>!
                </h1>
                <p className="text-muted-foreground">
                  Continue your learning journey and master new technologies.
                </p>
              </div>
              <Button variant="outline" onClick={handleLogout} className="self-start lg:self-center">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{user.totalSimulations}</p>
                      <p className="text-sm text-muted-foreground">Total Enrolled</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{user.completedSimulations}</p>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Play className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{user.inProgressSimulations}</p>
                      <p className="text-sm text-muted-foreground">In Progress</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                      <Trophy className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{user.points}</p>
                      <p className="text-sm text-muted-foreground">Points Earned</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Enrolled Simulations */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">My Simulations</h2>
                  <Button asChild>
                    <a href="/simulations">Browse More</a>
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {enrolledSimulations.map((simulation) => (
                    <Card key={simulation.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg">{simulation.title}</h3>
                              {getStatusIcon(simulation.status)}
                            </div>
                            <Badge variant="outline" className="text-xs mb-2">
                              {simulation.category}
                            </Badge>
                          </div>
                          <Badge className={`text-xs ${getStatusColor(simulation.status)}`}>
                            {simulation.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{simulation.progress}%</span>
                            </div>
                            <Progress value={simulation.progress} className="h-2" />
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Last accessed: {simulation.lastAccessed}</span>
                            {simulation.status === "Completed" ? (
                              <span>Completed: {simulation.completedDate}</span>
                            ) : (
                              <span>{simulation.estimatedCompletion}</span>
                            )}
                          </div>
                          
                          <Button 
                            className="w-full" 
                            variant={simulation.status === "Completed" ? "outline" : "default"}
                          >
                            {simulation.status === "Completed" ? "Review" : "Continue"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Profile & Progress */}
              <div className="space-y-6">
                {/* Profile Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Role</p>
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        {user.role || 'Student'}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Member since</p>
                      <p className="font-medium">{new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full" asChild>
                      <a href="/simulations">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Browse Simulations
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      View Progress Report
                    </Button>
                    <Button variant="outline" className="w-full">
                      <User className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Completed AI Model Training</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Made progress in Cybersecurity</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>Started new AWS simulation</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;