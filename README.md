# Employee Management System

A Full Stack Employee Management System developed using **ASP.NET Core Web API**, **Angular**, and **SQL Server**.

The application provides secure authentication, role-based authorization, employee management, department management, dashboards, reports, and profile management.

---

## 🚀 Features

### Authentication & Authorization

* JWT Authentication
* Role-Based Authorization (Admin / User)
* Secure Login System
* User Registration
* Session Management

### Department Management

* Add Department
* View Department List
* Department Validation
* Stored Procedure Based Operations

### Employee Management

* Add Employee
* Update Employee
* Soft Delete Employee
* View Employee Details
* Department Assignment
* Employee Status Management

### Dashboard

* Total Employees Count
* Active Employees Count
* Inactive Employees Count
* Total Departments Count
* Department Wise Employee Chart
* Recent Employees List

### Reports

* Department Wise Employee Report
* Employee Status Report

### User Profile

* View Personal Profile
* View Department Information
* View Job Information

### Validation

* Client Side Validation (Angular)
* Server Side Validation (ASP.NET Core Data Annotations)

---

## 🛠 Technologies Used

### Frontend

* Angular
* TypeScript
* HTML5
* CSS3
* Bootstrap 5
* SweetAlert2

### Backend

* ASP.NET Core Web API
* C#
* ADO.NET
* JWT Authentication

### Database

* SQL Server
* Stored Procedures

### Development Tools

* Visual Studio 2022
* Visual Studio Code
* SQL Server Management Studio (SSMS)
* Git
* GitHub

---

## 📂 Project Structure

```text
EmployeeManagementSystem
│
├── EmployeeManagement
│   ├── Controllers
│   ├── DTOs
│   ├── Models
│   ├── Repository
│   └── Program.cs
│
├── EmployeeManagementUI
│   ├── Components
│   ├── Services
│   ├── Guards
│   └── Shared
│
├── Database
│   ├── EmployeeManagementDB.sql
│   └── USP_Master.sql
│
└── README.md
```

## 🗄 Database Modules

### Users

Stores system users and authentication details.

### Department

Stores department information.

### Employee

Stores employee details and department mapping.

---

## 🔐 Authentication Flow

1. User enters Email and Password.
2. API validates credentials.
3. JWT Token is generated.
4. Token is stored on client side.
5. Authorized APIs are accessed using JWT Token.
6. Role-based navigation is applied.

---

## 📊 Dashboard Statistics

* Total Employees
* Active Employees
* Inactive Employees
* Total Departments
* Department Wise Employee Distribution

---

## ⚡ API Architecture

The application follows:

* Controller Layer
* Repository Layer
* Database Layer
* Stored Procedure Based Data Access

All CRUD operations are performed using a centralized stored procedure:

```sql
USP_Master
```

---

## 📋 Setup Instructions

### Backend

1. Open EmployeeManagement solution in Visual Studio.
2. Restore NuGet packages.
3. Configure SQL Server connection string.
4. Execute database scripts.
5. Run the Web API.

### Frontend

```bash
npm install
ng serve
```

Application URL:

```text
http://localhost:4200
```

---

## 📁 Database Scripts

The repository includes:

* EmployeeManagementDB.sql
* USP_Master.sql

These scripts can be used to recreate the database and stored procedures.

---

## 👨‍💻 Author

**Avadhut Bhusari**

GitHub:
https://github.com/avadhutdharmendrabhusari

---

## 📌 Project Type

Full Stack Web Application

ASP.NET Core Web API + Angular + SQL Server + JWT Authentication
