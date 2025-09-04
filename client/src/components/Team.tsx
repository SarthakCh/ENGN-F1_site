import { motion } from "framer-motion";
import { User, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import NeuralNetworkBackground from "./CustomUI/NeuralNetworkBackground";

const teamMembers = [
  {
    name: "Arnab Das",
    title: "Co-founder",
    phone: "+91 7278183606",
    email1: "arnbrxdas@gmail.com",
    email2: "arnab@engnf1.com",
    gradient: "from-secondary to-accent",
  },
  {
    name: "Sarthak Chakraborty",
    title: "Co-founder",
    phone: "+91 8585835583",
    email1: "sarthak@engnf1.com",
    email2: "sarthak.chakraborty.144@gmail.com",
    gradient: "from-accent to-secondary",
  },
];

export default function Team() {
  return (
    <section id="team" className="relative py-20 overflow-hidden">
      {/* Background quantum field */}
      <div className="absolute inset-0 quantum-grid z-0" />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background opacity-70 z-10" />
      {/* Node network canvas */}
      <NeuralNetworkBackground />

      {/* Content */}
      <div className="relative container mx-auto px-6 z-40">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet The Minds Behind{" "}
            <span className="quantum-gradient-text">ENGN-F1</span>
          </h2>
          <p className="text-xl text-slate-300">
            Driven by innovators shaping the future of optimization.
          </p>
        </motion.div>

        {/* Business team collaboration */}
        <motion.div
          className="mb-16 relative rounded-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=600"
            alt="Business team collaboration"
            className="w-full h-96 object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">
                Everyone's playing checkers in a firestorm.
              </h3>
              <p className="text-xl text-secondary">
                We built the chess engine.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="card-hover bg-slate-800/50 rounded-xl p-8 border border-slate-700 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
            >
              <div
                className={`w-24 h-24 bg-gradient-to-r ${member.gradient} rounded-full flex items-center justify-center mx-auto mb-6`}
              >
                <User className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
              <p
                className={`mb-4 ${
                  index === 0 ? "text-secondary" : "text-accent"
                }`}
              >
                {member.title}
              </p>
              <div className="space-y-2 text-slate-300 mb-6">
                <div className="flex items-center justify-center">
                  <Phone className="text-slate-400 mr-2 w-4 h-4" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center justify-center">
                  <Mail className="text-slate-400 mr-2 w-4 h-4" />
                  <span className="break-all">{member.email1}</span>
                </div>
                {member.email2 && (
                  <div className="flex items-center justify-center">
                    <Mail className="text-slate-400 mr-2 w-4 h-4" />
                    <span className="break-all">{member.email2}</span>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <a
                href={`mailto:${member.email1}?subject=Exploring Collaboration with ENGN-F1&body=Hi ${member.name},%0A%0AI came across ENGN-F1 and was impressed by your work in combining Quantum and AI technologies. I would love to learn more about your vision and explore how I might contribute to or collaborate with your company.%0A%0AWould you be available for a 30–45 minute call at your convenience? Please let me know a time that works best for you.%0A%0ALooking forward to your response.%0A%0ABest regards,%0A[Your Full Name]%0A[Your Organization / Role]%0A[Your Contact Info]`}
              >
                <Button
                  className={`${
                    index === 0
                      ? "bg-secondary hover:bg-secondary/80"
                      : "bg-accent hover:bg-accent/80"
                  } px-6 py-2`}
                >
                  Connect
                </Button>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
