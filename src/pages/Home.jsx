import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainFeature from '../components/MainFeature'

const Home = () => {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto pt-8 md:pt-16"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">SimpliDo</span>
            </h1>
            <p className="text-surface-600 dark:text-surface-300 text-lg max-w-xl mx-auto">
              Focus on what matters with our minimalist task management approach.
              No complexity, just simplicity.
            </p>
          </motion.div>
          
          <MainFeature />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Home