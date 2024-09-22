
# Simple Calculator Clone

A basic calculator application that performs simple arithmetic operations like addition, subtraction, multiplication, and division. This project is a clone of the traditional calculator you might find on your desktop or mobile device.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

## Features

- **Addition, Subtraction, Multiplication, Division**: Perform basic arithmetic operations.
- **Dark Mode**: Switch between light and dark themes for a better user experience in different lighting conditions.
- **History Display**: Keep track of past calculations and view them in a history panel.
- **Local Storage**: Save and persist calculation history across sessions using local storage.
- **Cloud Database Integration**: Store user calculation history in a cloud-based MongoDB database, ensuring that user data is secure and accessible across devices.

## Technologies Used

- **HTML5**: For structuring the application.
- **Vanilla CSS**: For styling the application.
- **TypeScript**: For implementing the calculator's functionality with type safety and modern JavaScript features.
- **Node.js & Express**: For server-side API integration to handle user authentication and session management.
- **MongoDB (Cloud)**: To store user data and calculation history securely in a cloud-based database.
- **Fetch API**: To communicate with the server asynchronously for user data and history management.

## Installation

To run this calculator locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/simple-calculator-clone.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd simple-calculator-clone
    ```
3. **Install the necessary dependencies:**
    ```bash
    npm install
    ```
4. **Compile the TypeScript code:**
    ```bash
    npm run build
    ```
5. **Start the server:**
    ```bash
    npm run devStart
    ```

## Usage

1. Open the `index.html` file in your web browser or visit `http://localhost:3000` after starting the server.

    ```bash
    open index.html
    ```

2. Use the calculator interface to perform basic arithmetic operations.
3. Toggle the dark mode using the provided switch/button for a different theme.
4. View and interact with past calculations in the history display panel.
5. Calculations and history are saved to the server and will persist across user sessions.
6. Authenticate through the API to enable personalized calculation history management.
7. User calculation history is stored securely in MongoDB, ensuring it is accessible across sessions and devices.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## Changelog

All notable changes to this project will be documented in this section.

### [Unreleased]

- **Refactor:** Transitioned the codebase to an object-oriented programming (OOP) structure for better maintainability and scalability.
- Added basic arithmetic operations: addition, subtraction, multiplication, and division.
- Implemented dark mode functionality.
- Added history calculation display to track and view past calculations.
- Integrated local storage to persist calculation history across sessions.
- **API Integration:** Added a Node.js and Express-based API for user authentication, enabling personal calculator sessions. Users can log in and have their calculation history saved to their accounts on the server.
- **Cloud Database (MongoDB) Integration:** Implemented MongoDB as a cloud-based storage solution, providing secure, scalable, and persistent storage for user data and calculation history. This allows users to access their data across different devices and sessions.
- **Security:** Removed the use of the `eval()` method for improved security.
- Rewrote the code in TypeScript for better code quality and maintainability.

### Soon

- **Scientific Calculator Features:** Extend the calculator with functionalities such as trigonometric operations, logarithms, and exponentiation.
- **Memory Function:** Introduce memory buttons (M+, M-, MR, MC) to store and recall values.
- **Improved UI/UX:** Enhance the user interface for a more intuitive and visually appealing experience.
- **Enhanced API Capabilities:** Expand API functionality to support advanced user profile management and multi-device synchronization of calculator history.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
