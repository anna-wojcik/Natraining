# 🏋️‍♂️ Natraining - Sports Training Booking App

**SportFlow Pro** is an advanced Full-Stack Single Page Application (SPA) that allows users to browse, book, and securely pay for sports training sessions and club classes. The system offers dedicated, independent operational dashboards tailored to the specific privileges of three roles: Client (User), Trainer (Trainer), and Administrator (Admin).

The application architecture is built upon a distributed, stateless **REST API (Node.js + Express.js + MongoDB)** and a dynamic, highly responsive user interface **SPA (React + Redux Toolkit + Redux-Saga)**.

## Table of Contents
* [Site Overview](#site-overview)
    * [Home page](#home-page)
    * [Training Details Page and Stripe Module](#training-details-page-and-stripe-module)
    * [Training Details Page and Stripe Module](#training-details-page-and-stripe-module)
    * [User Profile and Settings Panel](#user-profile-and-settings-panel)
    * [Dedicated Trainer Panel](#dedicated-trainer-panel)
    * [Global Administrator Panel](#global-administrator-panel)
    * [Login Signup page](#login-signup-page)  
* [Technologies Used](#technologies-used)
* [Available Scripts](#available-scripts)
* [Testing Stripe Webhook](#testing-stripe-webhook)
* [Author](#author)

## Site Overview
The goal of this project was to create a modern e-commerce platform for sports facilities. The application handles the entire business process: from searching for a training session, to secure online payments and profile management.

### Home page
Displays a comprehensive list of available training sessions fetched asynchronously from the MongoDB database, rendered in a flexible responsive card grid (CSS Grid). Each card contains an optimized cover image, sport type, duration, price, and the database-calculated average rating displayed as a system of visual stars.
* **Advanced Filtering:** A dynamic filter form above the training list allows users to instantly narrow down search results without reloading the page by: discipline type (Football, Volleyball, Handball, Basketball, Tennis, Hockey), difficulty level (Beginner, Intermediate, Advanced), price range, and a text search bar.

![alt text](<Zrzut ekranu 2026-05-28 121658.png>)

### Training Details Page and Stripe Module
Presents extended specifications of the training session, including the relationally linked room and the profiles of the trainers conducting the class.
* **Reviews Section:** Displays the list of feedback and ratings left by participants.
* **Stripe Payment Gateway:** After clicking "Book now" (available only to logged-in clients), the Redux-Saga process initiates a secure Stripe Checkout session. The user is redirected to Stripe's encrypted credit card payment form, and subsequently returns to the app with a booking confirmation.

![alt text](<Zrzut ekranu 2026-05-28 122323.png>)

### User Profile and Settings Panel
A common dashboard for all system roles, allowing asynchronous modification of personal information, password changes (secured by verifying the current password), and uploading a new profile picture (processed, cropped, and optimized in the background by Multer and Sharp).

![alt text](<Zrzut ekranu 2026-05-28 122958.png>)

* **Client (User) - My Bookings:** A list of purchased and upcoming training sessions for the user.

![alt text](<Zrzut ekranu 2026-05-28 123213.png>)

### Dedicated Trainer Panel
* **My Schedule:** A modern, clean schedule view in the form of expandable tiles. Trainers can see only their assigned training sessions, hours, designated rooms, and the current group capacity limit in a secure *Read-Only* mode.

![alt text](<Zrzut ekranu 2026-05-28 123612.png>)

### Global Administrator Panel
An extended, comprehensive control cockpit giving full command over the system via a polished Accordion interface:
* **Manage Users:** Overview of the registered users database, with the ability to modify system roles (e.g., granting trainer/admin privileges) and activate or deactivate user accounts.
![alt text](<Zrzut ekranu 2026-05-28 123909.png>)
![alt text](<Zrzut ekranu 2026-05-28 123921.png>)
* **Manage Reviews:** Global supervision over all reviews in the system, with the authority to moderate and delete comments that violate terms.
![alt text](<Zrzut ekranu 2026-05-28 124014.png>)
![alt text](<Zrzut ekranu 2026-05-28 124030.png>)
* **Manage Trainings (Full CRUD):** Advanced offers management. Admin can edit existing classes, delete them from the database (secured with a confirmation window), and add new ones through a polished modal. The creation form handles field validation on both the client side and Mongoose (enforcing name uniqueness, string length of 10-40 characters, and enum type safety), asynchronous room assignment, multiple trainers assignment (checkboxes), and a physical cover image file upload.
![alt text](<Zrzut ekranu 2026-05-28 123717.png>)
![alt text](<Zrzut ekranu 2026-05-28 123823.png>)

### Login Signup page
Module responsible for security and access to the system.
- Signup: Account creation form requiring name and surname, email and passwords (with its confirmation). The data is validated and the password is securely hashed (bcryptjs) before being written to the MongoDB database.

  ![alt text](<Zrzut ekranu 2026-05-28 124242.png>)

- Login: User authentication via email and password. After successful verification, the server generates a JWT (JSON Web Token), which is sent to the browser and stored in a secure httpOnly cookie (protected against access from JavaScript).
  ![alt text](<Zrzut ekranu 2026-05-28 124302.png>)

## Technologies Used
### Backend 
- Node.js
- Express.js
- MongoDB
- Mongoose
- Stripe API (payment integration)
- JWT Authentication
- Nodemailer (for email sending)

### Frontend
- React
- Redux Toolkit
- Redux Saga
- Axios (for HTTP request)
- Styled Components
- CSS
- JavaScript ES6
- BEM Convention
- Media Query
- Responsive design (Flex & Grid & Media Queries)

### Development Tools
- Dotenv (Loads environment variables from .env file)
- Parcel Bundler
- Babel 
- Bcrypt.js (Password hashing)
- Multer (Handling file uploads)
- Sharp (Image processing and optimization)
- Slugify (Generates URL-friendly slugs)
- Helmet (Sets secure HTTP headers)
- HPP (Protects against HTTP Parameter Pollution)
- XSS Clean (Sanitizes user input against XSS attacks)
- Express mongo sanitize (Prevents MongoDB injection attacks)
- Express Rate Limit (Limits requests to prevent brute-force attacks)
- Cookie parser (Parses cookies attached to client requests)

## Available Scripts
In the project directory, you can run:

### `npm run start:dev` 
Runs the app in development mode.

### `npm run start:prod` 
Runs the app in production mode.

### `npm run watch:js`
Watches frontend JavaScript files and rebuilds them into /public/js/bundle.js using Parcel.

### `npm run build:js`
Builds final compressed JavaScript bundle.

## Testing Stripe Webhook
For the application to correctly receive the event from the Stripe API regarding a successful payment and automatically create a reservation in the database without interrupting the user's session, you must start local webhook forwarding in the terminal using the Stripe CLI:

```bash
stripe listen --forward-to 127.0.0.1:3000/webhook-checkout
```

## Author
Created by Anna Wójcik.
