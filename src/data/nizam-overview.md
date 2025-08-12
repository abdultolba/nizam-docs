# Nizam CLI - Complete Command Reference

> **Nizam** is a powerful CLI tool to manage, monitor, and interact with local development services (Postgres, Redis, MongoDB, etc.) using Docker. It helps you spin up, shut down, and interact with common services without manually writing docker run or service-specific commands.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Global Options](#global-options)
- [Project Management](#project-management)
- [Service Management](#service-management)
- [Data Lifecycle](#data-lifecycle)
- [Database CLI Access](#database-cli-access)
- [Health & Monitoring](#health--monitoring)
- [Development & Operations](#development--operations)
- [Template Management](#template-management)
- [System Utilities](#system-utilities)
- [Example Outputs](#example-outputs)
- [Common Issues & Troubleshooting](#common-issues--troubleshooting)

---

## Prerequisites

Before using Nizam, ensure you have the following requirements:

### Docker Engine

Nizam requires **Docker Engine** to be installed and running on your system. Docker is used to manage all service containers.

**Check if Docker is installed:**
```bash
docker --version
docker compose version  # Docker Compose is also required
```

**Installation by Operating System:**

#### macOS
1. **Docker Desktop (Recommended):**
   - Download from: https://docs.docker.com/desktop/install/mac-install/
   - Includes Docker Engine, Docker Compose, and GUI management
   
2. **Homebrew:**
   ```bash
   brew install --cask docker
   ```

3. **Alternative (CLI only):**
   ```bash
   brew install docker docker-compose
   # Note: You'll need to manage Docker daemon separately
   ```

#### Linux (Ubuntu/Debian)
```bash
# Remove old versions
sudo apt-get remove docker docker-engine docker.io containerd runc

# Install dependencies
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add user to docker group (optional, avoids sudo)
sudo usermod -aG docker $USER
# Log out and back in for group changes to take effect
```

#### Linux (CentOS/RHEL/Fedora)
```bash
# Install Docker
sudo dnf install docker docker-compose
# or for older systems: sudo yum install docker docker-compose

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group (optional)
sudo usermod -aG docker $USER
```

#### Windows
1. **Docker Desktop (Recommended):**
   - Download from: https://docs.docker.com/desktop/install/windows-install/
   - Requires Windows 10/11 with WSL2
   
2. **Using Chocolatey:**
   ```powershell
   choco install docker-desktop
   ```

**Verify Docker Installation:**
```bash
# Check Docker is running
docker info

# Test with hello-world
docker run hello-world
```

### Database CLI Tools (Optional)

Nizam's database connection commands (`psql`, `mysql`, `redis-cli`, `mongosh`) work in two modes:

1. **Host-installed tools** - Uses CLI tools installed on your system (faster, native)
2. **Container fallback** - Uses tools inside Docker containers (automatic fallback)

**Installation by Database:**

#### PostgreSQL Client (`psql`)
**macOS:**
```bash
# Via Homebrew
brew install postgresql
# or just the client:
brew install libpq
echo 'export PATH="/usr/local/opt/libpq/bin:$PATH"' >> ~/.zshrc
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install postgresql-client
```

**Linux (CentOS/RHEL/Fedora):**
```bash
sudo dnf install postgresql  # or: sudo yum install postgresql
```

**Windows:**
```powershell
# Via Chocolatey
choco install postgresql
# Or download from: https://www.postgresql.org/download/windows/
```

#### MySQL Client
**macOS:**
```bash
brew install mysql-client
echo 'export PATH="/usr/local/opt/mysql-client/bin:$PATH"' >> ~/.zshrc
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install mysql-client
```

**Linux (CentOS/RHEL/Fedora):**
```bash
sudo dnf install mysql  # or: sudo yum install mysql
```

**Windows:**
```powershell
choco install mysql
```

#### Redis CLI
**macOS:**
```bash
brew install redis
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install redis-tools
```

**Linux (CentOS/RHEL/Fedora):**
```bash
sudo dnf install redis  # or: sudo yum install redis
```

**Windows:**
```powershell
choco install redis-64
```

#### MongoDB Shell (`mongosh`)
**All Platforms:**
```bash
# Install via npm (requires Node.js)
npm install -g mongosh

# Or download from: https://www.mongodb.com/try/download/shell
```

**macOS:**
```bash
brew install mongosh
```

**Linux:**
```bash
# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install mongodb-mongosh
```

**Note:** If any CLI tool is not installed, Nizam automatically falls back to using the tool inside the respective Docker container. This means you can use Nizam even without installing any database CLI tools - they'll just run slower as they need to exec into containers.

### System Requirements

- **RAM:** Minimum 2GB available (4GB+ recommended for multiple services)
- **Disk Space:** At least 5GB free space for Docker images and data
- **Network:** Internet connection for pulling Docker images
- **Ports:** Default ports (5432, 3306, 6379, 27017, etc.) should be available

---

## Installation

### Install Nizam CLI

#### From GitHub Releases (Recommended)
```bash
# macOS/Linux - Download latest release
curl -L https://github.com/abdultolba/nizam/releases/latest/download/nizam-$(uname -s)-$(uname -m) -o nizam
chmod +x nizam
sudo mv nizam /usr/local/bin/

# Verify installation
nizam --version
```

#### Using Go Install
```bash
# Requires Go 1.19+ installed
go install github.com/abdultolba/nizam@latest
```

#### Build from Source
```bash
git clone https://github.com/abdultolba/nizam.git
cd nizam
go build -o nizam .
sudo mv nizam /usr/local/bin/
```

#### Verify Installation
```bash
# Check version
nizam --version

# Check Docker connectivity
nizam doctor
```

### Shell Completion (Optional)
```bash
# Bash
echo 'source <(nizam completion bash)' >> ~/.bashrc

# Zsh
echo 'source <(nizam completion zsh)' >> ~/.zshrc

# Fish
nizam completion fish | source
```

---

## Global Options

All nizam commands accept these global flags:

```bash
--config string    config file (default is .nizam.yaml)
-p, --profile string   configuration profile to use (default "dev")  
-v, --verbose          enable verbose logging
```

---

## Project Management

### `nizam init`
Initialize a new nizam configuration file in the current directory.

**Usage:**
```bash
nizam init [flags]
```

**Description:**
By default, creates a configuration with PostgreSQL, Redis, and Meilisearch. The init command always uses default values for template variables to ensure quick setup.

**Flags:**
- `--add string` - Comma-separated list of services to add instead of defaults

**Examples:**
```bash
# Initialize with default services (postgres, redis, meilisearch)
nizam init

# Initialize with custom services
nizam init --add postgres,mysql,redis
nizam init --add "mongodb, prometheus, mailhog"
```

---

## Service Management

### `nizam up`
Start one or more services defined in your configuration.

**Usage:**
```bash
nizam up [services...] [flags]
```

**Description:**
If no services are specified, all services will be started. Services are started using Docker containers with the configurations defined in your .nizam.yaml file.

**Examples:**
```bash
nizam up                    # Start all services
nizam up postgres           # Start only postgres
nizam up postgres redis     # Start postgres and redis
```

### `nizam down`
Stop all running nizam services.

**Usage:**
```bash
nizam down [flags]
```

**Description:**
Gracefully stops and removes all running nizam-managed containers.

**Examples:**
```bash
nizam down  # Stop all nizam services
```

### `nizam status`
Show the status of all nizam services.

**Usage:**
```bash
nizam status [flags]
```

**Description:**
Displays current status of all nizam-managed containers including service name, status, container ID, port mappings, and Docker image information.

**Examples:**
```bash
nizam status  # Show status of all services
```

### `nizam logs`
Show logs for a specific service.

**Usage:**
```bash
nizam logs <service> [flags]
```

**Description:**
Display logs for a specific nizam-managed service. By default, shows the last 50 lines of logs.

**Flags:**
- `-f, --follow` - Follow log output (continuously stream new logs)
- `-t, --tail string` - Number of lines to show from the end of the logs (default "50")

**Examples:**
```bash
nizam logs postgres         # Show last 50 lines of postgres logs
nizam logs redis --follow   # Follow redis logs in real-time
nizam logs mysql --tail 100 # Show last 100 lines
```

### `nizam exec`
Execute a command in a running service container.

**Usage:**
```bash
nizam exec <service> <command> [args...] [flags]
```

**Description:**
Execute commands directly in running nizam-managed service containers. This allows you to interact with services using their native command-line tools.

**Examples:**
```bash
nizam exec postgres psql -U user -d myapp
nizam exec redis redis-cli
nizam exec postgres bash
# Use -- to separate nizam flags from container command flags
nizam exec postgres -- psql -U user -d myapp
```

### `nizam add`
Add a service from a template to your configuration.

**Usage:**
```bash
nizam add <template> [flags]
```

**Description:**
Add a service from a built-in template to your .nizam.yaml configuration. For templates with customizable variables, you'll be prompted to configure ports, credentials, and other settings interactively.

**Flags:**
- `-n, --name string` - Custom name for the service (default: template name)
- `--overwrite` - Overwrite existing service with the same name
- `--defaults` - Skip interactive prompts and use default values

**Examples:**
```bash
nizam add postgres                    # Add PostgreSQL with interactive configuration
nizam add postgres --defaults         # Add PostgreSQL with default values  
nizam add redis --name cache          # Add Redis with custom name 'cache'
nizam add mysql --overwrite           # Replace existing MySQL service
```

### `nizam remove` / `nizam rm`
Remove services from your configuration.

**Usage:**
```bash
nizam remove <service...> [flags]
```

**Description:**
Remove one or more services from your .nizam.yaml configuration. This command will stop the service if it's running and remove it from the configuration file.

**Flags:**
- `-f, --force` - Remove services without confirmation prompt
- `--all` - Remove all services from configuration

**Examples:**
```bash
nizam remove postgres                   # Remove PostgreSQL service
nizam remove redis mysql               # Remove multiple services
nizam remove --all                     # Remove all services
nizam remove postgres --force          # Remove without confirmation
```

---

## Data Lifecycle

### `nizam snapshot`
Manage database snapshots with comprehensive lifecycle operations.

#### `nizam snapshot create`
Create a snapshot of a service database.

**Usage:**
```bash
nizam snapshot create <service> [flags]
```

**Description:**
Create a point-in-time snapshot of a database. Snapshots are stored in `.nizam/snapshots/<service>/` with manifest.json and compressed database dump.

**Flags:**
- `--tag string` - Tag for the snapshot
- `--note string` - Note/description for the snapshot  
- `--compress string` - Compression type: zstd, gzip, none (default "zstd")

**Examples:**
```bash
nizam snapshot create postgres
nizam snapshot create postgres --tag "before-migration"
nizam snapshot create redis --compress gzip --note "pre-deploy state"
```

#### `nizam snapshot list`
List snapshots for services.

**Usage:**
```bash
nizam snapshot list [service] [flags]
```

**Description:**
List snapshots for a specific service or all services. Without a service argument, lists all snapshots across all services.

**Flags:**
- `--json` - Output in JSON format

**Examples:**
```bash
nizam snapshot list              # List all snapshots
nizam snapshot list postgres     # List postgres snapshots  
nizam snapshot list --json       # JSON output
```

#### `nizam snapshot restore`
Restore a snapshot for a service.

**Usage:**
```bash
nizam snapshot restore <service> [flags]
```

**Description:**
Restore a snapshot for a service. By default, restores the latest snapshot.

**Flags:**
- `--tag string` - Restore specific tag
- `--latest` - Restore latest snapshot
- `--before string` - Restore latest snapshot before timestamp (YYYY-MM-DD HH:MM)
- `--force` - Force restore even if errors occur

**Examples:**
```bash
nizam snapshot restore postgres
nizam snapshot restore postgres --tag "before-migration"  
nizam snapshot restore postgres --latest
nizam snapshot restore postgres --before "2025-08-01 12:00"
```

#### `nizam snapshot prune`
Remove old snapshots, keeping only the N most recent ones.

**Usage:**
```bash
nizam snapshot prune <service> [flags]
```

**Description:**
Remove old snapshots to manage disk space while preserving the most recent ones.

**Flags:**
- `--keep int` - Number of snapshots to keep (required)
- `--dry-run` - Show what would be removed without removing

**Examples:**
```bash
nizam snapshot prune postgres --keep 5      # Keep 5 most recent
nizam snapshot prune postgres --keep 3 --dry-run  # Dry run
```

---

## Database CLI Access

One-liner database access commands with auto-resolved connection parameters.

### `nizam psql`
Connect to PostgreSQL service with psql.

**Usage:**
```bash
nizam psql [service] [-- psql-args...] [flags]
```

**Description:**
Connect to a PostgreSQL service using psql with auto-resolved connection parameters. If no service is specified, uses the first PostgreSQL service found.

**Flags:**
- `--db string` - Database name (override config)
- `--user string` - Username (override config)

**Examples:**
```bash
nizam psql                              # Connect to first PostgreSQL service
nizam psql postgres                     # Connect to specific service
nizam psql api-db -- --help            # Pass args to psql
nizam psql postgres -- -c "SELECT version()"
nizam psql --user admin --db production
```

### `nizam mysql`
Connect to MySQL service with auto-resolved credentials.

**Usage:**
```bash
nizam mysql [service] [-- mysql_args...] [flags]
```

**Description:**
Connect to a MySQL database service with automatically resolved connection parameters. Auto-discovers MySQL services and extracts connection details from configuration.

**Flags:**
- `--user string` - Username override
- `--db string` / `--database string` - Database name override

**Examples:**
```bash
nizam mysql                          # Connect to first MySQL service
nizam mysql mydb                     # Connect to specific service
nizam mysql --user root --db mysql   # Override connection parameters
nizam mysql -- --help               # Pass arguments to mysql client
nizam mysql -- -e "SHOW DATABASES"  # Execute SQL directly
```

### `nizam redis-cli`
Connect to Redis service with redis-cli.

**Usage:**
```bash
nizam redis-cli [service] [-- redis-cli-args...] [flags]
```

**Description:**
Connect to a Redis service using redis-cli with auto-resolved connection parameters. If no service is specified, uses the first Redis service found.

**Examples:**
```bash
nizam redis-cli                     # Connect to first Redis service
nizam redis-cli redis               # Connect to specific service  
nizam redis-cli cache -- --help     # Pass args to redis-cli
nizam redis-cli redis -- ping       # Execute redis commands
```

### `nizam mongosh`
Connect to MongoDB service with auto-resolved credentials.

**Usage:**
```bash
nizam mongosh [service] [-- mongosh_args...] [flags]
```

**Description:**
Connect to a MongoDB database service with automatically resolved connection parameters. Auto-discovers MongoDB services and extracts connection details from configuration.

**Flags:**
- `--user string` - Username override  
- `--db string` / `--database string` - Database name override

**Examples:**
```bash
nizam mongosh                        # Connect to first MongoDB service  
nizam mongosh mydb                   # Connect to specific service
nizam mongosh --user admin --db app  # Override connection parameters
nizam mongosh -- --help             # Pass arguments to mongosh client
nizam mongosh -- --eval "db.version()" # Execute JavaScript directly
```

---

## Health & Monitoring

### `nizam health`
Check health status of services.

**Usage:**
```bash
nizam health [service] [flags]
```

**Description:**
Check the health status of services managed by nizam using multiple check types including command execution, HTTP requests, and Docker status checks.

**Flags:**
- `-o, --output string` - Output format (table, json, compact) (default "table")
- `-w, --watch` - Watch health status continuously
- `--interval int` - Watch interval in seconds (default 10)

**Examples:**
```bash
nizam health                    # Check health of all services
nizam health postgres          # Check health of postgres service
nizam health --output json     # Output health status in JSON format
nizam health --watch           # Watch health status continuously
nizam health --watch --interval 5  # Watch with 5 second intervals
```

### `nizam health-server`
Start the health check HTTP server.

**Usage:**
```bash
nizam health-server [flags]
```

**Description:**
Start the health check HTTP server that provides REST API endpoints and a web dashboard for monitoring service health.

**Flags:**
- `--address string` - HTTP server address to bind to (default ":8080")
- `--interval int` - Health check interval in seconds (default 30)
- `--auto-start` - Automatically start health checking (default true)

**API Endpoints:**
- `GET /api/health` - Health summary
- `GET /api/services` - All services health  
- `GET /api/services/{service}` - Specific service health
- `POST /api/check/{service}` - Trigger health check

**Examples:**
```bash
nizam health-server                           # Start server on :8080
nizam health-server --address :9090          # Start server on port 9090  
nizam health-server --interval 15            # Check health every 15 seconds
nizam health-server --no-auto-start          # Don't auto-start health checking
```

---

## Development & Operations

### `nizam doctor`
Run preflight checks and suggest fixes.

**Usage:**
```bash
nizam doctor [flags]
```

**Description:**
Run preflight checks to ensure your Docker environment is ready for nizam. Checks Docker daemon connectivity, Docker Compose plugin availability, disk space, network MTU, and port conflicts.

**Flags:**
- `--json` - Output JSON format
- `--verbose` - Verbose output
- `--fix` - Attempt supported automatic fixes
- `--skip string` - Comma-separated check IDs to skip

**Examples:**
```bash
nizam doctor                    # Run all checks
nizam doctor --skip net.mtu,disk.free  # Skip specific checks
nizam doctor --json            # Output as JSON
nizam doctor --fix             # Attempt automatic fixes
```

### `nizam validate`
Validate configuration file.

**Usage:**
```bash
nizam validate [flags]
```

**Description:**
Validate the nizam configuration file for syntax and basic structure.

**Flags:**
- `--json` - Output JSON format
- `--strict` - Exit non-zero on validation failure
- `--file string` - Config file to validate (default: .nizam.yaml)

**Examples:**
```bash
nizam validate                      # Validate default config
nizam validate --file ./config.yaml # Validate specific file
nizam validate --json              # JSON output
nizam validate --strict            # Strict mode
```

### `nizam lint`
Lint configuration for best practices.

**Usage:**
```bash
nizam lint [flags]
```

**Description:**
Lint the nizam configuration file to check for best practices and potential issues. Applies rules to check for image tags, port mapping format, and resource limit recommendations.

**Flags:**
- `--json` - Output JSON format
- `--file string` - Config file to lint (default: .nizam.yaml)

**Examples:**
```bash
nizam lint                      # Lint default config file
nizam lint --file ./config.yaml # Lint specific file  
nizam lint --json              # JSON output
```

### `nizam wait-for` / `nizam wait`
Wait for services to become ready.

**Usage:**
```bash
nizam wait-for [service...] [flags]
```

**Description:**
Wait for one or more services to become ready before proceeding. Checks service readiness by attempting to connect to configured ports or health check endpoints.

**Flags:**
- `--timeout string` - Maximum time to wait for services (default "30s")
- `--interval string` - Interval between readiness checks (default "1s")

**Examples:**
```bash
nizam wait-for database                    # Wait for database service
nizam wait-for web database --timeout 60s # Wait with custom timeout
nizam wait-for                            # Wait for all services
```

### `nizam retry`
Retry a failed command with exponential backoff.

**Usage:**
```bash
nizam retry [command] [flags]
```

**Description:**
Retry a failed nizam command with configurable attempts and delay. Uses exponential backoff between attempts and is useful for handling transient failures.

**Flags:**
- `--attempts int` - Maximum number of retry attempts (default 3)
- `--delay string` - Initial delay between retries with exponential backoff (default "1s")

**Supported Operations:**
- `start` - Retry starting services
- `stop` - Retry stopping services  
- `restart` - Retry restarting services
- `pull` - Retry pulling images
- `build` - Retry building images

**Examples:**
```bash
nizam retry start --attempts 5        # Retry starting up to 5 times
nizam retry start --delay 2s          # Retry with custom initial delay
nizam retry start web database --attempts 3  # Retry specific services
```

### `nizam update`
Update nizam to the latest version.

**Usage:**
```bash
nizam update [flags]
```

**Description:**
Update nizam to the latest version from GitHub releases. Downloads and installs the latest stable release, replacing the current binary.

**Flags:**
- `--check` - Only check for updates, don't install
- `--prerelease` - Include prerelease versions

**Examples:**
```bash
nizam update --check           # Check for updates without installing
nizam update                   # Update to latest stable version  
nizam update --prerelease      # Include prerelease versions
```

---

## Template Management

### `nizam templates`
List available service templates.

**Usage:**
```bash
nizam templates [flags]
```

**Description:**
List all available service templates that can be used with 'nizam add'. Templates provide pre-configured service definitions for popular services.

**Flags:**
- `-t, --tag string` - Filter templates by tag (e.g., database, monitoring)
- `--show-tags` - Show all available tags

**Examples:**
```bash
nizam templates                    # List all templates
nizam templates --tag database     # Filter by database tag
nizam templates --show-tags        # Show all available tags
```

### `nizam export`
Export a service configuration as a custom template.

**Usage:**
```bash
nizam export <service> [flags]
```

**Description:**
Export an existing service configuration from your .nizam.yaml as a custom template. Allows you to save and reuse service configurations across different projects.

**Flags:**
- `-n, --name string` - Name for the template (default: service name)
- `-d, --description string` - Description for the template
- `-t, --tags strings` - Tags for the template (comma-separated)

**Examples:**
```bash
nizam export mysql --name my-mysql --description "Custom MySQL setup"
nizam export postgres --tags database,custom,company
```

### `nizam custom`
Manage custom templates.

**Description:**
Manage custom service templates including deleting, viewing, and listing custom templates stored in `~/.nizam/templates/`.

#### `nizam custom list`
List custom templates only.

**Usage:**
```bash
nizam custom list [flags]
```

**Examples:**
```bash
nizam custom list  # List only custom templates
```

#### `nizam custom show`
Show detailed information about a template.

**Usage:**
```bash
nizam custom show <template-name> [flags]
```

**Examples:**
```bash
nizam custom show my-mysql  # Show detailed template info
```

#### `nizam custom delete`
Delete a custom template.

**Usage:**
```bash
nizam custom delete <template-name> [flags]
```

**Examples:**
```bash
nizam custom delete my-mysql  # Delete custom template
```

#### `nizam custom dir`
Show the custom templates directory path.

**Usage:**
```bash
nizam custom dir [flags]
```

**Examples:**
```bash
nizam custom dir  # Show templates directory path
```

---

## System Utilities

### `nizam completion`
Generate shell completion scripts.

**Usage:**
```bash
nizam completion [bash|zsh|fish|powershell] [flags]
```

**Description:**
Generate shell completion scripts for nizam. The completion script must be sourced to be used.

**Supported Shells:**
- `bash` - Bash completion
- `zsh` - Zsh completion  
- `fish` - Fish completion
- `powershell` - PowerShell completion

**Examples:**
```bash
# Bash completion (add to ~/.bashrc)
source <(nizam completion bash)
echo 'source <(nizam completion bash)' >> ~/.bashrc

# Zsh completion (add to ~/.zshrc)
source <(nizam completion zsh)  
echo 'source <(nizam completion zsh)' >> ~/.zshrc

# Fish completion
nizam completion fish | source

# PowerShell completion
nizam completion powershell | Out-String | Invoke-Expression
```

---

## Configuration File Format

Nizam uses a `.nizam.yaml` file to define your services:

```yaml
profile: dev
services:
  postgres:
    image: postgres:16
    ports:
      - 5432:5432
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: myapp
    volume: pgdata
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "user"]
      interval: 30s
      timeout: 10s
      retries: 3

  redis:
    image: redis:7
    ports:
      - 6379:6379

  mongodb:
    image: mongo:7
    ports:
      - 27017:27017
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
      MONGO_INITDB_DATABASE: myapp
```

## Common Workflows

### Initial Setup
```bash
# Initialize a new project
nizam init

# Or initialize with specific services
nizam init --add postgres,redis,mongodb

# Start all services
nizam up

# Check status
nizam status
```

### Development Workflow
```bash
# Start specific services for development
nizam up postgres redis

# Monitor health
nizam health --watch

# View logs
nizam logs postgres --follow

# Connect to database
nizam psql
nizam mysql
nizam mongosh

# Execute commands in containers
nizam exec postgres psql -U user
```

### Data Management
```bash
# Create database snapshots
nizam snapshot create postgres --tag "before-migration"
nizam snapshot create mongodb --note "pre-deploy state"

# List snapshots
nizam snapshot list

# Restore snapshots
nizam snapshot restore postgres --latest
nizam snapshot restore postgres --tag "before-migration"

# Clean up old snapshots
nizam snapshot prune postgres --keep 5
```

### Operations & Monitoring
```bash
# Run environment checks
nizam doctor

# Validate configuration
nizam validate

# Lint configuration for best practices
nizam lint

# Wait for services to be ready
nizam wait-for database

# Start health monitoring server
nizam health-server --address :8080
```

### Template Management
```bash
# Browse available templates
nizam templates
nizam templates --tag database

# Add services from templates
nizam add postgres
nizam add mysql --defaults
nizam add redis --name cache

# Export custom templates
nizam export mysql --name company-mysql

# Manage custom templates
nizam custom list
nizam custom show company-mysql
```

---

## Supported Database Engines

| Engine | Snapshot Support | CLI Access | Health Checks |
|--------|------------------|------------|---------------|
| PostgreSQL | ✅ | ✅ (`nizam psql`) | ✅ |
| MySQL | ✅ | ✅ (`nizam mysql`) | ✅ |
| Redis | ✅ | ✅ (`nizam redis-cli`) | ✅ |
| MongoDB | ✅ | ✅ (`nizam mongosh`) | ✅ |

## Built-in Service Templates

**Databases:**
- `postgres` / `postgres-15` - PostgreSQL database
- `mysql` - MySQL database  
- `mongodb` - MongoDB document database
- `redis` / `redis-stack` - Redis cache and data store
- `elasticsearch` - Elasticsearch search engine

**Messaging & Streaming:**
- `rabbitmq` - RabbitMQ message broker
- `kafka` - Apache Kafka (via Redpanda)
- `nats` - NATS messaging system

**Monitoring & Observability:**
- `prometheus` - Prometheus metrics collection
- `grafana` - Grafana visualization
- `jaeger` - Distributed tracing

**Storage & Search:**
- `minio` - S3-compatible object storage
- `meilisearch` - Fast search engine

**Development Tools:**
- `mailhog` - Email testing

---

## Example Outputs

This section shows typical command outputs to help you understand what to expect when using Nizam.

### Successful Operations

#### `nizam init` - Default Initialization
```bash
$ nizam init
✓ Created .nizam.yaml with default services (postgres, redis, meilisearch)
✓ Configuration initialized successfully

Next steps:
  nizam up        # Start all services
  nizam status    # Check service status
  nizam psql      # Connect to PostgreSQL
```

#### `nizam up` - Starting Services
```bash
$ nizam up
✓ Starting postgres... [postgres:16]
✓ Starting redis... [redis:7]
✓ Starting meilisearch... [getmeili/meilisearch:latest]

🚀 All services started successfully!

Services running:
  postgres    → localhost:5432
  redis       → localhost:6379  
  meilisearch → localhost:7700
```

#### `nizam status` - Service Overview
```bash
$ nizam status
┌─────────────┬─────────┬──────────────┬─────────────────┬──────────────────┐
│ SERVICE     │ STATUS  │ CONTAINER    │ PORTS           │ IMAGE            │
├─────────────┼─────────┼──────────────┼─────────────────┼──────────────────┤
│ postgres    │ Running │ postgres_dev │ 0.0.0.0:5432    │ postgres:16      │
│ redis       │ Running │ redis_dev    │ 0.0.0.0:6379    │ redis:7          │
│ meilisearch │ Running │ meili_dev    │ 0.0.0.0:7700    │ getmeili/meil... │
└─────────────┴─────────┴──────────────┴─────────────────┴──────────────────┘

3 services running | 0 stopped
```

#### `nizam health` - Health Check Results
```bash
$ nizam health
┌─────────────┬────────┬─────────────┬─────────────────────────────────┐
│ SERVICE     │ STATUS │ RESPONSE    │ DETAILS                         │
├─────────────┼────────┼─────────────┼─────────────────────────────────┤
│ postgres    │ ✓ UP   │ 12ms        │ accepting connections           │
│ redis       │ ✓ UP   │ 3ms         │ ready to accept connections     │
│ meilisearch │ ✓ UP   │ 45ms        │ HTTP 200 /health               │
└─────────────┴────────┴─────────────┴─────────────────────────────────┘

Overall Status: ✓ HEALTHY (3/3 services up)
```

#### `nizam templates` - Available Templates
```bash
$ nizam templates
┌─────────────┬──────────────────────────┬─────────────────────────┐
│ NAME        │ DESCRIPTION              │ TAGS                    │
├─────────────┼──────────────────────────┼─────────────────────────┤
│ postgres    │ PostgreSQL Database      │ database, sql           │
│ mysql       │ MySQL Database           │ database, sql           │
│ redis       │ Redis Cache              │ cache, database, nosql  │
│ mongodb     │ MongoDB Database         │ database, nosql         │
│ rabbitmq    │ RabbitMQ Message Broker  │ messaging, queue        │
│ prometheus  │ Metrics Collection       │ monitoring, metrics     │
│ grafana     │ Metrics Visualization    │ monitoring, dashboard   │
│ meilisearch │ Fast Search Engine       │ search, fulltext        │
│ minio       │ S3-Compatible Storage    │ storage, s3, object     │
│ mailhog     │ Email Testing Tool       │ email, development      │
└─────────────┴──────────────────────────┴─────────────────────────┘

10 templates available
Use: nizam add <template-name>
```

#### `nizam snapshot list` - Snapshot Overview
```bash
$ nizam snapshot list
┌──────────┬─────────────────────┬─────────────────┬────────────┬────────┐
│ SERVICE  │ TIMESTAMP           │ TAG             │ SIZE       │ NOTE   │
├──────────┼─────────────────────┼─────────────────┼────────────┼────────┤
│ postgres │ 2025-08-12 14:30:25 │ before-deploy   │ 2.1 MB     │        │
│ postgres │ 2025-08-12 12:15:18 │                 │ 1.8 MB     │        │
│ postgres │ 2025-08-11 16:45:32 │ migration-test  │ 1.9 MB     │        │
│ redis    │ 2025-08-12 14:30:30 │ before-deploy   │ 156 KB     │        │
│ redis    │ 2025-08-12 09:22:14 │                 │ 134 KB     │        │
└──────────┴─────────────────────┴─────────────────┴────────────┴────────┘

5 snapshots across 2 services
```

#### `nizam doctor` - System Health Check
```bash
$ nizam doctor
🔍 Running system diagnostics...

✓ Docker daemon connectivity
✓ Docker Compose plugin available
✓ Docker version 24.0.6 (compatible)
✓ Available disk space: 45.2 GB
✓ Network MTU configuration
✓ Port availability check
✓ Memory usage: 3.2/16 GB (20%)

🎉 System ready for Nizam!

Recommendations:
  • Consider enabling Docker BuildKit for faster builds
  • Update to Docker 24.0.7+ for latest security fixes
```

### Database CLI Connection Examples

#### `nizam psql` - PostgreSQL Connection
```bash
$ nizam psql
✓ Connecting to postgres service (localhost:5432)
✓ Using database: myapp, user: user

psql (16.1)
Type "help" for help.

myapp=# SELECT version();
                                version                                
------------------------------------------------------------------------
 PostgreSQL 16.1 on x86_64-pc-linux-gnu, compiled by gcc 12.2.0, 64-bit
(1 row)

myapp=# \dt
List of relations
 Schema │ Name  │ Type  │ Owner 
────────┼───────┼───────┼───────
 public │ users │ table │ user
(1 row)
```

#### `nizam redis-cli` - Redis Connection
```bash
$ nizam redis-cli
✓ Connecting to redis service (localhost:6379)

127.0.0.1:6379> ping
PONG
127.0.0.1:6379> info server
# Server
redis_version:7.2.3
redis_git_sha1:00000000
redis_git_dirty:0
127.0.0.1:6379> keys *
1) "session:abc123"
2) "cache:users:list"
```

### Error Examples

#### Docker Not Running
```bash
$ nizam up
❌ Error: Cannot connect to Docker daemon

Docker daemon is not running or not accessible.

Solutions:
  • Start Docker Desktop (macOS/Windows)
  • Run: sudo systemctl start docker (Linux)
  • Check Docker daemon status: docker info
  • Ensure user is in docker group: sudo usermod -aG docker $USER

For help: nizam doctor
```

#### Port Already in Use
```bash
$ nizam up postgres
❌ Error starting postgres: Port 5432 is already in use

Another process is using port 5432.

Solutions:
  • Stop the conflicting service
  • Check what's using the port: lsof -i :5432
  • Change port in .nizam.yaml:
    ports:
      - "5433:5432"  # Use port 5433 instead

For system checks: nizam doctor
```

#### Service Configuration Error
```bash
$ nizam validate
❌ Configuration validation failed

Errors found:
  • services.postgres.image: cannot be empty
  • services.redis.ports[0]: invalid format "6379" (should be "host:container")
  
Warnings:
  • services.mysql.environment.MYSQL_ROOT_PASSWORD: using default password

Fix these issues in .nizam.yaml
```

#### Snapshot Not Found
```bash
$ nizam snapshot restore postgres --tag "nonexistent"
❌ Error: Snapshot not found

No snapshot found for service 'postgres' with tag 'nonexistent'

Available snapshots:
  • 2025-08-12 14:30:25 (tag: before-deploy)
  • 2025-08-12 12:15:18 (no tag)
  • 2025-08-11 16:45:32 (tag: migration-test)

Use: nizam snapshot list postgres
```

---

## Common Issues & Troubleshooting

### Docker-Related Issues

#### "Cannot connect to Docker daemon"
**Problem:** Docker daemon is not running or not accessible.

**Solutions:**
```bash
# Check Docker status
docker info

# Start Docker (Linux)
sudo systemctl start docker

# Start Docker Desktop (macOS/Windows)
# Use Docker Desktop app

# Add user to docker group (Linux)
sudo usermod -aG docker $USER
# Then log out and back in
```

#### "Port already in use"
**Problem:** Another service is using the required port.

**Solutions:**
```bash
# Find what's using the port
lsof -i :5432  # Replace 5432 with your port
netstat -tulnp | grep :5432

# Kill the conflicting process
sudo kill -9 <PID>

# Or change port in .nizam.yaml
services:
  postgres:
    ports:
      - "5433:5432"  # Use different host port
```

#### "No space left on device"
**Problem:** Insufficient disk space for Docker images/containers.

**Solutions:**
```bash
# Check disk usage
df -h

# Clean Docker resources
docker system prune -a
docker volume prune
docker image prune -a

# Check Docker disk usage
docker system df
```

### Configuration Issues

#### "Service failed to start"
**Problem:** Service container fails to start due to configuration errors.

**Diagnosis:**
```bash
# Check service logs
nizam logs <service-name>

# Validate configuration
nizam validate

# Run system checks
nizam doctor

# Check Docker container status
docker ps -a
```

#### "Invalid .nizam.yaml format"
**Problem:** YAML syntax errors or invalid configuration.

**Solutions:**
```bash
# Validate configuration
nizam validate --strict

# Lint for best practices
nizam lint

# Check YAML syntax online or use:
yamllint .nizam.yaml
```

### Database Connection Issues

#### "Connection refused" when using database CLI commands
**Problem:** Database service is not running or not ready.

**Solutions:**
```bash
# Check service status
nizam status
nizam health postgres

# Wait for service to be ready
nizam wait-for postgres

# Check service logs
nizam logs postgres

# Restart service
nizam down && nizam up postgres
```

#### "psql/mysql/mongosh command not found" 
**Problem:** Database CLI tool not installed on host system.

**Expected Behavior:** Nizam automatically falls back to using the tool inside the Docker container.

**Manual Installation:**
```bash
# PostgreSQL client
brew install libpq          # macOS
sudo apt install postgresql-client  # Ubuntu/Debian

# MySQL client  
brew install mysql-client   # macOS
sudo apt install mysql-client       # Ubuntu/Debian

# Redis CLI
brew install redis          # macOS
sudo apt install redis-tools        # Ubuntu/Debian

# MongoDB Shell
npm install -g mongosh      # All platforms
brew install mongosh        # macOS
```

### Performance Issues

#### "Services starting slowly"
**Problem:** Docker image pulls or container startup takes too long.

**Solutions:**
```bash
# Pre-pull images
docker compose -f .nizam/docker-compose.yml pull

# Check system resources
nizam doctor

# Use lighter images or specific versions
# Edit .nizam.yaml:
services:
  postgres:
    image: postgres:16-alpine  # Lighter Alpine version
```

#### "High memory usage"
**Problem:** Multiple services consuming too much RAM.

**Solutions:**
```bash
# Check resource usage
docker stats

# Limit service resources in .nizam.yaml:
services:
  postgres:
    deploy:
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 256M

# Start only needed services
nizam up postgres redis  # Don't start all services
```

### Snapshot Issues

#### "Snapshot creation fails"
**Problem:** Insufficient permissions or disk space for snapshots.

**Solutions:**
```bash
# Check available disk space
df -h

# Check .nizam directory permissions
ls -la .nizam/snapshots/

# Manually create snapshot directory
mkdir -p .nizam/snapshots/<service-name>

# Try with different compression
nizam snapshot create postgres --compress gzip
nizam snapshot create postgres --compress none
```

#### "Snapshot restore fails"
**Problem:** Corrupted snapshot or incompatible database version.

**Solutions:**
```bash
# Check snapshot integrity
nizam snapshot list postgres

# Try forcing restore
nizam snapshot restore postgres --force

# Restore different snapshot
nizam snapshot restore postgres --tag "working-backup"

# Manual database restore (last resort)
nizam exec postgres -- pg_restore -U user -d myapp /snapshots/backup.sql
```

### Environment-Specific Issues

#### macOS: "Docker Desktop not installed"
**Problem:** Docker Desktop required but not installed.

**Solutions:**
```bash
# Install via Homebrew
brew install --cask docker

# Or download directly
open https://docs.docker.com/desktop/install/mac-install/

# Alternative: Use Colima
brew install colima docker docker-compose
colima start
```

#### Windows: "WSL2 backend error"
**Problem:** Docker Desktop requires WSL2 but it's not properly configured.

**Solutions:**
```powershell
# Enable WSL2
wsl --install

# Update WSL2 kernel
wsl --update

# Set default WSL version
wsl --set-default-version 2

# Restart Docker Desktop
```

#### Linux: "Permission denied"
**Problem:** User not in docker group or systemd issues.

**Solutions:**
```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Apply group changes immediately
newgrp docker

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Check Docker socket permissions
sudo chmod 666 /var/run/docker.sock  # Temporary fix
```

### Getting Help

#### Built-in Diagnostics
```bash
# Run comprehensive system checks
nizam doctor

# Validate your configuration
nizam validate --strict

# Check service health
nizam health --output json

# View detailed logs
nizam logs <service> --tail 100
```

#### Debug Mode
```bash
# Enable verbose logging
nizam --verbose up
nizam --verbose status

# Check Docker Compose files
cat .nizam/docker-compose.yml
```

#### Community Support
- **GitHub Issues:** [Report bugs](https://github.com/abdultolba/nizam/issues)
- **Discussions:** [Community forum](https://github.com/abdultolba/nizam/discussions)
- **Documentation:** [Official docs](https://github.com/abdultolba/nizam#readme)

---

For more information and updates, visit the [Nizam GitHub repository](https://github.com/abdultolba/nizam).
