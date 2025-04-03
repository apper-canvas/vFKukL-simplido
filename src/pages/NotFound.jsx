import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

const NotFound = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">404</h1>
        <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 rounded-full"></div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-surface-600 dark:text-surface-400 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Link 
          to="/"
          className="inline-flex items-center px-5 py-3 rounded-xl bg-primary text-white 
                    hover:bg-primary-dark transition-colors duration-300 shadow-soft"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default NotFound