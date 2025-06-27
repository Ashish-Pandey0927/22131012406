// logger.ts
import axios from 'axios';

const LOG_API_URL = 'http://20.244.56.144/evaluation-service/logs';

// Accepted values
const STACKS = ['backend', 'frontend'];
const LEVELS = ['debug'];
const BACKEND_PACKAGES = ['cache', 'controller', 'cron_job', 'db', 'domain', 'handler', 'repository', 'route', 'service'];
const FRONTEND_PACKAGES = ['api', 'component', 'hook', 'page', 'state', 'style'];
const SHARED_PACKAGES = ['auth', 'config', 'middleware', 'utils'];

function isPackageValid(stack: string, pkg: string): boolean {
  if (SHARED_PACKAGES.includes(pkg)) return true;
  if (stack === 'backend') return BACKEND_PACKAGES.includes(pkg);
  if (stack === 'frontend') return FRONTEND_PACKAGES.includes(pkg);
  return false;
}

export async function Log(stack: string, level: string, pkg: string, message: string): Promise<void> {
  if (!STACKS.includes(stack)) {
    console.warn('Invalid stack');
    return;
  }
  if (!LEVELS.includes(level)) {
    console.warn('Invalid level');
    return;
  }
  if (!isPackageValid(stack, pkg)) {
    console.warn('Invalid package for given stack');
    return;
  }

  try {
    await axios.post(LOG_API_URL, { stack, level, package: pkg, message });
    console.log(`[Logged] ${level.toUpperCase()} | ${stack} | ${pkg} → ${message}`);
  } catch (err) {
    console.error('Failed to send log:', err.message);
  }
}
