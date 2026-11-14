import React from "react";
import { motion, useInView } from "framer-motion";
import SketchFrame from "../SketchFrame";

export default function GlassCard({
  children,
  className = "",
  hover = true,
  delay = 0,
  onViewportEnter,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  onViewportEnter?: () => void;
}) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (isInView && onViewportEnter) {
      onViewportEnter();
    }
  }, [isInView, onViewportEnter]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      // Sotto i 640px il margine interno e' 16px invece di 32: su telefono i margini annidati
      // (pagina + card + contenuto) lasciavano al testo poco piu' di meta' schermo.
      className={`glass sketch rounded-xl p-4 sm:p-8 transition-all duration-300 ${
        hover ? "glass-hover cursor-pointer" : ""
      } ${className}`}
    >
      <SketchFrame />
      {children}
    </motion.div>
  );
}
