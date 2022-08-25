/*Create database*/

DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB:

/*Create department*/

CREATE TABLE department (
    id INT PRIMARY KEY
    name VARCHAR(30)/*to hold department name*/
); 

/*Create role*/
CREATE TABLE role (
    id INT PRIMARY KEY
    title VARCHAR(30)/*to hold role title*/
    salary DECIMAL/*to hold role salary*/
    department_id INT/*to hold reference to department role belongs to*/
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

/*Create employee*/
CREATE TABLE employee (
    id INT PRIMARY KEY
    first_name VARCHAR(30)/*to hold emplyee first name*/
    last_name VARCHAR(30)/*to hold employee last name*/
    role_id INT NULL/*to hold reference to employee role*/
    manager_id INT NULL/*to hold refernce to another employee 
    that is the manager of the current employee(null if the employee has no manager)*/
    FOREGIN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL
);
