# 📚 Online Book Library Web Application

## Description

**An online book library that allows users to sign up as authors and add books to the platform. Users can preview other authors, rate, review, and preview books from other authors, as well as search and add books to their reading-list. 📖✨** 📖✨

## Technologies and Languages

- **Programming Language:** TypeScript | JavaScript
- **Frontend Framework:** React & Next.js
- **Dev Tools & Libraries:** React Query, Redux
- **UI Framework:** Tailwind CSS & Mantine Component Library
- **Backend Framework:** Node.js 
- **Database:** MongoDB utilizing Mongoose

## Project Structure

Next.js API routes were used to set up the backend services, utilizing pages as API routes. All source code, including tests, are in the `src` directory following a consistent and simple folder structure to ensure scalability and readability for developers. 🗂️📂

## Deployment and Hosting

- **Project URL:** [Bookie](https://bookie-psi.vercel.app/)
- **GitHub Repository:** [Bookie GitHub Repo](https://github.com/stephenwayar/bookie.git)

The MongoDB URI and other environment variables are shared privately for security reasons. The database is hosted remotely. Starting the development server and making API requests by interacting with the app automatically connects to the remote database. 🚀🌐

## Running the App in Development

1. Add the provided environment variables to the `.env.local` file at the root of the project.
2. Run `npm install` to install packages.
3. Run `npm run dev` to start the development server. 🛠️👨‍💻


---


## Features Implemented

### Frontend Requirements (Primary Focus)

1. **User Interface**:
    - **Book Page**:
        - Display a list of books with titles and authors.
        - Include filtering, sorting, and pagination.
    - **Book Details Page**:
        - Show detailed information about each book.
        - Include user reviews and ratings.
    - **Author Details Page**:
        - Display detailed information about authors.
        - List books by each author.
    - **Search Page**:
        - Implement search by book title and author name.
    - **User Profile Page**:
        - Display user profile and reading history.
        - Allow profile editing.

2. **User Authentication**:
    - Implement login and registration forms.
    - Use JWT tokens for secure access to protected endpoints.

3. **State Management**:
    - Utilize Redux for managing application state.
    - Manage user authentication and book data globally.

4. **Responsive Design**:
    - Ensure the application works well on different screen sizes.
    - Adopt a mobile-first design approach.

5. **Form Handling**:
    - Create forms for adding and editing books/authors.
    - Implement client-side validation and clear error messaging.

6. **Error Handling**:
    - Display clear error messages for API requests and form validation errors.
    - Implement global error handling (Error Boundary).

### Backend Requirements (Secondary Focus)

1. **API Endpoints**:
    - **Books**:
        - Implement basic CRUD operations.
    - **Authors**:
        - Implement basic CRUD operations.
    - **Users**:
        - Provide endpoints for registration, login, and profile management.

2. **Authentication**:
    - Implement JWT-based authentication.

3. **Database**:
    - Use MongoDB for data storage.
    - Ensure setup supports quick testing and development.

### Bonus Features

- **TypeScript**:
    - Used TypeScript for type checking across the project.
    
- **Testing**:
    - Implemented Jest & React Testing Library for unit and integration tests for React components.

- **Dark Mode**:
    - Included a dark mode option for the application.

- **Deployment**:
    - Deployed frontend on Vercel with CI/CD pipelines.