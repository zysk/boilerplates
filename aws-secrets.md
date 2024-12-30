# AWS Secrets Manager Guide

## Adding Secrets in JSON Format

Follow these steps to add secrets to AWS Secrets Manager in JSON format:

### Prerequisites
- AWS account with access to Secrets Manager.

### Steps

1. **Create a JSON file with your secrets:**

    ```json
    {
      "username": "your-username",
      "password": "your-password",
      "apiKey": "your-api-key"
    }
    ```

    Save this file as `secrets.json`.

2. **Log in to the AWS Management Console and navigate to Secrets Manager.**

3. **Click on "Store a new secret".**

4. **Select "Other type of secret" and click "Next".**

5. **Upload your `secrets.json` file or manually enter the secret key-value pairs.**

6. **Provide a name for your secret (e.g., `mySecretName`) and click "Next".**

7. **Configure any additional settings as needed and click "Next".**

8. **Review your settings and click "Store".**

9. **Verify the secret has been created by navigating to the "Secrets" list and checking for `mySecretName`.**

### Additional Resources

- [AWS Secrets Manager Documentation](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html)
- [AWS Management Console](https://aws.amazon.com/console/)
