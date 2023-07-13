# Elective Subject Selection Project

This repository contains the code for the Elective Subject Selection Project, which is developed as part of the AFourathon 3.0 Hackathon. The project consists of three problem statements related to student details, elective subjects, and subject selection. The project is built using the MERN (MongoDB, Express.js, React, Node.js) stack. Additionally, Tailwind CSS is used for styling the application.

### Live: https://afourathon-hackathon-client.onrender.com

## Problem Statements

1. Student Details App: A containerized application for creating, updating, and deleting student details. Each student should have a name, ID number, email, and phone number.

2. Elective Subject App: A containerized application for managing elective subjects. Each subject should have a name, description, and code.

3. Elective Subject Selection App: A containerized application for selecting, updating, and deleting elective subjects for each student, as well as selecting, updating, and deleting the students who have chosen a particular elective subject.

## Tech Stack

The project is built using the following technologies:

- Backend: Node.js, Express.js, MongoDB
- Frontend: React

# Getting Started

To use the Elective Subject Selection Project, follow these steps:

1. Clone the repository:
   `git clone https://github.com/Aman0413/AFourathon-Hackathon-Server`

`git clone https://github.com/Aman0413/AFourathon-Hackathon-Client`

2. Install the dependencies for both the backend and frontend:

Install backend dependencies
`cd backend
npm install`

Install frontend dependencies
`cd frontend
npm install`

3. Set up the MongoDB connection:
   - Make sure you have MongoDB installed and running locally or provide the appropriate MongoDB connection string in the backend's .env file

# Use the application

- The application consists of two main pages: the Student Page and the Elective Subject Page.
- On the Student Page, you can select a student from the list and manage their elective subjects. You can add, update, or delete elective subjects for the selected student.
- On the Elective Subject Page, you can select an elective subject from the list and manage the students who have chosen that subject. You can add, update, or delete students for the selected elective subject.
- All changes made in the application will be synchronized with the backend and persisted in the database.
- The application is styled using Tailwind CSS, providing a responsive and customizable user interface.
