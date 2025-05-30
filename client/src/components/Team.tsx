import { motion } from "framer-motion";
import { User, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    name: "Arnab Das",
    title: "Co-founder",
    phone: "7278183606",
    email: "arnbrxdas@gmail.com",
    gradient: "from-secondary to-accent"
  },
  {
    name: "Sarthak Chakraborty",
    title: "Co-founder",
    phone: "7003995634",
    email: "sarthak.chakraborty.144@gmail.com",
    gradient: "from-accent to-secondary"
  }
];

export default function Team() {
  return (
    <section id="team" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Meet The Minds Behind "The Logistics Lab"</h2>
          <p className="text-xl text-slate-300">Empowered by a complimentary team</p>
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
              <h3 className="text-2xl font-bold mb-2">Everyone's playing checkers in a firestorm.</h3>
              <p className="text-xl text-secondary">We built the chess engine.</p>
            </div>
          </div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                transition: { duration: 0.2 }
              }}
            >
              <div className={`w-24 h-24 bg-gradient-to-r ${member.gradient} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <User className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
              <p className={`mb-4 ${index === 0 ? 'text-secondary' : 'text-accent'}`}>{member.title}</p>
              <div className="space-y-2 text-slate-300 mb-6">
                <div className="flex items-center justify-center">
                  <Phone className="text-slate-400 mr-2 w-4 h-4" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center justify-center">
                  <Mail className="text-slate-400 mr-2 w-4 h-4" />
                  <span className="break-all">{member.email}</span>
                </div>
              </div>
              <Button 
                className={`${index === 0 ? 'bg-secondary hover:bg-secondary/80' : 'bg-accent hover:bg-accent/80'} px-6 py-2`}
                onClick={() => window.open(`mailto:${member.email}`, '_blank')}
              >
                Connect
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
