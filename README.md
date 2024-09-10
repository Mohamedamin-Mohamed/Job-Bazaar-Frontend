# Job Bazaar - Frontend
## Overview
Job Bazaar is a dynamic job board application where employers and job seekers can connect and collaborate. Employers can manage job postings, provide feedback to applicants, and select candidates based on referrals. Job seekers can apply for jobs, refer other candidates, track their applications, and view employer feedback.

This repository contains the frontend code for Job Bazaar, developed using JavaScript, React, Redux, and Tailwind CSS.

## Features
### Employers
Post Jobs: Employers can create new job postings with detailed descriptions.
Edit Jobs: Employers can modify the details of their existing job postings.
Provide Feedback: Employers can leave feedback for applicants who have applied for their jobs.
View Referrals: Employers can see all referrals submitted by applicants and evaluate them.
Candidate Selection: Employers can review resumes and select suitable candidates based on referrals.

### Applicants
Apply for Jobs: Applicants can apply to job postings by submitting their resume and application.
Referral System: Applicants can refer other candidates for job opportunities by submitting their resumes.
Career Interests: Applicants can upload educational qualifications and work experience to set their career preferences.
Track Application Status: Applicants can track the status of their active and inactive job applications.
View Feedback: Applicants can view all feedback received for their job applications.
Filter Feedback: Feedback can be filtered based on a start date and end date.

## Technologies
This project leverages modern web technologies to ensure scalability, performance, and maintainability.

JavaScript: The core programming language used for frontend development.
React: A powerful JavaScript library for building user interfaces with reusable components.
Redux: A state management tool used to manage and centralize application state.
Tailwind CSS: A utility-first CSS framework for building responsive and visually appealing designs.

# Getting Started
## Prerequisites

To run this project locally, you need to have the following installed:

Node.js (v14 or above)
npm (v6 or above) or yarn

## Project Structure

├── .idea/                        # IDE configuration files

├── node_modules/                 # Node.js dependencies

├── public/                       # Public assets and static files

├── src/
│   ├── Authentication/           # Components related to authentication

│   ├── Buttons/                  # Reusable button components
│   ├── Dashboard/                # Main dashboard with nested sections
│   │   ├── Address/              # Address management section
│   │   ├── Careerhub/            # Career hub section for managing career interests
│   │   ├── Feedback/             # Section for viewing feedback
│   │   ├── Profile/              # User profile management
│   │   ├── Referrals/            # Manage and submit referrals
│   │   ├── Settings/             # User settings management
│   ├── Images/                   # Images used in the application
│   ├── LandingPage/              # Components for the landing page
│   ├── NotFound/                 # 404 Not Found page
│   ├── Redux/                    # Redux state management
├── App.js                        # Main app component
├── index.css                     # Global styles (Tailwind CSS included)
├── index.js                      # Entry point of the application
├── .gitignore                    # Files and directories to be ignored by Git
├── package.json                  # Project dependencies and scripts
├── package-lock.json             # Lockfile for consistent dependency versions

## Contact
For any inquiries or questions, feel free to reach out at:

Email: mohamedamin204080@gmail.com
LinkedIn: https://www.linkedin.com/in/mohamedamin-mohamed/
