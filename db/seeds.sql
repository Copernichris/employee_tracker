INSERt INTO department(department_name)
VALUES  ('Corporate'),
        ('LP'),
        ('Retail');

INSERT INTO workplace_role(title, salary, department_id)
VALUES  ('CEO', 100000, 1),
        ('Auditor', 50000, 2),
        ('General Manager', 45000, 3);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES  ('Xin', 'Zhao', 1, NULL),
        ('Karen', 'Lass', 2, 1),
        ('Dan', 'Smith', 3, 2);
        