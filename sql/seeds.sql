
USE employeeDB;

INSERT INTO department(name)
VALUES
('Sales'),
('Support'),
('Marketing'),
('Development');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Manager', 60000, 1),
('Sales Associate', 40000, 1),
('Support Manager', 65000, 2),

INSERT INTO employee
(first_name, last_name, role_id, manager_id)

VALUES
("Bob", "John", 1, NULL),
("Terry", "Johnson", 2, 1),
("Mike","Miller",3,2),

