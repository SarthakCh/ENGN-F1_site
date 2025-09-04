import { motion } from "framer-motion";

import ContactForm from "./ContactForm";
import ContactInformation from "./ContactInformation";
import NeuralNetworkBackground from "../CustomUI/NeuralNetworkBackground";

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      {/* Background quantum grid + overlay */}
      <div className="absolute inset-0 quantum-grid z-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background opacity-70 z-10" />

      {/* Node network canvas */}
      <NeuralNetworkBackground />

      {/* Contact content */}
      <div className="relative container mx-auto px-6 z-40">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start Your Optimization Journey with{" "}
              <span className="quantum-gradient-text">ENGN-F1</span>
            </h2>
            <p className="text-xl text-slate-300">
              Tell us about your business challenges — our experts will connect,
              consult, and design a tailored optimization path for you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <ContactForm />

            <ContactInformation />
          </div>
        </div>
      </div>
    </section>
  );
}
