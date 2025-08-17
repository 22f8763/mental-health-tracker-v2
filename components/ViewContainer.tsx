import { motion } from 'framer-motion';

export default function ViewContainer({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}