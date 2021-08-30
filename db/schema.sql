DROP DATABASE IF EXISTS workplace_db;
CREATE DATABASE workplace_db;
USE workplace_db;

CREATE TABLE department(
    department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE workplace_role(
    role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,    
    FOREIGN KEY (department_id) REFERENCES department(department_id)
);

CREATE TABLE employees(
    employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,    
    FOREIGN KEY (role_id) REFERENCES workplace_role(role_id),
    FOREIGN KEY (manager_id) REFERENCES employees(employee_id)
);