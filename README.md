# Link.io

A URL shortening application built with Express.js for the backend and Svelte for the frontend.

## Description

This application allows users to shorten long URLs and redirect them using generated short URLs.

## Project Structure

- **Backend:** Built using Express.js and Node.js.
- **Frontend:** Developed with Svelte.
- **Nginx:** Used as a reverse proxy server.
- **Docker:** Containerization of the project for easy deployment.

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/hhcarmenate/link.io.git
cd link.io
```

### 2. Setting up the Backend

Navigate to the `link_api` directory and set up the backend:

```bash
cd link_api
cp .env.example .env  # Create the environment file if needed
npm install
```

### 3. Setting up the Frontend

Navigate to the `link_app` directory and set up the frontend:

```bash
cd ../link_app
cp .env.example .env  # Create the environment file if needed
npm install
```

### 4. Start the Services with Docker

From the root directory of the project, run:

```bash
docker-compose up --build
```

This will build and start the Docker containers for the application.

## Usage

Access the application in your browser at `http://localhost`.

- **Main Page:** Allows users to enter a long URL and get a short URL.
- **Redirection:** Visiting a short URL will redirect users to the original long URL.

## Contributions

Contributions are welcome. Please follow these steps to contribute:

1. Fork the project
2. Create a new branch (`git checkout -b feature/new-feature`)
3. Make your changes and commit them (`git commit -m 'Add some new feature'`)
4. Push the changes to GitHub (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. For more information, see the `LICENSE` file.

---

Thank you for using our URL Shortener! If you have any questions or issues, feel free to open an issue.
