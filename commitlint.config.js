/**
 * COMMITLINT CONFIGURATION
 * 
 * Purpose: Enforce conventional commit message format
 * Helps maintain consistent and readable git history
 * 
 * Current setup:
 * - Uses @commitlint/config-conventional rules
 * - Enforces format: type(scope): description
 * 
 * Common commit types:
 * - feat: New feature
 * - fix: Bug fix
 * - docs: Documentation changes
 * - style: Code style changes (formatting, etc.)
 * - refactor: Code refactoring
 * - test: Adding or updating tests
 * - chore: Build process or auxiliary tool changes
 * 
 * Examples:
 * - feat(auth): add login functionality
 * - fix(ui): resolve button alignment issue
 * - docs: update README with installation steps
 * 
 * To modify:
 * - Add custom rules to the config object
 * - See: https://commitlint.js.org/#/reference-rules
 */

module.exports = { 
  extends: ['@commitlint/config-conventional'] 
}
