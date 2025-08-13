import React from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Database,
  Activity,
  Settings,
  Download,
  Upload,
  Play,
  Square,
  RotateCcw,
  FileText,
  Stethoscope,
  Copy,
  Plus,
  Minus,
  Zap,
  CheckCircle,
  Globe,
  Clock,
  ArrowUp,
  Package,
  FolderOpen,
} from "lucide-react";
import { GlowCard } from "../../components/nurui/spotlight-card";

interface CommandProps {
  command: string;
  description: string;
  usage: string;
  examples: string[];
  options?: { flag: string; description: string }[];
}

const CommandCard: React.FC<
  CommandProps & { icon: React.ComponentType<any> }
> = ({ command, description, usage, examples, options, icon: Icon }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <GlowCard className="p-6 mb-6 w-full" glowColor="blue" customSize={true}>
      <div className="flex items-center mb-4">
        <Icon className="w-6 h-6 text-primary mr-3" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {command}
        </h3>
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
        {description}
      </p>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          Usage:
        </h4>
        <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-100 relative group">
          <code>{usage}</code>
          <button
            onClick={() => copyToClipboard(usage)}
            className="absolute top-2 right-2 p-1 rounded bg-gray-800 hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Copy to clipboard"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {options && options.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            Options:
          </h4>
          <div className="space-y-2">
            {options.map((option, index) => (
              <div key={index} className="flex">
                <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono mr-3 flex-shrink-0">
                  {option.flag}
                </code>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {option.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          Examples:
        </h4>
        <div className="space-y-2">
          {examples.map((example, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-100 relative group"
            >
              <code>{example}</code>
              <button
                onClick={() => copyToClipboard(example)}
                className="absolute top-2 right-2 p-1 rounded bg-gray-800 hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Copy to clipboard"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </GlowCard>
  );
};

export const CLI = () => {
  const commands: (CommandProps & { icon: React.ComponentType<any> })[] = [
    {
      icon: Settings,
      command: "nizam init",
      description:
        "Initialize nizam in the current directory by creating a .nizam.yaml configuration file with default services.",
      usage: "nizam init",
      examples: [
        "nizam init",
        "nizam init --force  # Overwrite existing config",
      ],
      options: [
        { flag: "--force", description: "Overwrite existing .nizam.yaml file" },
      ],
    },
    {
      icon: Plus,
      command: "nizam add",
      description:
        "Add a service from a template to your configuration. Supports interactive configuration for customizable templates.",
      usage: "nizam add <template>",
      examples: [
        "nizam add postgres",
        "nizam add postgres --defaults",
        "nizam add redis --name cache",
        "nizam add mysql --overwrite",
      ],
      options: [
        {
          flag: "--name, -n",
          description: "Custom name for the service (default: template name)",
        },
        {
          flag: "--overwrite",
          description: "Overwrite existing service with the same name",
        },
        {
          flag: "--defaults",
          description: "Skip interactive prompts and use default values",
        },
      ],
    },
    {
      icon: Minus,
      command: "nizam remove",
      description:
        "Remove services from your configuration. Stops running services and removes them from config.",
      usage: "nizam remove <service...>",
      examples: [
        "nizam remove postgres",
        "nizam remove redis mysql",
        "nizam remove --all",
        "nizam remove postgres --force",
      ],
      options: [
        {
          flag: "--force, -f",
          description: "Remove services without confirmation prompt",
        },
        {
          flag: "--all",
          description: "Remove all services from configuration",
        },
      ],
    },
    {
      icon: Zap,
      command: "nizam exec",
      description:
        "Execute a command in a running service container. Useful for debugging and direct service interaction.",
      usage: "nizam exec <service> <command> [args...]",
      examples: [
        "nizam exec postgres psql -U user -d myapp",
        "nizam exec redis redis-cli",
        "nizam exec postgres bash",
        "nizam exec postgres -- psql -U user -d myapp",
      ],
    },
    {
      icon: CheckCircle,
      command: "nizam lint",
      description:
        "Lint configuration for best practices. Checks for image tags, port mappings, and resource recommendations.",
      usage: "nizam lint",
      examples: [
        "nizam lint",
        "nizam lint --file ./config.yaml",
        "nizam lint --json",
      ],
      options: [
        { flag: "--json", description: "Output JSON format" },
        {
          flag: "--file",
          description: "Config file to lint (default: .nizam.yaml)",
        },
      ],
    },
    {
      icon: Activity,
      command: "nizam health",
      description:
        "Check health status of services with detailed monitoring capabilities and multiple output formats.",
      usage: "nizam health [service]",
      examples: [
        "nizam health",
        "nizam health postgres",
        "nizam health --output json",
        "nizam health --watch --interval 5",
      ],
      options: [
        {
          flag: "--output, -o",
          description: "Output format (table, json, compact)",
        },
        {
          flag: "--watch, -w",
          description: "Watch health status continuously",
        },
        { flag: "--interval", description: "Watch interval in seconds" },
      ],
    },
    {
      icon: Globe,
      command: "nizam health-server",
      description:
        "Start the health check HTTP server with REST API endpoints and web dashboard for real-time monitoring.",
      usage: "nizam health-server",
      examples: [
        "nizam health-server",
        "nizam health-server --address :9090",
        "nizam health-server --interval 15",
        "nizam health-server --no-auto-start",
      ],
      options: [
        { flag: "--address", description: "HTTP server address to bind to" },
        { flag: "--interval", description: "Health check interval in seconds" },
        {
          flag: "--auto-start",
          description: "Automatically start health checking",
        },
      ],
    },
    {
      icon: Clock,
      command: "nizam wait-for",
      description:
        "Wait for services to become ready before proceeding. Checks ports and health endpoints.",
      usage: "nizam wait-for [service...]",
      examples: [
        "nizam wait-for database",
        "nizam wait-for web database --timeout 60s",
        "nizam wait-for",
      ],
      options: [
        { flag: "--timeout", description: "Maximum time to wait for services" },
        {
          flag: "--interval",
          description: "Interval between readiness checks",
        },
      ],
    },
    {
      icon: ArrowUp,
      command: "nizam update",
      description:
        "Update nizam to the latest version from GitHub releases. Downloads and replaces the current binary.",
      usage: "nizam update",
      examples: [
        "nizam update",
        "nizam update --check",
        "nizam update --prerelease",
      ],
      options: [
        {
          flag: "--check",
          description: "Only check for updates, don't install",
        },
        { flag: "--prerelease", description: "Include prerelease versions" },
      ],
    },
    {
      icon: Package,
      command: "nizam export",
      description:
        "Export a service configuration as a custom template. Save and reuse configurations across projects.",
      usage: "nizam export <service>",
      examples: [
        'nizam export mysql --name my-mysql --description "Custom MySQL setup"',
        "nizam export postgres --tags database,custom,company",
      ],
      options: [
        {
          flag: "--name, -n",
          description: "Name for the template (default: service name)",
        },
        {
          flag: "--description, -d",
          description: "Description for the template",
        },
        {
          flag: "--tags, -t",
          description: "Tags for the template (comma-separated)",
        },
      ],
    },
    {
      icon: FolderOpen,
      command: "nizam custom",
      description:
        "Manage custom templates including deleting, viewing, and listing custom templates.",
      usage: "nizam custom <subcommand>",
      examples: [
        "nizam custom list",
        "nizam custom delete my-template",
        "nizam custom show my-template",
        "nizam custom dir",
      ],
    },
    {
      icon: Play,
      command: "nizam up",
      description:
        "Start one or more services defined in your configuration. If no services are specified, all services will be started.",
      usage: "nizam up [service1] [service2] ...",
      examples: [
        "nizam up # Start all services",
        "nizam up postgres",
        "nizam up postgres redis",
        "nizam up postgres redis meilisearch",
      ],
    },
    {
      icon: Square,
      command: "nizam down",
      description:
        "Stop one or more services. If no services are specified, all running services will be stopped.",
      usage: "nizam down [service1] [service2] ...",
      examples: [
        "nizam down # Stop all services",
        "nizam down postgres",
        "nizam down postgres redis",
      ],
    },
    {
      icon: Activity,
      command: "nizam status",
      description:
        "Display the current status of all services, showing which are running, stopped, or have issues.",
      usage: "nizam status",
      examples: ["nizam status"],
    },
    {
      icon: FileText,
      command: "nizam logs",
      description:
        "View logs for one or more services. Useful for debugging and monitoring service activity.",
      usage: "nizam logs [service1] [service2] ...",
      examples: [
        "nizam logs",
        "nizam logs postgres",
        "nizam logs postgres --tail=10",
        "nizam logs --follow postgres  # Follow logs in real-time",
      ],
      options: [
        { flag: "--follow, -f", description: "Follow log output in real-time" },
        { flag: "--tail N", description: "Show only last N lines of logs" },
      ],
    },
    {
      icon: Download,
      command: "nizam snapshot create",
      description:
        "Create a compressed snapshot of database data for backup purposes. Supports PostgreSQL, MySQL, Redis, and MongoDB.",
      usage: "nizam snapshot create <service> <snapshot-name>",
      examples: [
        "nizam snapshot create postgres backup-2024-01-15",
        "nizam snapshot create mysql production-backup",
        "nizam snapshot create redis cache-state",
      ],
    },
    {
      icon: FileText,
      command: "nizam snapshot list",
      description:
        "List all available snapshots for a service, showing creation dates and sizes.",
      usage: "nizam snapshot list <service>",
      examples: ["nizam snapshot list postgres", "nizam snapshot list mysql"],
    },
    {
      icon: Upload,
      command: "nizam snapshot restore",
      description:
        "Restore a database from a previously created snapshot. This will replace the current database contents.",
      usage: "nizam snapshot restore <service> <snapshot-name>",
      examples: [
        "nizam snapshot restore postgres backup-2024-01-15",
        "nizam snapshot restore mysql production-backup",
      ],
    },
    {
      icon: Database,
      command: "nizam psql",
      description:
        "Connect to PostgreSQL with auto-resolved credentials. No need to remember ports, passwords, or connection details.",
      usage: "nizam psql [database]",
      examples: [
        "nizam psql",
        "nizam psql mydb",
        'nizam psql postgres -- -c "SELECT version()"',
      ],
    },
    {
      icon: Database,
      command: "nizam mysql",
      description:
        "Connect to MySQL with auto-resolved credentials and connection parameters.",
      usage: "nizam mysql [database]",
      examples: [
        "nizam mysql",
        "nizam mysql mydb",
        "nizam mysql --user root --db mysql # Override connection parameters",
        'nizam mysql -- -e "SHOW DATABASES"',
      ],
    },
    {
      icon: Database,
      command: "redis-cli [service] [-- redis-cli-args...]",
      description:
        "Connect to Redis with auto-resolved connection settings. If no service is specified, uses the first Redis service found in config.",
      usage: "nizam redis-cli",
      examples: [
        "nizam redis-cli",
        "nizam redis-cli cache -- --help",
        "nizam redis-cli redis -- ping",
      ],
    },
    {
      icon: Database,
      command: "nizam mongosh",
      description:
        "Connect to MongoDB with auto-resolved credentials and connection parameters. Supports both host binary and container execution.",
      usage: "nizam mongosh [service] [-- mongosh_args...]",
      examples: [
        "nizam mongosh",
        "nizam mongosh mydb",
        "nizam mongosh --user admin --db app",
        'nizam mongosh -- --eval "db.version()"',
      ],
      options: [
        {
          flag: "--user USER",
          description: "Override username for connection",
        },
        { flag: "--db DATABASE", description: "Override database name" },
        {
          flag: "-- args",
          description: "Pass additional arguments to mongosh",
        },
      ],
    },
    {
      icon: Stethoscope,
      command: "nizam doctor",
      description:
        "Run comprehensive preflight checks to ensure your environment is properly configured. Checks Docker installation, disk space, network configuration, and port availability.",
      usage: "nizam doctor",
      examples: [
        "nizam doctor",
        "nizam doctor --fix",
        "nizam doctor --json",
        "nizam doctor --skip net.mtu,disk.free",
        "nizam doctor --list-checks",
      ],
      options: [
        {
          flag: "--fix",
          description: "Attempt to automatically fix detected issues",
        },
        { flag: "--json", description: "Output results in JSON format" },
        {
          flag: "--skip [checks]",
          description: "Skip specific checks by name",
        },
        {
          flag: "--list-checks",
          description: "List all available checks and their descriptions",
        },
      ],
    },
    {
      icon: RotateCcw,
      command: "nizam restart",
      description:
        "Restart one or more services. Equivalent to running down followed by up. Note: This command is not currently supported.",
      usage: "nizam restart [service1] [service2] ...",
      examples: [
        "nizam restart",
        "nizam restart postgres",
        "nizam restart postgres redis",
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-36 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            CLI Reference
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Complete command reference for nizam. All commands include examples
            and detailed usage information.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <Terminal className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                Quick Start
              </h3>
            </div>
            <p className="text-blue-800 dark:text-blue-200 mb-3">
              New to nizam? Start with these essential commands:
            </p>
            <div className="space-y-2">
              <div className="bg-gray-900 rounded p-2 font-mono text-sm text-gray-100">
                <span className="text-cyan-400">$</span> nizam init # Initialize
                configuration
              </div>
              <div className="bg-gray-900 rounded p-2 font-mono text-sm text-gray-100">
                <span className="text-cyan-400">$</span> nizam up # Start all
                services
              </div>
              <div className="bg-gray-900 rounded p-2 font-mono text-sm text-gray-100">
                <span className="text-cyan-400">$</span> nizam status # Check
                service status
              </div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-16">
          {/* Core Service Lifecycle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-3 mr-4">
                <Play className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Core Service Lifecycle
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Commands that manage the fundamental lifecycle of services
                </p>
              </div>
            </div>
            <div className="space-y-6">
              {commands
                .filter((cmd) =>
                  [
                    "nizam init",
                    "nizam up",
                    "nizam down",
                    "nizam status",
                    "nizam logs",
                    "nizam exec",
                  ].includes(cmd.command)
                )
                .map((command, index) => (
                  <motion.div
                    key={command.command}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <CommandCard {...command} />
                  </motion.div>
                ))}
            </div>
          </motion.div>

          {/* Service Configuration Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-3 mr-4">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Service Configuration Management
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Commands for managing service definitions and templates
                </p>
              </div>
            </div>
            <div className="space-y-6">
              {commands
                .filter((cmd) =>
                  [
                    "nizam add",
                    "nizam remove",
                    "nizam custom",
                    "nizam export",
                  ].includes(cmd.command)
                )
                .map((command, index) => (
                  <motion.div
                    key={command.command}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <CommandCard {...command} />
                  </motion.div>
                ))}
            </div>
          </motion.div>

          {/* Data Lifecycle Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg p-3 mr-4">
                <Database className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Data Lifecycle Management
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Commands for database snapshots and data operations
                </p>
              </div>
            </div>
            <div className="space-y-6">
              {commands
                .filter((cmd) =>
                  [
                    "nizam snapshot create",
                    "nizam snapshot list",
                    "nizam snapshot restore",
                    "nizam psql",
                    "nizam mysql",
                    "redis-cli [service] [-- redis-cli-args...]",
                    "nizam mongosh",
                  ].includes(cmd.command)
                )
                .map((command, index) => (
                  <motion.div
                    key={command.command}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <CommandCard {...command} />
                  </motion.div>
                ))}
            </div>
          </motion.div>

          {/* Health & Monitoring */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-3 mr-4">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Health & Monitoring
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Commands for monitoring service health and status
                </p>
              </div>
            </div>
            <div className="space-y-6">
              {commands
                .filter((cmd) =>
                  [
                    "nizam health",
                    "nizam health-server",
                    "nizam wait-for",
                  ].includes(cmd.command)
                )
                .map((command, index) => (
                  <motion.div
                    key={command.command}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <CommandCard {...command} />
                  </motion.div>
                ))}
            </div>
          </motion.div>

          {/* Operations & DevOps Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg p-3 mr-4">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Operations & DevOps Tools
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Commands for operational tasks, validation, and
                  troubleshooting
                </p>
              </div>
            </div>
            <div className="space-y-6">
              {commands
                .filter((cmd) =>
                  [
                    "nizam doctor",
                    "nizam lint",
                    "nizam update",
                    "nizam restart",
                  ].includes(cmd.command)
                )
                .map((command, index) => (
                  <motion.div
                    key={command.command}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <CommandCard {...command} />
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 p-8 bg-gray-50 dark:bg-gray-900/50 rounded-xl"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Global Options
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            These options can be used with most nizam commands:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                flag: "--help, -h",
                description: "Show command help and usage information",
              },
              {
                flag: "--version, -v",
                description: "Display nizam version information",
              },
              {
                flag: "--config FILE",
                description: "Use a different configuration file",
              },
              {
                flag: "--verbose",
                description: "Enable detailed output for debugging",
              },
            ].map((option, index) => (
              <div key={index} className="flex items-start">
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono mr-3 flex-shrink-0">
                  {option.flag}
                </code>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {option.description}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
