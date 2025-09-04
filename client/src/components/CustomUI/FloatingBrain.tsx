import { useEffect, useState, useRef } from "react";
import { Brain } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function FloatingBrain() {
  const brainRef = useRef<HTMLDivElement>(null);
  const [footerTop, setFooterTop] = useState<number>(Infinity);
  const [brainHeight, setBrainHeight] = useState<number>(0);

  const { scrollY } = useScroll();

  // Base animation mapping
  const topRaw = useTransform(scrollY, [0, 1000], [100, 600]);
  const springTop = useSpring(topRaw, { stiffness: 60, damping: 20 });
  const opacity = useTransform(scrollY, [0, 200], [0.2, 1]);

  // Derived "clamped top" that respects footer
  const [clampedTop, setClampedTop] = useState(100);

  useEffect(() => {
    const updateFooter = () => {
      const footer = document.querySelector("footer");
      if (footer) {
        const rect = footer.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;
        setFooterTop(absoluteTop);
      }
      if (brainRef.current) {
        setBrainHeight(brainRef.current.offsetHeight);
      }
    };

    updateFooter();
    window.addEventListener("resize", updateFooter);
    window.addEventListener("scroll", updateFooter);
    return () => {
      window.removeEventListener("resize", updateFooter);
      window.removeEventListener("scroll", updateFooter);
    };
  }, []);

  // Clamp top value dynamically whenever springTop or footerTop changes
  useEffect(() => {
    const unsub = springTop.on("change", (latest) => {
      const maxTop = footerTop - brainHeight - 20; // stop 20px above footer
      setClampedTop(Math.min(latest, maxTop));
    });
    return () => unsub();
  }, [springTop, footerTop, brainHeight]);

  return (
    <motion.div
      ref={brainRef}
      className="fixed left-6 sm:left-12 w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center backdrop-blur-sm border-2 z-50"
      style={{
        top: clampedTop,
        opacity,
      }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.6, 0.9, 0.6],
        borderColor: "hsl(var(--quantum))",
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Brain className="w-5 h-5 sm:w-7 sm:h-7 text-neural" />
    </motion.div>
  );
}
