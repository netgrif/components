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

/** a web server is started only when the tests of its project run (the playground not for `--project=frontend`) */
const projectArgs = process.argv.filter(arg => arg.startsWith('--project='));
const runsExample = projectArgs.length === 0 || projectArgs.includes('--project=example');
const runsFrontend = projectArgs.length === 0 || projectArgs.some(arg => arg.startsWith('--project=frontend'));

/**
 * End to end tests of the libraries.
 * - `example`: the components playground (netgrif-example) with its mock engine, no backend is needed.
 *   The libraries have to be built and linked first (npm run ncc:local-build, npm run nc:local-build).
 * - `frontend`: netgrif-frontend with a running engine (the NAE tests). The engine (and Mailpit, docker compose
 *   --profile e2e) is started by hand, the production build of the frontend is built and served by the web server
 *   below (npm run e2e:frontend:serve, the libraries have to be built and linked first), the login is read from
 *   E2E_USERNAME and E2E_PASSWORD (never committed), see frontend/auth.setup.ts.
 */
export default defineConfig({
    testDir: '.',
    // each project has its own folder of the results: a run of one project does not delete the results of the other
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
            outputDir: '../test-results/example',
            use: {...devices['Desktop Chrome'], baseURL: `http://localhost:${EXAMPLE_PORT}`},
        },
        {
            name: 'frontend-setup',
            testDir: './frontend',
            outputDir: '../test-results/frontend-setup',
            testMatch: /.*\.setup\.ts/,
            use: {...devices['Desktop Chrome'], baseURL: FRONTEND_URL},
        },
        {
            name: 'frontend',
            testDir: './frontend',
            outputDir: '../test-results/frontend',
            dependencies: ['frontend-setup'],
            use: {
                ...devices['Desktop Chrome'], baseURL: FRONTEND_URL, storageState: FRONTEND_AUTH,
                // E2E_SLOWMO=500 with --headed to watch a test click through the application
                launchOptions: {slowMo: Number(process.env['E2E_SLOWMO'] ?? 0)},
            },
        },
    ],
    webServer: [
        ...(!runsExample ? [] : [{
            command: `npm run example:start -- --port ${EXAMPLE_PORT}`,
            cwd: '..',
            url: `http://localhost:${EXAMPLE_PORT}`,
            reuseExistingServer: !process.env['CI'],
            timeout: 180_000,
        }]),
        // the production build of netgrif-frontend as in the pipeline (the libraries are built and linked before);
        // locally a server already running on the port (e.g. the dev server) is reused, E2E_FRONTEND_URL points the
        // tests to another running frontend
        ...(!runsFrontend || process.env['E2E_FRONTEND_URL'] ? [] : [{
            command: 'npm run e2e:frontend:serve',
            cwd: '..',
            url: FRONTEND_URL,
            reuseExistingServer: !process.env['CI'],
            timeout: 600_000,
        }]),
    ],
});
