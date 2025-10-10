# Contributing to lib.no

Thank you for your interest in contributing to the Liberalistene homepage project!

## Contributors

This project is maintained by:

- **Benny Thomas** - Lead Developer

## How to Contribute

### Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR-USERNAME/lib.no.git`
3. Follow the setup instructions in [CLAUDE.md](CLAUDE.md)
4. Create a new branch for your feature: `git checkout -b feature/your-feature-name`

### Development Guidelines

#### Code Style

- Follow the existing code style
- Use TypeScript for all new code
- Run `npm run lint` before committing
- Run `npm run check:types` to ensure type safety

#### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `chore:` - Maintenance tasks
- `docs:` - Documentation
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Tests

Example: `feat: add new article list component`

Commit messages are enforced by Commitlint via Husky pre-commit hooks.

#### Pull Requests

1. Ensure your code passes all checks:
   ```bash
   npm run check
   npm run test
   ```

2. Update documentation if needed

3. Create a pull request against the `develop` branch

4. Provide a clear description of your changes

5. Link any relevant issues

### Testing

- Write tests for new features
- Ensure existing tests pass: `npm run test`
- Test your changes in a local Enonic XP instance

### Questions?

If you have questions, please open an issue on GitHub or contact the maintainers.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help create a welcoming environment for all contributors

## License

By contributing, you agree that your contributions will be licensed under the Apache-2.0 License.
