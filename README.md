## Overview


![image](https://github.com/user-attachments/assets/ecbf3678-2ed4-4b78-802c-0b69e251e7fe)
![image](https://github.com/user-attachments/assets/d8207ad8-ff46-411d-897a-02fd711a6c07)
![image](https://github.com/user-attachments/assets/be9689c2-7a96-4e06-a350-998d1c130417)
![image](https://github.com/user-attachments/assets/d76d9305-feb4-4720-818a-e3700c28dad4)
![image](https://github.com/user-attachments/assets/bbc1fb8c-362c-4be8-985f-5041cf560c8d)
![image](https://github.com/user-attachments/assets/0b0bee61-1755-43a4-ae8b-7c9bd477cfd5)
![image](https://github.com/user-attachments/assets/ed389af0-2852-4a6f-9dcf-94b5562b20c7)
![image](https://github.com/user-attachments/assets/835fe071-e3ca-47a3-8b2c-8a15db941ab1)



This project is a user management system that demonstrates the implementation of Hexagonal Architecture (Ports and Adapters) in the backend and integration with a modern Next.js frontend.

- **Frontend**: Next.js application with a clean UI for user management
- **Backend**: NestJS API with Hexagonal Architecture, Prisma ORM, and PostgreSQL database

## Architecture

### Backend (Hexagonal Architecture)

The backend follows the principles of Hexagonal Architecture (also known as Ports and Adapters), which separates the application's core logic from external concerns.

#### Key Components:

1. **Domain Layer**
   - Entities (core business objects)
   - Ports (interfaces for communication with the outside world)
     - Input Ports (use case interfaces)
     - Output Ports (repository interfaces)

2. **Application Layer**
   - Use Cases (implementation of business logic)
   - Services (orchestration of domain entities)

3. **Infrastructure Layer**
   - Adapters (implementation of ports)
     - Input Adapters (controllers, API endpoints)
     - Output Adapters (database repositories, external service clients)
   - Configuration (framework setup, dependency injection)

### Frontend

The frontend is built with Next.js and follows a clean architecture approach using components, hooks, and services.

#### Key Components:

1. **Components**: UI elements and page layouts
2. **Hooks**: Custom React hooks for data fetching and state management
3. **Services**: API integration and business logic
4. **Lib**: Utility functions and configuration

## Tech Stack

### Backend
- NestJS (Node.js framework)
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Hexagonal Architecture

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- ShadCN UI (component library)
- React Query
- Axios (HTTP client)

## Features

- User authentication (login/register)
- User management (CRUD operations)
- JWT-based authentication
- Clean, responsive UI
- Form validation

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- PostgreSQL
- Redis (optional, for caching)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with your database configuration:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/user_management"
   JWT_SECRET="your-secret-key"
   JWT_EXPIRES_IN="1h"
   ```

4. Run Prisma migrations:
   ```
   npx prisma migrate dev --name init
   ```

5. Start the backend server:
   ```
   npm run start:dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. Start the frontend application:
   ```
   npm run dev
   ```

5. Access the application at:
   ```
   http://localhost:3000
   ```

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /users` - User registration

### User Management
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create a new user
- `PUT /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

## Project Structure

```
user-management-system/
├── backend/                  # NestJS backend with hexagonal architecture
│   ├── prisma/               # Prisma schema and migrations
│   └── src/
│       ├── domain/           # Domain layer
│       │   ├── entities/     # Domain entities
│       │   └── ports/        # Interfaces (in/out ports)
│       ├── application/      # Application layer
│       │   └── use-cases/    # Business logic implementation
│       └── infrastructure/   # Infrastructure layer
│           ├── adapters/     # Adapter implementations
│           └── config/       # Configuration
├── frontend/                 # Next.js frontend
│   ├── app/                  # Next.js app directory
│   ├── components/           # React components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utilities and config
│   └── services/             # API services
└── README.md                 # Project documentation
```

## License

MIT
