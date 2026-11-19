// @ts-check
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';

/**
 * Flat config equivalent of the former .eslintrc.json files.
 *
 * Works the same from the repository root (`ng lint`, CI) and from an IDE / any working directory:
 * file globs are resolved relative to this file and no type-aware parsing (`parserOptions.project`)
 * is used, so there are no tsconfig paths that would depend on the current working directory.
 * If a type-aware rule is ever needed, use `parserOptions: {projectService: true, tsconfigRootDir: import.meta.dirname}`.
 */
const selectorRules = (prefix) => ({
    '@angular-eslint/directive-selector': ['error', {type: 'attribute', prefix, style: 'camelCase'}],
    '@angular-eslint/component-selector': ['error', {type: 'element', prefix, style: 'kebab-case'}],
});

const projectTs = (project, prefix, extraRules = {}) => ({
    files: [`projects/${project}/**/*.ts`],
    rules: {...selectorRules(prefix), ...extraRules},
});

export default tseslint.config(
    {
        ignores: [
            '**/node_modules/**',
            'dist/**',
            'coverage/**',
            'docs/**',
            '.angular/**',
            'projects/netgrif-components-core/src/lib/pfql/generated/**',
        ],
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tseslint.parser,
        },
        extends: [...angular.configs.tsRecommended],
        processor: angular.processInlineTemplates,
        rules: {
            // added to the recommended set after angular-eslint 17, would require large refactors
            '@angular-eslint/prefer-inject': 'off',
            '@angular-eslint/prefer-standalone': 'off',
            '@angular-eslint/prefer-on-push-component-change-detection': 'off',
        },
    },
    projectTs('netgrif-components-core', 'ncc', {
        '@angular-eslint/no-input-rename': ['warn'],
        '@angular-eslint/component-class-suffix': ['warn'],
    }),
    projectTs('netgrif-components', 'nc'),
    projectTs('netgrif-example', 'ne'),
    projectTs('netgrif-frontend', 'app'),
    {
        files: ['**/*.html'],
        extends: [...angular.configs.templateRecommended],
        rules: {
            // remaining *ngIf / *ngFor templates, to be migrated to @if / @for
            '@angular-eslint/template/prefer-control-flow': 'warn',
        },
    },
);
