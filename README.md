# Account Management System (React)

This is a **Account Management System** built using React, with all user data stored in the browser’s **localStorage**. It’s a simple project designed to demonstrate **user authentication, account management, and data persistence** without a backend.  

The goal of this project is to show how a basic web application can manage users, provide secure login/signup functionality, and handle account updates and deletion.

---

## Why This Project

Many beginner projects focus only on frontend UI, but real-world applications need to handle **user sessions, validations, and secure data handling**. This project demonstrates:

- User registration with **strong password rules**
- Login and session management
- Protecting pages so only logged-in users can access them
- Account update and deletion
- Proper redirects to prevent unauthorized access

It’s perfect for **learning React, React Router, and working with browser storage**.

---

## Features

1. **Sign Up**
   - Create a new account with name, email, and password
   - Password must:
     - Be at least 8 characters
     - Include uppercase and lowercase letters
     - Include a number
     - Include a special character
   - Email must be unique (no duplicate accounts)

2. **Login**
   - Access your account using email and password
   - Invalid credentials show an error message
   - Logged-in users are redirected to the dashboard automatically

3. **Dashboard**
   - Welcome message with user name and email
   - Buttons to navigate to account management or logout
   - Only accessible if the user is logged in

4. **Account Management**
   - Update name, email, or password
   - Prevent duplicate emails when updating
   - Delete account permanently from localStorage
   - Logout clears session

5. **Redirects & Security**
   - Non-logged-in users cannot access dashboard or account pages
   - Logged-in users cannot access login/signup pages
   - All actions are stored in **localStorage**, so the session persists until logout or account deletion

---

## How It Works

1. **Local Storage Usage**
   - All user data is stored in localStorage as an array of user objects
   - The currently logged-in user is stored under `loggedInUser`
   - Example structure:
     ```json
     {
       "users": [
         { "name": "John Doe", "email": "john@example.com", "password": "Abcd@1234" }
       ],
       "loggedInUser": { "name": "John Doe", "email": "john@example.com", "password": "Abcd@1234" }
     }
     ```
   - Logging out removes only `loggedInUser`, while account deletion removes the user from the `users` array entirely.

2. **Routing**
   - React Router handles navigation between pages
   - Protected routes ensure users cannot access pages they shouldn’t

3. **Validation**
   - Signup: All fields required, passwords must match, password strength check
   - Update Account: Prevents using an email already registered by another user
   - Login: Checks credentials against stored users

---

