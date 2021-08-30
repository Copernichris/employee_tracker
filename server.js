var inquirer = require('inquirer');
var mysql = require ('mysql2')

const db = mysql.createConnection(
    {
      host: 'localhost',   
      user: 'root',      
      password: '',
      database: 'workplace_db',
    },
    console.log(`Connected to the movies_db database.`)
  );

function prompts(){
  inquirer
    .prompt([
      {
          type: 'list',
          name: 'selections',
          message: 'What would you like to do?',
          choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee']
      },
    ])
    .then(answer =>{
      // View all departments just returns the department table
      if (answer.selections ==='View all departments'){
        db.query("SELECT * FROM department;", (err, res) => {
          if (err) throw err;
          console.table(res);
          prompts();
        })
      // view all roles job title, role id, department role belongs to , salary for role (workplace table and pull department name from departments)
      }  else if (answer.selections ==='View all roles'){
        db.query("SELECT role_id, title, salary, department_name FROM workplace_role INNER JOIN department ON workplace_role.department_id = department.department_id;", (err, res) => {
          if (err) throw err;
          console.table(res);
          prompts();
        })
      // view all employees shows employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to (title and salary from workplace, department from departments, manager pulls from employees too)
      } else if (answer.selections ==='View all employees'){
        db.query("SELECT employee.employee_id, employee.first_name, employee.last_name, workplace_role.title, department.department_name, workplace_role.salary, manager.first_name as manager_first_name, manager.last_name as manager_last_name FROM employees employee LEFT JOIN workplace_role ON employee.role_id = workplace_role.role_id LEFT JOIN department ON workplace_role.department_id = department.department_id LEFT JOIN employees manager ON employee.manager_id = manager.employee_id", (err, res) => {
          if (err) throw err;
          console.table(res);
          prompts();
        })
      // add a department (enter department name)
      } else if (answer.selections ==='Add a department'){
        inquirer  
          .prompt([
            {
              type: 'input',
              name: 'new_department',
              message: 'What is the new department\'s name?',
            },
          ])
          .then(answer =>{
            db.query("INSERT INTO department SET ?", 
            {
              department_name: answer.new_department,
            }, 
            (err, res) => {
              if (err) throw err;
              console.table(res);
              prompts();
            })
          })
        //add employee role for completeness
        } else if (answer.selections ==='Add a role'){
          inquirer  
            .prompt([
              {
                type: 'input',
                name: 'title',
                message: 'Role Title',
              },
              {
                type: 'input',
                name: 'salary',
                message: 'What is this role\'s salary',
              },
              {
                type: 'input',
                name: 'dept_ID',
                message: 'What is the department ID?',
              }
            ])
            .then(answer =>{
              db.query("INSERT INTO workplace_role SET ?", 
              {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.dept_ID,                
              }, 
              (err, res) => {
                if (err) throw err;
                console.table(res);
                prompts();
              })
            })        
      // add an employee (first name last name role and manager)
      } else if (answer.selections ==='Add an employee'){
        inquirer  
          .prompt([
            {
              type: 'input',
              name: 'employee_first',
              message: 'Employee first name',
            },
            {
              type: 'input',
              name: 'employee_last',
              message: 'Employee last name',
            },
            {
              type: 'input',
              name: 'employee_role',
              message: 'What is this employee\'s role ID?',
            },
            {
              type: 'input',
              name: 'employee_manager',
              message: 'What is this employee\'s manager ID?',
            }
          ])
          .then(answer =>{
            db.query("INSERT INTO employees SET ?", 
            {
              first_name: answer.employee_first,
              last_name: answer.employee_last,
              role_id: answer.employee_role,
              manager_id: answer.employee_manager,
            }, 
            (err, res) => {
              if (err) throw err;
              console.table(res);
              prompts();
            })
          })
      // update employee updates the ROLE of existing employee
      }else if (answer.selections ==='Update an employee'){
        inquirer  
          .prompt([
            {
              type: 'input',
              name: 'employee_id',
              message: 'Which employee (ID) would you like to update?',
            },
            {
              type: 'input',
              name: 'role_id',
              message: 'Which role (ID) would you like to assign?',
            },
          ])
          .then(answer =>{
            db.query("UPDATE employees SET role_id = ? WHERE employee_id = ?", [answer.role_id, answer.employee_id], 
            (err, res) => {
              if (err) throw err;
              console.table(res);
              prompts();
            })
          })
        }
    })     
};        
prompts();