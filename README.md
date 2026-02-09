# 🏋️‍♂️ Natraining - Sports Training Booking App

**Natraining** is a complete Full-Stack web application that allows users to browse, book, and pay for sports training sessions. Administrators and trainers have access to dedicated panels for managing schedules, users, and reviews.
The application was built using **Node.js**, **Express**, **MongoDB**, and the **Pug** template engine.

## Table of Contents
* [Site Overview](#site-overview)
    * [Home page](#home-page)
    * [Training details page](#training-details-page)
    * [User account page](#user-account-page)
    * [Login Signup page](#login-signup-page)  
* [Technologies Used](#technologies-used)
* [Available Scripts](#available-scripts)
* [Author](#author)

## Site Overview
The goal of this project was to create a modern e-commerce platform for sports facilities. The application handles the entire business process: from searching for a training session, to secure online payments and profile management.

### Home page
Displays a list of available training fetched from the MongoDB database. Training are displayed in a responsive card grid. Each card contains key information that allows users to quickly evaluate the offer: a sample photo, workout name, difficulty level (Beginner/Intermediate/Advanced), duration, number of available spots, rating (stars), and price.

<img width="951" height="535" alt="obraz" src="https://github.com/user-attachments/assets/17fda2fc-00e5-4800-a5bc-55a4902d3375" />

Above the training list is a filter form that allows you to dynamically refine your search results. The user can filter classes by: 
- Training Type (Football, Volleyball, Handball, Basketball, Tennis, Hockey),
- Difficulty Level (Beginner, Intermediate, Advanced),
- Price Range,
- Names (text search).

### Training details page
The website presents detailed information about the selected training session and allows you to make a reservation.
- Information section: Contains an extended description of the training session, a visualization of the activity type, and detailed information: start date and time, room name, and duration.
- Trainer information: Displays the profiles of the trainers conducting the session, building trust with the staff.
- Reviews section: Users can view reviews and ratings from other participants.
- Reservations and Payments Module (Booking):
  - Access logic: The reservation button is only visible to logged in users. Those who are not logged in see an incentive to log in.
  - Integration with Stripe: Clicking "Book training" initiates a secure payment session (Checkout Session). The app communicates with the Stripe API by redirecting the user to a card payment form.

<img width="951" height="535" alt="obraz" src="https://github.com/user-attachments/assets/90c7ff61-5927-4f51-872c-1e184190082f" />

<img width="951" height="535" alt="obraz" src="https://github.com/user-attachments/assets/d2eab73c-f42d-4bf3-be9f-255fda4bbc73" />

### User account page
The account panel is dynamically adjusted to the role of the logged in user (User, Trainer, Admin).
- Common functionalities (Settings):
  - Data editing: Ability to change name, email address, and upload a new profile picture (processed by Multer and Sharp library).
  - Password Change: Password change form requiring the current password for verification purposes.

  <img width="951" height="535" alt="obraz" src="https://github.com/user-attachments/assets/4dd47c0b-043c-455b-9622-37321f6f7e95" />

- Role: User:
  - My Trainings: List of purchased and upcoming workouts.
    <img width="960" height="540" alt="obraz" src="https://github.com/user-attachments/assets/472cd37b-aa49-4b1a-8931-66fc198596b6" />
  - My Reviews: Managing your own opinions. The user can view the reviews he has left, edit their content and rating, and delete them (full CRUD operations on his own resources).
    <img width="951" height="535" alt="obraz" src="https://github.com/user-attachments/assets/8855e62e-27e0-49cc-9c5d-9fd87ecc5238" />
- Role: Trainer:
  - My Schedule: A dedicated schedule view showing the workouts assigned to a given coach.
- Role: Administrator: The Administrator has an extended side panel that allows you to manage the entire system:
  - Manage Trainings: Overview of all workouts in the system, with the option to create, edit, and delete them in the future.
  - Manage Users: User base management will be implemented in the future.
  - Manage Reviews: Feedback management (full CRUD operations).
  <img width="951" height="535" alt="obraz" src="https://github.com/user-attachments/assets/db302c8d-ee22-4653-8e09-58ccdfed452e" />

  - Manage Bookings: in the future, a preview of all reservations and payment statuses will be implemented.

### Login Signup page
Module responsible for security and access to the system.
- Signup: Account creation form requiring name and surname, email and passwords (with its confirmation). The data is validated and the password is securely hashed (bcryptjs) before being written to the MongoDB database.
  <img width="951" height="535" alt="obraz" src="https://github.com/user-attachments/assets/4b9361d2-69d7-4917-aa4a-bd86c0034026" />

- Login: User authentication via email and password. After successful verification, the server generates a JWT (JSON Web Token), which is sent to the browser and stored in a secure httpOnly cookie (protected against access from JavaScript).
  <img width="837" height="471" alt="obraz" src="https://github.com/user-attachments/assets/0ce15d8d-d05f-44c2-aa3c-908eb544aeb4" />

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
- Pug (template engine)
- Axios (for HTTP request)
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

## Author
Created by Anna Wójcik.
