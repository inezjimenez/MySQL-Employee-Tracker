/*Create database*/

DROP DATABASE IF EXISTS company;

CREATE DATABASE company;
USE company;


CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) /*to hold department name*/
); 

/*Create role*/
CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),/*to hold role title*/
    salary DECIMAL(10,2),/*to hold role salary*/
    department_id INTEGER,/*to hold reference to department role belongs to*/
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

/*Create employee*/
CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),/*to hold emplyee first name*/
    last_name VARCHAR(30),/*to hold employee last name*/
    role_id INTEGER,/*to hold reference to employee role*/
    manager_id INTEGER,/*to hold refernce to another employee 
    that is the manager of the current employee(null if the employee has no manager)*/
    FOREIGN KEY (role_id)
    REFERENCES role(id)
);
