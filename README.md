# Store API Project

## About

The Store API Project is a Node.js and Express application that provides a RESTful API for product management. It utilizes MongoDB for data storage and Mongoose for object data modeling (ODM). The API supports various operations such as fetching all products, filtering products based on specific criteria (e.g., company, name, featured status), sorting, and pagination.

## Features

- Fetch all products with optional filters (e.g., by company, name, featured status)
- Sort products by any field
- Pagination support for large datasets
- Error handling middleware for graceful error responses
- Environment variable support for configuration
- Integration with MongoDB using Mongoose for schema definition and data manipulation

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv for environment variable management
- express-async-errors for handling asynchronous route errors

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- MongoDB (local or remote instance)
- npm (Node Package Manager)

### Installation

1. Clone the repository to your local machine:
git clone [https://github.com/Smith0212/Store-API](https://github.com/Smith0212/Store-API)
cd your-project-directory

2. Install the necessary packages:
npm install

3. Create a `.env` file in the root directory and add your MongoDB URI:
MONGO_URI=your_mongodb_uri_here

4. Start the server:
npm start



## Usage

Once the server is running, you can access the API endpoints using any HTTP client (e.g., Postman, curl).

- **Fetch All Products**: `GET /api/v1/products`
- **Fetch All Products with Filters**: Add query parameters like `?company=ikea&name=chair`
- **Pagination**: Use `?page=2&limit=10` to paginate through results
- **Sorting**: Add a `sort` query parameter like `?sort=-price,name` to sort by price in descending order and then by name in ascending order.

## API Endpoints

| Method | Endpoint           | Description                         |
| ------ | ------------------ | ----------------------------------- |
| GET    | `/api/v1/products` | Fetch all products with optional filters, sorting, and pagination. |
| GET    | `/api/v1/products/static` | Fetch a static list of products (example endpoint). |

## Error Handling

The application includes an error handling middleware that captures and responds to errors gracefully, ensuring the API does not crash and provides meaningful error messages to the client.
