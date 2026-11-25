import {defineConfig, devices} from '@playwright/test';
import {FRONTEND_AUTH} from './fixtures/frontend';
import * as fs from 'fs';
import * as path from 'path';

/**
 * The login of the frontend tests: locally from e2e/.env (gitignored, see e2e/.env.example), in a pipeline from
 * the secret environment variables E2E_USERNAME and E2E_PASSWORD (the variables win over the file).
 */
const ENV_FILE = path.join(__dirname, '.env');
if (fs.existsSync(ENV_FILE)) {
    // Node 21.7+, the types of the repository are older
    (process as any).loadEnvFile(ENV_FILE);
}

const EXAMPLE_PORT = Number(process.env['E2E_EXAMPLE_PORT'] ?? 4301);
const FRONTEND_URL = process.env['E2E_FRONTEND_URL'] ?? 'http://localhost:4200';

/** the playground is started only when its tests run (not for `--project=frontend`) */
const projectArgs = process.argv.filter(arg => arg.startsWith('--project='));
const runsExample = projectArgs.length === 0 || projectArgs.includes('--project=example');

/**
 * End to end tests of the libraries.
 * - `example`: the components playground (netgrif-example) with its mock engine, no backend is needed.
 *   The libraries have to be built and linked first (npm run ncc:local-build, npm run nc:local-build).
 * - `frontend`: netgrif-frontend with a running engine (the NAE tests). The engine and `npm run frontend:start`
 *   are started by hand, the login is read from E2E_USERNAME and E2E_PASSWORD (never committed), see
 *   frontend/auth.setup.ts.
 */
export default defineConfig({
    testDir: '.',
    outputDir: '../test-results',
    fullyParallel: true,
    forbidOnly: !!process.env['CI'],
    retries: process.env['CI'] ? 1 : 0,
    reporter: [['list'], ['html', {outputFolder: '../playwright-report', open: 'never'}]],
    use: {
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'example',
            testDir: './example',
            use: {...devices['Desktop Chrome'], baseURL: `http://localhost:${EXAMPLE_PORT}`},
        },
        {
            name: 'frontend-setup',
            testDir: './frontend',
            testMatch: /.*\.setup\.ts/,
            use: {...devices['Desktop Chrome'], baseURL: FRONTEND_URL},
        },
        {
            name: 'frontend',
            testDir: './frontend',
            dependencies: ['frontend-setup'],
            use: {
                ...devices['Desktop Chrome'], baseURL: FRONTEND_URL, storageState: FRONTEND_AUTH,
                // E2E_SLOWMO=500 with --headed to watch a test click through the application
                launchOptions: {slowMo: Number(process.env['E2E_SLOWMO'] ?? 0)},
            },
        },
    ],
    webServer: !runsExample ? undefined : {
        command: `npm run example:start -- --port ${EXAMPLE_PORT}`,
        cwd: '..',
        url: `http://localhost:${EXAMPLE_PORT}`,
        reuseExistingServer: !process.env['CI'],
        timeout: 180_000,
    },
});
