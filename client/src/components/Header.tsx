import { useState } from "react";
import { motion } from "framer-motion";
import { Atom, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.header 
      className="fixed top-0 w-full z-50 bg-primary/80 backdrop-blur-md border-b border-slate-700"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-secondary to-accent rounded-lg flex items-center justify-center">
              <Atom className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold">ENGN-F1</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection("features")}
              className="hover:text-secondary transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection("models")}
              className="hover:text-secondary transition-colors"
            >
              Models
            </button>
            <button 
              onClick={() => scrollToSection("team")}
              className="hover:text-secondary transition-colors"
            >
              Team
            </button>
            <Button 
              onClick={() => scrollToSection("contact")}
              className="bg-accent hover:bg-accent/80 px-6 py-2"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="text-xl" /> : <Menu className="text-xl" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden mt-4 pb-4 border-t border-slate-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col space-y-4 pt-4">
              <button 
                onClick={() => scrollToSection("features")}
                className="text-left hover:text-secondary transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection("models")}
                className="text-left hover:text-secondary transition-colors"
              >
                Models
              </button>
              <button 
                onClick={() => scrollToSection("team")}
                className="text-left hover:text-secondary transition-colors"
              >
                Team
              </button>
              <Button 
                onClick={() => scrollToSection("contact")}
                className="bg-accent hover:bg-accent/80 w-full"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
