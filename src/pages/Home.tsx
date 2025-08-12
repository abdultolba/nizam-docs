import { motion } from "framer-motion";
import {
  Database,
  Zap,
  Github,
  Terminal as TerminalIcon,
  Layers,
  Shield,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";

import { GradientGridHero } from "../../components/nurui/gradient-grid-hero";
import BorderAnimationButton from "../../components/nurui/border-button";
import { GlowCard } from "../../components/nurui/spotlight-card";
import { Terminal, AnimatedSpan } from "../../components/nurui/terminal";

export const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <GradientGridHero />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.h1
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Dev Services Simplified.
              </span>
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Nizam is a powerful CLI tool to manage, monitor, and interact with
              local development services using Docker. Spin up databases,
              caches, and services without the complexity.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link to="/docs/getting-started">
                <BorderAnimationButton text="Get Started" />
              </Link>
              <a
                href="https://github.com/abdultolba/nizam"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-2xl hover:border-primary transition-colors duration-300"
              >
                <Github className="w-5 h-5" />
                <span>View on GitHub</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose <span className="text-primary">nizam</span>?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Streamline your local development workflow with powerful service
              management, data lifecycle tools, and comprehensive monitoring.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center md:place-items-stretch">
            {[
              {
                icon: Zap,
                title: "One-Command Service Management",
                description:
                  "Start, stop, and manage multiple development services with simple commands like `nizam up postgres redis`.",
              },
              {
                icon: Database,
                title: "Database Snapshots",
                description:
                  "Create, restore, and manage database snapshots with compression support for PostgreSQL, MySQL, Redis, and MongoDB.",
              },
              {
                icon: TerminalIcon,
                title: "Smart Database Access",
                description:
                  "Auto-resolved database connections with `nizam psql`, `nizam mysql`, `nizam redis-cli` - no more manual credential management.",
              },
              {
                icon: Shield,
                title: "Environment Doctor",
                description:
                  "Comprehensive preflight checks for Docker, disk space, network configuration, and port conflicts.",
              },
              {
                icon: Layers,
                title: "16+ Service Templates",
                description:
                  "Built-in templates for popular development tools: PostgreSQL, Redis, Elasticsearch, Kafka, Prometheus, and more.",
              },
              {
                icon: Activity,
                title: "Health Monitoring",
                description:
                  "Advanced health checking with CLI interface, web dashboard, and real-time monitoring capabilities.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlowCard
                  className="p-6 h-full w-full max-w-sm mx-auto md:max-w-none"
                  glowColor="blue"
                  customSize={true}
                >
                  <div className="flex items-center mb-4">
                    <feature.icon className="w-8 h-8 text-primary mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Terminal Demo Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Get Started in <span className="text-primary">Minutes</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Install nizam and start managing your development services with
              these simple commands.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <Terminal>
              <AnimatedSpan delay={500}>
                <span className="text-cyan-400">$</span> git clone
                https://github.com/abdultolba/nizam.git
              </AnimatedSpan>
              <AnimatedSpan delay={1000}>
                <span className="text-cyan-400">$</span> cd nizam && go build -o
                nizam
              </AnimatedSpan>
              <AnimatedSpan delay={1500}>
                <span className="text-cyan-400">$</span> sudo mv nizam
                /usr/local/bin/
              </AnimatedSpan>
              <AnimatedSpan delay={2000}>
                <span className="text-cyan-400">$</span> nizam init
              </AnimatedSpan>
              <AnimatedSpan delay={2500} className="text-green-400">
                ✓ Created .nizam.yaml with default services
              </AnimatedSpan>
              <AnimatedSpan delay={2700} className="text-green-400">
                ✓ Added postgres, redis, meilisearch
              </AnimatedSpan>
              <AnimatedSpan delay={3000}>
                <span className="text-cyan-400">$</span> nizam up
              </AnimatedSpan>
              <AnimatedSpan delay={3500} className="text-green-400">
                ✓ Starting postgres...
              </AnimatedSpan>
              <AnimatedSpan delay={3700} className="text-green-400">
                ✓ Starting redis...
              </AnimatedSpan>
              <AnimatedSpan delay={3900} className="text-green-400">
                ✓ Starting meilisearch...
              </AnimatedSpan>
              <AnimatedSpan
                delay={4300}
                className="text-green-400 font-semibold"
              >
                All services are ready!
              </AnimatedSpan>
            </Terminal>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/5 dark:to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Simplify Your Development Workflow?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Join developers who've streamlined their local development with
              nizam's powerful service management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/docs/getting-started">
                <BorderAnimationButton text="Get Started Now" />
              </Link>
              <Link
                to="/docs/features"
                className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-2xl hover:border-primary transition-colors duration-300"
              >
                <span>Explore Features</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
