import { motion } from "framer-motion";
import { Terminal, AnimatedSpan } from "../../components/nurui/terminal";

export const GettingStarted = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Getting Started with <span className="text-primary">nizam</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Follow this guide to install nizam and start managing your local
            development services.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Installation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-black font-bold flex items-center justify-center">
                  1
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Install from Source
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Clone the repository and build from source code using Go.
              </p>
            </div>
            <Terminal className="w-full">
              <AnimatedSpan delay={500}>
                <span className="text-primary">$</span> git clone
                https://github.com/abdultolba/nizam.git
              </AnimatedSpan>
              <AnimatedSpan delay={1000}>
                <span className="text-primary">$</span> cd nizam
              </AnimatedSpan>
              <AnimatedSpan delay={1500}>
                <span className="text-primary">$</span> go build -o nizam
              </AnimatedSpan>
              <AnimatedSpan delay={2000}>
                <span className="text-primary">$</span> sudo mv nizam
                /usr/local/bin/
              </AnimatedSpan>
              <AnimatedSpan delay={2500} className="text-green-400">
                nizam version 1.0.0
              </AnimatedSpan>
            </Terminal>
          </motion.div>

          {/* Initialize */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-black font-bold flex items-center justify-center">
                  2
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Initialize Configuration
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Set up your first nizam configuration with default services.
              </p>
            </div>
            <Terminal className="w-full">
              <AnimatedSpan delay={500}>
                <span className="text-primary">$</span> nizam init
              </AnimatedSpan>
              <AnimatedSpan delay={1000} className="text-green-400">
                ✓ Created .nizam.yaml with default services
                <br />✓ Added postgres, redis, meilisearch
              </AnimatedSpan>
            </Terminal>
          </motion.div>

          {/* Start Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-black font-bold flex items-center justify-center">
                  3
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Start Services
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Launch your development services and verify they're running.
              </p>
            </div>
            <Terminal className="w-full">
              <AnimatedSpan delay={500}>
                <span className="text-primary">$</span> nizam up
              </AnimatedSpan>
              <AnimatedSpan delay={1000} className="text-green-400">
                ✓ Starting postgres...
                <br />✓ Starting redis...
                <br />✓ Starting meilisearch...
                <br />
                <br />
                All services are ready!
              </AnimatedSpan>
            </Terminal>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
