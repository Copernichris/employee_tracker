// department query
// SELECT * FROM department

// role query
// SELECT role_id, title, salary, department_name FROM workplace_role INNER JOIN department ON workplace_role.department_id = department.department_id;

// employee query
// SELECT employee.employee_id, employee.first_name, employee.last_name, workplace_role.title, department.department_name, workplace_role.salary, manager.first_name as managerFirstName, manager.last_name as managerLastName FROM employees employee LEFT JOIN workplace_role ON employee.role_id = workplace_role.role_id LEFT JOIN department ON workplace_role.department_id = department.department_id LEFT JOIN employees manager ON employee.manager_id = manager.employee_id
