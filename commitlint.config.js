/* eslint-disable prettier/prettier */
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2, // severity level (error)
            'always', // applicable cases
            [
                'feat',    // Use when adding a new feature
                'fix',     // Use when fixing a bug
                'docs',    // Use when making changes to documentation
                'style',   // Use when making changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
                'refactor',// Use when refactoring code without changing its behavior
                'perf',    // Use when improving performance
                'test',    // Use when adding or modifying tests
                'build',   // Use when making changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
                'ci',      // Use when making changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
                'chore',   // Use for other changes that don't modify src or test files
                'revert',  // Use when reverting a previous commit
                'update',  // Use when updating code or documentation without adding new features or fixing bugs
                'enhance'  // Use when enhancing an existing feature or functionality
            ]
        ]
    }
};
