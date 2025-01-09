# Angular TypeScript Project - User Management Application

## Overview
This project is a web application developed using Angular, ASP.NET Core Web API, Entity Framework, HTML, CSS, and SQL Server. It is designed for managing user data efficiently, with features including login functionality, user listing, manual user addition, and importing users from an Excel file.

## Features
1. **Login Page**
   - A simple login form requiring a username and password to authenticate users.

2. **User List Page**
   - Displays a list of users with the following details:
     - Photo
     - Name
     - Email
     - Mobile Number
     - Password

3. **Manual User Addition Page**
   - A form for adding users manually by entering their information.

4. **Excel Import Page**
   - Allows importing user data from a provided Excel file.
   - Automatically generates passwords for imported users.
   - Excludes image data during the import process.
   - Designed to handle one million records and complete the import within two minutes.

## Technologies Used
- **Frontend**: Angular TypeScript, HTML, CSS, Bootstrap
- **Backend**: ASP.NET Core Web API, Entity Framework (Code-First)
- **Database**: SQL Server

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   ```

2. Navigate to the project directory:
   ```bash
   cd your-project-directory
   ```

3. Install Angular dependencies:
   ```bash
   npm install
   ```

4. Set up the database:
   - Create a SQL Server database.
   - Update the connection string in the backend project (`appsettings.json`) to point to your database.

5. Run database migrations:
   ```bash
   dotnet ef database update
   ```

6. Build and run the backend:
   ```bash
   dotnet run
   ```

7. Run the Angular application:
   ```bash
   ng serve
   ```

8. Access the application in your browser at `http://localhost:4200`.

## Usage
### Login Page
- Enter your username and password to log in.

### User List Page
- View the list of users with details including their photo, name, email, mobile number, and password.

### Manual User Addition Page
- Fill in the form to add a new user manually.

### Excel Import Page
- Upload the provided Excel file containing user data.
- Ensure the file follows the correct structure as defined in the sample file [DumyData.xlsx](https://joddb.com/uploads/DumyData.xlsx).
- Passwords will be generated automatically during the import process.

## Performance Optimization for Excel Import
- Data processing is optimized to handle one million records within two minutes.
- Bulk insert operations are used to minimize database interaction.
- The system excludes images to reduce data size and processing time.

## Folder Structure
```plaintext
src/
├── app/
│   ├── components/
│   │   ├── login/
│   │   ├── user-list/
│   │   ├── manual-user-addition/
│   │   ├── excel-import/
│   ├── services/
│   ├── app.module.ts
│   └── app.component.ts
├── assets/
├── environments/
├── styles.css
├── index.html
└── main.ts
```

