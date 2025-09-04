import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, Phone, MapPin, Calendar } from "lucide-react";

const benefits = [
  "India's first optimization engine",
  "AI + Quantum algorithm robustness",
  "Up to 100% profit margins",
  "Real-time optimization",
  "Scalable for any business",
];

const ContactInformation = () => {
  return (
    <>
      {/* Contact Information & CTA */}
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-xl px-12 py-8 border border-secondary/20">
          <h3 className="text-2xl font-bold mb-6">Why Choose ENGN-F1?</h3>
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.li
                key={index}
                className="flex items-center"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CheckCircle className="text-success mr-4 w-5 h-5" />
                <span>{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="bg-card/90 rounded-xl px-12 py-8 border border-border">
          <h3 className="text-xl font-bold mb-4">Direct Contact</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="text-secondary mr-4 w-5 h-5" />
              <span>engn2625@gmail.com</span>
            </div>
            <div className="flex items-center">
              <Mail className="text-secondary mr-4 w-5 h-5" />
              <span>connect@engnf1.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="text-secondary mr-4 w-5 h-5" />
              <span>+91 8585835583</span>
            </div>
            <div className="flex items-center">
              <MapPin className="text-secondary mr-4 w-5 h-5" />
              <span>India</span>
            </div>
          </div>
        </div>

        {/* Pre-seed funding CTA */}
        <motion.div
          className="relative rounded-xl overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-8 border border-secondary/30 rounded-xl palantir-glow">
            <h4 className="font-bold mb-3 text-quantum">
              Pre-Seed Investment Opportunity
            </h4>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              We're raising pre-seed capital to accelerate MVP development,
              secure initial LOIs, and validate ENGN-F1's impact across sectors.
              Could we schedule a 45-minute call?
            </p>

            {/* CTA Button */}
            <a href="mailto:engn2625@gmail.com?subject=ENGN-F1 Pre-Seed Investment Discussion&body=Hi Sarthak,%0A%0AI am interested in discussing the pre-seed investment opportunity for ENGN-F1. Could we schedule a 45-minute call to explore this further?%0A%0ABest regards">
              <Button className="bg-secondary/70 hover:bg-secondary/80 text-sm font-semibold w-full palantir-glow">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Investment Call
              </Button>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ContactInformation;
