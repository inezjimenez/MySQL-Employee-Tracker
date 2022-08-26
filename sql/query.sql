/*this is where we join the ids and create them together*/
SELECT * FROM roles JOIN department ON roles.department_id = department.id;/*this is joining the department id to the roles table*/

/*this is joining the roles id to the employee table*/
FROM employee JOIN roles ON employee.role_id = role.id;