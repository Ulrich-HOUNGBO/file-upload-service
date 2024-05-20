# File Storage Service

## Description

This project is a file storage service that leverages the power of AWS S3 for secure and scalable file storage. It is built with TypeScript and uses the NestJS framework for creating efficient, reliable, and scalable server-side applications.

The service provides endpoints for uploading, deleting, and updating files in the AWS S3 bucket. It uses the `AwsS3Service` for handling AWS S3 operations, which is part of a common library module that can be reused across different parts of the application.

The application is designed with a focus on modularity, testability and maintainability, following best practices of modern backend development.
## Installation

To install the application, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-directory>`
3. Install dependencies: `npm install`

## Usage

To run the application:

1. Start the server: `npm run start`
2. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

- POST `/file`: Upload a file to AWS S3.
- DELETE `/file/:id`: Delete a file from AWS S3.
- PUT `/file/:id`: Update a file in AWS S3.

## License

This project is licensed under the MIT License.

## Author

* **Ulrich HOUNGBO** - [Ulrich-HOUNGBO](https://github.com/Ulrich-HOUNGBO)
