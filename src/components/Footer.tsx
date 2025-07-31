import { Brain, Clock, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg bg-gradient-cyber bg-clip-text text-transparent">
                Blixora Labs
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Simulate. Solve. Succeed.
            </p>
            <p className="text-muted-foreground text-sm">
              Empowering the next generation of tech innovators through immersive learning simulations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/simulations" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Simulations
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Categories</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground text-sm">Cybersecurity</li>
              <li className="text-muted-foreground text-sm">AI & Machine Learning</li>
              <li className="text-muted-foreground text-sm">Cloud Computing</li>
              <li className="text-muted-foreground text-sm">Web Development</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground text-sm">support@blixoralabs.dev</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground text-sm">11:00 AM – 8:00 PM (Mon–Fri)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Blixora Labs. All rights reserved. | Built for learning and innovation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;