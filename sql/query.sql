SELECT id, department_name AS department_name
FROM department;

SELECT role.id, title, salary, department_name AS department
FROM role
INNER JOIN department ON role.department_id = department.id;

SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name AS department, employee.manager_id
FROM employee
INNER JOIN role ON employee.role_id = role.id
INNER JOIN department ON role.department_id = department.id;