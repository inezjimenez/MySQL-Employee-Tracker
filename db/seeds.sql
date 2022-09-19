USE company;

INSERT INTO department
(department_name)
VALUES
('Sales'),
('Support'),
('Marketing'),
('Development'),
('Administration');

INSERT INTO roles
(title, salary, department_id)
VALUES
('Sales Manager', '60000', 1),
('Engineer', '40000', 2),
('HR Rep', '50000',1),
('Shipping Manager', '100000',4)
('Admin Assistant', '65000', 3);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
('Carl', 'Silva', 1, 1),
('Temple', 'Kramer', 2, 2),
('Caitlin', 'Parsons', 3, NULL),
('Josie', 'Sparling', 4, 1),
('Inez', 'Jimenez', 5, NULL);