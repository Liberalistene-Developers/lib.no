# Enonic Sandbox Setup for Development

This guide covers setting up an optimized Enonic XP sandbox for development with clean, readable logs.

## Creating a New Sandbox

```bash
# Create a new sandbox with XP 7.15.4
enonic sandbox create libno -v 7.15.4

# Set it as the default sandbox (optional)
enonic sandbox set-default libno
```

## Virtual Host Configuration

Configure virtual hosts (vhost) to enable convenient localhost access and proper API routing.

### Required Mappings

Create or update the vhost configuration file:

**File:** `~/.enonic/sandboxes/libno/home/config/com.enonic.xp.web.vhost.cfg`

```properties
enabled = true

# Guillotine API access - must be before site mapping
mapping.api.host = localhost
mapping.api.source = /api
mapping.api.target = /site/default
mapping.api.idProvider.system = default

# Admin access
mapping.admin.host = localhost
mapping.admin.source = /admin
mapping.admin.target = /admin
mapping.admin.idProvider.system = default

# Liberalistene site - localhost access (catch-all must be last)
mapping.site.host = localhost
mapping.site.source = /
mapping.site.target = /site/default/master/liberalistene-hovedside
mapping.site.idProvider.system = default
```

### Why These Mappings?

1. **`mapping.api`** - Routes `/api` to Guillotine GraphQL endpoint at project level
   - Required for dynamic article and event list loading
   - Must be defined before the site catch-all mapping
   - Used by ArticleListProcessor and EventListProcessor
   - Code gets branch from execution context and constructs endpoint as `/api/${branch}`

2. **`mapping.admin`** - Preserves Content Studio access at `/admin`
   - Without this, the site catch-all would capture admin requests

3. **`mapping.site`** - Main site accessible at root `/`
   - Convenience mapping: `http://localhost:8080/` instead of long URL
   - Must be last (most generic match)

### URL Access After Configuration

With vhost enabled, you can access:

- **Main site:** `http://localhost:8080/`
- **Guillotine API (master):** `http://localhost:8080/api/master` (POST requests)
- **Guillotine API (draft):** `http://localhost:8080/api/draft` (POST requests)
- **Content Studio:** `http://localhost:8080/admin`

Without vhost, you would need:
- **Main site:** `http://localhost:8080/site/default/master/liberalistene-hovedside`
- **Guillotine API:** `http://localhost:8080/site/default/master` or `http://localhost:8080/site/default/draft`

### Apply Vhost Changes

Restart the sandbox for vhost configuration to take effect:

```bash
enonic sandbox stop libno && enonic sandbox start libno
```

**Note:** Unlike logback.xml, vhost configuration does not auto-reload. A sandbox restart is required.

## Log Optimization

After creating the sandbox, optimize the logging configuration to reduce noise and make logs easier to read during development.

### 1. Disable Audit Logging (Snapshotter)

The audit system creates frequent snapshot messages that clutter the logs.

**File:** `~/.enonic/sandboxes/libno/home/config/com.enonic.xp.audit.cfg`

```properties
enabled = false
# outputLogs = false
# ageThreshold =
```

### 2. Suppress Elasticsearch Warnings

Elasticsearch logs JNA warnings that are harmless in development but create noise.

**File:** `~/.enonic/sandboxes/libno/home/config/logback.xml`

Add this logger configuration before the closing `</configuration>` tag:

```xml
  <logger name="org.elasticsearch.bootstrap" level="ERROR" additivity="false">
    <appender-ref ref="STDOUT"/>
    <appender-ref ref="FILE"/>
  </logger>
```

**Complete optimized logback.xml:**

```xml
<?xml version="1.0"?>
<configuration scan="true" scanPeriod="60 seconds">

  <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <file>${xp.home}/logs/server.log</file>
    <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
      <fileNamePattern>${xp.home}/logs/server.%d{yyyy-MM-dd}.%i.log</fileNamePattern>
      <maxFileSize>100MB</maxFileSize>
      <maxHistory>7</maxHistory>
      <totalSizeCap>3GB</totalSizeCap>
    </rollingPolicy>
    <encoder>
      <pattern>%d{HH:mm:ss.SSS} %-5level %logger{36} - %msg%n</pattern>
    </encoder>
  </appender>

  <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
    <withJansi>true</withJansi>
    <encoder>
      <pattern>%date{ISO8601} %highlight(%-5level) %cyan(%logger{36}) - %msg%n</pattern>
    </encoder>
  </appender>

  <root level="info">
    <appender-ref ref="STDOUT"/>
    <appender-ref ref="FILE"/>
  </root>

  <logger name="Events.Service" level="WARN" additivity="false">
    <appender-ref ref="STDOUT"/>
    <appender-ref ref="FILE"/>
  </logger>

  <logger name="Events.Bundle" level="WARN" additivity="false">
    <appender-ref ref="STDOUT"/>
    <appender-ref ref="FILE"/>
  </logger>

  <logger name="org.elasticsearch.bootstrap" level="ERROR" additivity="false">
    <appender-ref ref="STDOUT"/>
    <appender-ref ref="FILE"/>
  </logger>

</configuration>
```

### 3. Apply Changes

Restart the sandbox to apply the configuration changes:

```bash
enonic sandbox stop
enonic sandbox start
```

Or if using continuous deployment:

```bash
npm run watch
```

The logback.xml configuration will auto-reload within 60 seconds, but audit config requires a restart.

## Benefits

After these optimizations, your logs will be much cleaner:

- ✅ No snapshotter scheduling messages
- ✅ No Elasticsearch JNA warnings and stack traces
- ✅ No bundle uninstall errors during hot-deploy
- ✅ Focus only on your application's output and real errors

## Development Workflow

```bash
# Deploy and watch for changes
npm run watch

# Clean build + watch
npm run rewatch

# One-time deploy
npm run deploy
```

## Troubleshooting

### Bundle Uninstall Errors

You may still see occasional "bundle is uninstalled" errors during hot-deploy. These are harmless timing issues when Felix (OSGi framework) removes the old version before installing the new one. They can be safely ignored during development.

### Logback Changes Not Applied

The logback.xml has a 60-second scan period. Wait a minute or restart the sandbox:

```bash
enonic sandbox stop && enonic sandbox start
```

## Additional Resources

- [Enonic XP Documentation](https://developer.enonic.com/docs)
- [Enonic CLI Documentation](https://developer.enonic.com/docs/enonic-cli)
- [Logback Configuration](http://logback.qos.ch/manual/configuration.html)
