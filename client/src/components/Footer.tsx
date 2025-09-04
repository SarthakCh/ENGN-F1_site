import { motion } from "framer-motion";
import { Atom } from "lucide-react";
import { SiLinkedin, SiX, SiGithub } from "react-icons/si";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-primary border-t border-slate-700 py-8 mt-4">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* Left content */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-secondary to-accent rounded-lg flex items-center justify-center">
                <Atom className="text-white text-xl" />
              </div>
              <span className="text-2xl font-bold">ENGN-F1</span>
            </div>
            <p className="text-slate-300 mb-6 max-w-md">
              World's first optimization engine powered by AI and Quantum
              algorithms.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="w-10 h-10 bg-slate-700 hover:bg-secondary rounded-lg flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <SiLinkedin className="text-white" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-slate-700 hover:bg-secondary rounded-lg flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <SiX className="text-white" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-slate-700 hover:bg-secondary rounded-lg flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <SiGithub className="text-white" />
              </motion.a>
            </div>
          </motion.div>

          {/* Right content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="md:col-start-3"
            // className="ml-auto"
          >
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button
                  onClick={() => scrollToSection("algorithm")}
                  className="hover:text-secondary transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("use-cases")}
                  className="hover:text-secondary transition-colors"
                >
                  Models
                </button>
              </li>
              {/* <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Pricing
                </a>
              </li> */}
              <li>
                <a
                  href="#contact"
                  className="hover:text-secondary transition-colors"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-start-4"
          >
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button
                  onClick={() => scrollToSection("team")}
                  className="hover:text-secondary transition-colors"
                >
                  Team
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Investors
                </a>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="hover:text-secondary transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p>
            &copy; 2025 ENGN-F1. All rights reserved. | World's First
            Optimization Engine
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
