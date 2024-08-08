# Blog Application

A social media application that allows users to create, update, and manage blogs. This application uses Express.js with MongoDB for the backend.

## Features

- User authentication (registration and login)
- Blog creation and management
- Image upload functionality for blogs
- JWT-based authentication with cookie storage

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer for file uploads
- JWT for authentication
- bcrypt for password hashing

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/your-repository-name.git

2. **Navigate to the Project Directory**

  ```bash
cd your-repository-name

3. **Install Dependencies**

  ```bash
npm install

4. **Create a .env File**

Copy the .env.example file to .env and update it with your environment variables:
  
cp .env.example .env

5. **Add Environment Variables""

Update .env with the following variables:

env
PORT=4000
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_connection_string

6. **Start the Application**

  ```bash
npm start


API Endpoints
Authentication
POST /users/signup
Register a new user
POST /users/login
Log in an existing user
Blog Management
POST /blogs
Create a new blog
PUT /blogs/
Update an existing blog
DELETE /blogs/
Delete a blog
GET /blogs/
Get details of a specific blog
Testing
You can test the API endpoints using Postman or similar tools.

Contributing
Fork the repository
Create a new branch (git checkout -b feature/YourFeature)
Commit your changes (git commit -am 'Add new feature')
Push to the branch (git push origin feature/YourFeature)
Create a new Pull Request
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Mongoose
Express.js
Multer
JWT
bcrypt
bash