SELECT * FROM role JOIN roles ON employee.role_id = role.id

JOIN department ON role.department_id = department.id;