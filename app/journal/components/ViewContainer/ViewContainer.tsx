import { motion } from 'framer-motion';

interface ViewContainerProps {
  children: React.ReactNode;
}

export default function ViewContainer({ children }: ViewContainerProps) {
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