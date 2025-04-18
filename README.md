<p align="left"> <img src="https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61dafb" /> <img src="https://img.shields.io/badge/Vite-646cff?style=for-the-badge&logo=vite&logoColor=white" /> <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" /> </p>


# Versai - Modern Shopping Experience

A modern e-commerce web application built with React, featuring user authentication, profile management, and order tracking.

## Features

- **User Authentication**
  - Login
  - Registration
  - Password Reset
  - Session Management

- **Profile Management**
  - View Profile Information
  - Edit Profile Details
  - Change Password
  - Update Personal Information

- **Order Management**
  - View Order History
  - Track Orders
  - Filter Orders by Status
  - Detailed Order Information

## Tech Stack

- React
- Vite
- React Router
- Tailwind CSS
- Local Storage for Data Persistence

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/versai.git
```

2. Install dependencies:
```bash
cd versai
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## Project Structure

```
src/
  ├── components/
  │   └── client/
  │       ├── auth/
  │       │   ├── LoginForm.jsx
  │       │   ├── RegisterForm.jsx
  │       │   ├── ForgotPassword.jsx
  │       │   └── InputGroup.jsx
  │       └── Profile/
  │           ├── UserProfile.jsx
  │           └── OrderHistory.jsx
  ├── assets/
  ├── App.jsx
  └── main.jsx
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
