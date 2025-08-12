import React from "react";
import { motion } from "framer-motion";
import {
  Database,
  Zap,
  Terminal,
  Layers,
  Shield,
  Activity,
  Settings,
  Clock,
  Network,
  CheckCircle,
  Search,
  MessageSquare,
  TrendingUp,
  BarChart3,
  Eye,
  Zap as ZapkinIcon,
  FileText,
  Radio,
  Cloud,
  Server,
} from "lucide-react";
import { GlowCard } from "../../components/nurui/spotlight-card";
import {
  Terminal as TerminalComponent,
  AnimatedSpan,
} from "../../components/nurui/terminal";

interface FeatureProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  benefits: string[];
  codeExample?: string;
  supportedServices?: string[];
}

const FeatureCard: React.FC<FeatureProps> = ({
  icon: Icon,
  title,
  description,
  benefits,
  codeExample,
  supportedServices,
}) => {
  return (
    <GlowCard className="p-8 w-full" glowColor="blue" customSize={true}>
      <div className="flex items-center mb-6">
        <Icon className="w-8 h-8 text-primary mr-4" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-lg">
        {description}
      </p>

      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
          Benefits:
        </h4>
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600 dark:text-gray-400">
                {benefit}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {codeExample && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
            Example:
          </h4>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100">
            <pre className="whitespace-pre-wrap overflow-x-auto">
              <code>{codeExample}</code>
            </pre>
          </div>
        </div>
      )}

      {supportedServices && supportedServices.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
            Supported Services:
          </h4>
          <div className="flex flex-wrap gap-2">
            {supportedServices.map((service, index) => (
              <span
                key={index}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      )}
    </GlowCard>
  );
};

// Service icon mapping for better visual representation
const getServiceIcon = (serviceName: string) => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    PostgreSQL: Database,
    MySQL: Database,
    Redis: Zap,
    MongoDB: Database,
    Elasticsearch: Search,
    Kafka: MessageSquare,
    RabbitMQ: MessageSquare,
    Prometheus: TrendingUp,
    Grafana: BarChart3,
    Jaeger: Eye,
    Zipkin: ZapkinIcon,
    Meilisearch: Search,
    ClickHouse: BarChart3,
    CouchDB: FileText,
    MinIO: Cloud,
    NATS: Radio,
  };
  return iconMap[serviceName] || Server;
};

export const Features = () => {
  const features: FeatureProps[] = [
    {
      icon: Zap,
      title: "One-Command Service Management",
      description:
        "Start, stop, and manage multiple development services with simple, intuitive commands. No more complex Docker Compose files or manual container management.",
      benefits: [
        "Single command to start all services",
        "Selective service management",
        "Automatic dependency handling",
        "Intelligent port management",
        "Cross-platform compatibility",
      ],
      codeExample:
        "# Start specific services\nnizam up postgres redis\n\n# Start all configured services\nnizam up\n\n# Stop specific services\nnizam down postgres",
      supportedServices: [
        "PostgreSQL",
        "MySQL",
        "Redis",
        "MongoDB",
        "Elasticsearch",
        "Kafka",
        "RabbitMQ",
        "Prometheus",
        "Grafana",
        "Jaeger",
        "Zipkin",
        "Meilisearch",
        "ClickHouse",
        "CouchDB",
        "MinIO",
        "NATS",
      ],
    },
    {
      icon: Database,
      title: "Database Snapshots",
      description:
        "Create, manage, and restore compressed database snapshots with a single command. Perfect for testing, development, and creating reproducible environments.",
      benefits: [
        "Compressed backup format",
        "Fast snapshot creation and restoration",
        "Multiple database support",
        "Automatic data validation",
        "Snapshot metadata tracking",
      ],
      codeExample:
        "# Create a snapshot\nnizam snapshot create postgres backup-2024-01-15\n\n# List available snapshots\nnizam snapshot list postgres\n\n# Restore from snapshot\nnizam snapshot restore postgres backup-2024-01-15",
      supportedServices: ["PostgreSQL", "MySQL", "Redis", "MongoDB"],
    },
    {
      icon: Terminal,
      title: "Smart Database Access",
      description:
        "Connect to databases instantly with auto-resolved credentials and connection parameters. No more remembering ports, passwords, or connection strings.",
      benefits: [
        "Automatic credential resolution",
        "No manual configuration needed",
        "Secure connection handling",
        "Multiple database support",
        "Interactive shell access",
      ],
      codeExample:
        "# Connect to PostgreSQL\nnizam psql\nnizam psql myapp_development\n\n# Connect to MySQL\nnizam mysql\n\n# Connect to Redis\nnizam redis-cli\n\n# Connect to MongoDB\nnizam mongosh\nnizam mongosh myapp",
      supportedServices: ["PostgreSQL", "MySQL", "Redis", "MongoDB"],
    },
    {
      icon: Shield,
      title: "Environment Doctor",
      description:
        "Comprehensive preflight checks ensure your development environment is properly configured before you start working.",
      benefits: [
        "Docker installation verification",
        "Disk space monitoring",
        "Network configuration checks",
        "Port conflict detection",
        "System resource validation",
      ],
      codeExample:
        "# Run comprehensive system checks\nnizam doctor\n\n# Sample output:\n# ✓ Docker is installed and running\n# ✓ Sufficient disk space available\n# ✓ Required ports are available\n# ⚠ Low memory warning (< 4GB available)\n\n# Port Conflicts\n# ✖ port.5432     port in use\n#   Change host port for service postgres in .nizam.yaml\n#   Or stop the process using the port",
    },
    {
      icon: Layers,
      title: "16+ Service Templates",
      description:
        "Pre-configured templates for popular development tools, databases, and services. Get started instantly with production-ready configurations.",
      benefits: [
        "Production-ready configurations",
        "Optimized for development",
        "Regular template updates",
        "Community-driven additions",
        "Easy customization",
      ],
      supportedServices: [
        "PostgreSQL",
        "MySQL",
        "Redis",
        "MongoDB",
        "Elasticsearch",
        "Kafka",
        "RabbitMQ",
        "Prometheus",
        "Grafana",
        "Jaeger",
        "Zipkin",
        "Meilisearch",
        "ClickHouse",
        "CouchDB",
        "MinIO",
        "NATS",
      ],
    },
    {
      icon: Activity,
      title: "Health Monitoring",
      description:
        "Advanced health checking with CLI interface, web dashboard, and real-time monitoring capabilities to keep your services running smoothly.",
      benefits: [
        "Real-time health monitoring",
        "Web-based dashboard",
        "Service status tracking",
        "Performance metrics",
        "Automated health checks",
      ],
      codeExample:
        "# Check service status\nnizam status\n\n# View detailed service logs\nnizam logs postgres\n\n# Follow logs in real-time\nnizam logs --follow redis",
    },
    {
      icon: Settings,
      title: "Flexible Configuration",
      description:
        "Simple YAML configuration that adapts to your project needs. Override default settings, customize service configurations, and manage multiple environments.",
      benefits: [
        "Simple YAML configuration",
        "Environment-specific settings",
        "Service customization",
        "Port and volume mapping",
        "Environment variable support",
      ],
      codeExample:
        '# .nizam.yaml example\nservices:\n  postgres:\n    image: postgres:15\n    environment:\n      POSTGRES_DB: myapp\n    ports:\n      - "5432:5432"\n  redis:\n    image: redis:alpine',
    },
    {
      icon: Clock,
      title: "Fast Operations",
      description:
        "Optimized for speed with intelligent caching, parallel operations, and minimal resource usage. Get your development environment up and running in seconds.",
      benefits: [
        "Parallel service startup",
        "Intelligent image caching",
        "Minimal resource overhead",
        "Fast container operations",
        "Optimized Docker usage",
      ],
    },
    {
      icon: Network,
      title: "Network Management",
      description:
        "Automatic network configuration ensures services can communicate seamlessly while avoiding port conflicts with your existing setup.",
      benefits: [
        "Automatic port allocation",
        "Service discovery",
        "Network isolation",
        "Conflict resolution",
        "Cross-service communication",
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-36 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Powerful Features
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover why nizam is the ultimate tool for local development
            service management. Every feature is designed to make your
            development workflow faster and more reliable.
          </p>
        </motion.div>

        {/* Hero Feature Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                See nizam in Action
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Watch how easy it is to manage your development services
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <TerminalComponent>
                <AnimatedSpan delay={500}>
                  <span className="text-cyan-400">$</span> nizam doctor
                </AnimatedSpan>
                <AnimatedSpan delay={1000} className="text-green-400">
                  ✓ Docker is installed and running
                </AnimatedSpan>
                <AnimatedSpan delay={1200} className="text-green-400">
                  ✓ Sufficient disk space available (45GB free)
                </AnimatedSpan>
                <AnimatedSpan delay={1400} className="text-green-400">
                  ✓ Required ports are available
                </AnimatedSpan>
                <AnimatedSpan delay={1800}>
                  <span className="text-cyan-400">$</span> nizam up postgres
                  redis
                </AnimatedSpan>
                <AnimatedSpan delay={2300} className="text-green-400">
                  ✓ Starting postgres... (5432:5432)
                </AnimatedSpan>
                <AnimatedSpan delay={2600} className="text-green-400">
                  ✓ Starting redis... (6379:6379)
                </AnimatedSpan>
                <AnimatedSpan
                  delay={3000}
                  className="text-green-400 font-semibold"
                >
                  All services are ready! 🚀
                </AnimatedSpan>
              </TerminalComponent>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="w-full h-full"
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>

        {/* Supported Services Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              16+ Supported Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Pre-configured templates for all your favorite development tools,
              ready to use out of the box.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {[
                "PostgreSQL",
                "MySQL",
                "Redis",
                "MongoDB",
                "Elasticsearch",
                "Kafka",
                "RabbitMQ",
                "Prometheus",
                "Grafana",
                "Jaeger",
                "Zipkin",
                "Meilisearch",
                "ClickHouse",
                "CouchDB",
                "MinIO",
                "NATS",
              ].map((service, index) => {
                const ServiceIcon = getServiceIcon(service);
                return (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="text-center">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <ServiceIcon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {service}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
