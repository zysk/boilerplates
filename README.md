# Welcome to Your NestJS Boilerplate!

Congratulations on successfully cloning the application! Here are the necessary steps to get started:

## Setting Up Your Remote Repository

1. **Change your remote repository URL:**

    ```bash
    git remote set-url origin <NEW_URL>  # Replace <NEW_URL> with your repository's URL.
    ```

2. **Verify the change:**
    ```bash
    git remote -v
    ```

## Environment Configuration

-   **Update Application Environment:**
    Copy `.env.default` to `.env` and update accordingly:

    -   `NODE_ENV`: Accepts `dev`, `test`, `prod` (default is `dev` for development).
    -   `TZ`: The timezone is set to UTC, and the application will default to this timezone.

-   **Environment Variables:**
    -   All variables from `.env` are validated in `common/env-config/env-variables.ts`. Add your new environment variables here.

## File Structure and Features

### Common Module

-   **Common Entities:**

    -   Common entities can extend to other entities for most commonly used columns.

-   **Exceptions:**

    -   A global exception handler is included to manage common scenarios with custom messages.

-   **Interceptors:**

    -   _Explanation coming soon..._

-   **Middlewares:**

    -   A request logger middleware logs all incoming HTTP requests.

-   **Utility Files:**
    -   **Authentication:** Includes commonly used OTP and password generator functions.
    -   **Constants:** Maintains all application constants and enums.
    -   **Cryptography:** Functions for encryption, decryption, and commonly used hashing.
    -   **Validators:** _Explanation coming soon..._
    -   **Common Module:** Extendable modules with basic CRUD functionalities for further expansion.

### Database

-   **Datasource Configuration:**
    Establishes the database connection and includes options for:
    -   **Migration and Seeding:**
        -   Generate migration: `npm run migration:generate`
        -   Run migration: `npm run migration:run`
        -   Drop schema: `npm run schema:drop`
        -   Run seeder: `npm run seeder`
        -   Synchronization: `DB_SYNC=true` (enables database synchronization)
        -   Logging: `DB_LOGGING=true` (enables database logging)

### Authentication

-   **Passort JWT Authentication:**
    Includes basic guards, strategies, and decorators to verify JWTs in the auth header and attach user details to the request.
-   **Current User Decorator:** Retrieves user details from the request.

### Shared Modules

-   **Email Module:** Configures nodemailer for email services.
-   **Queue Module:** Configures a Redis bull-based queuing system.

## Documentation

-   **Swagger:** Swagger documentation has been added to enhance API understanding and usage.

## Running the Application

-   **Development:** `npm run start:dev`
-   **Production:** `npm run start`
-   **REPL:** `npm run start:repl` - Allows access to the application through CLI.

## Code Formatting and Standards

-   **Prettier and ESLint:** Sets up general code formatting rules.
-   **Husky:** Adds hooks for post-checkout to format code post-commit; commits are made only if all checks pass.
-   **Commitlint:** Ensures commit messages follow a specific format.
    -   **Allowed Prefixes:** `build | chore | ci | docs | feat | fix | perf | refactor | revert | style | test`
    -   **Example Format:** `git commit -m "fix: commit message here"`

## Best Practices

-   **Naming Conventions:**
    -   Entities and tables should be named in singular form.
    -   Module names should be singular and separated by hyphens (`-`).
    -   Entity modules should be within a features module.
-   **Modularization:**
    -   Modularize the application based on features (e.g., auth, onboarding).
-   **Dependency Injection:**
    -   In order to inject repository files only import the module into other module
    -   Injectable classes should be added to only one provider if needed import the module to other module where-ever needed
-   **Repository and Service Management:**
    -   Export only repositories; services should not be exported.
-   **API Best Practices:**
    -   For detailed API design practices, refer to [FreeCodeCamp's REST API Best Practices](https://www.freecodecamp.org/news/rest-api-best-practices-rest-endpoint-design-examples/).

## Reference

-   **TestmySkills:**: [Test My Skills](https://github.com/zysk/TestMySkills-API)

## Contact

-   **Arijit**:*arijit.saha@zysk.tech*
-   **Vikas**: *vikas.m@zysk.tech*
-   **Rajkumar**: *rajkumar.murugesan@zysk.tech*
