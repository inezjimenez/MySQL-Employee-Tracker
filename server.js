const inquirer = require('inquirer')
// const cTable = require('console.table')
const mysql = require('mysql2')
require('dotenv').config();
// const db = require('./db')
// const connection = require('./db/connection')
 

const connection = mysql.createConnection(
    {
        host: '127.0.0.1',
        // your MySQL username,
        user: process.env.DB_USER,
        // your MySQL password
        password: process.env.DB_PASSWORD,
        database: 'company',
        socketPath: '/tmp/mysql.sock'
    }
)

connection.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('connected to mysql server')
})
//console.log(connection)
// Create an array of questions for user input

const userPrompt = () => {
    return inquirer
    .prompt([
        {   
            type: "list",
            name: "selection",
            message: "Please select one of the following",
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'I want to exit the program'
            ]
        }
    ])

    .then ((answers) => {
        let question =  answers.selection;
        switch(question) {
            case 'View All Departments':
                viewDepts()
                break;
            case 'View All Roles':
                viewRoles()
                break;
            case 'View All Employees':
                viewEmployees()
                    break;
            case 'Add a Department':
                addDept()
                break;
            case 'Add a Role':
                addRole()
                 break;
            case 'Add an Employee':
                addEmployee()
                break;
            case 'Update an Employee Role':
                updateEmployeeRole()
                break;
            case 'I want to exit the program':
                exitConnection()
                break;

            default:
            process.exit();
        }
    })
}


// view all departments

viewDepts = () => {
        const sql = `SELECT id, department_name AS department FROM department`;
        connection.promise().query(sql)
        .then ((rows) => {
            console.table(rows[0])
            userPrompt()
        }) 
        .catch((err) => {
            if (err) {
            throw err
            }          
        })       
}
// view all roles
viewRoles = () => {
        const sql = `SELECT role.id, title, salary, department_name AS department
        FROM role 
        INNER JOIN department ON role.department_id = department.id`;
        connection.promise().query(sql)
        .then((rows)=> {
            console.table(rows[0])
            userPrompt()
        })
        .catch((err) => {
            if (err) {
            throw err
            } 
            
         })  
}
// view all employees 
viewEmployees = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary,
    department.department_name AS department, manager.first_name AS manager 
    FROM employee 
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id` ;
    connection.promise().query(sql)
        .then((rows) => {
            console.table(rows[0])
            userPrompt()
        })
        .catch((err) => {
            if (err) {
            throw err
            } 
            
        })  
}
// add new dept
addDept = () => {
    inquirer.prompt([
            {
                type: "input",
                name: "addDept",
                message: "What is the name of the department?"
            },
        ])
            .then ((answer) => {
            const sql = `INSERT INTO department (department_name) VALUES (?)`;
            connection.promise().query(sql, answer.addDept)
            .then(()=> {
                console.log(`${answer.addDept} department has been added`)
                viewDepts()
            })
            .catch((err) => {
                if (err) {
                throw err
                } 
        })      
    })
}
// add new role 
addRole = () => {
    inquirer.prompt ([ {
            type: "input",
            name: "addRole",
            message: "What is the name of the role?"
        },
        {
            type: "input",
            name: "addRoleSalary",
            message: "What is the salary of the role?"
        },
        {
            type: "input",
            name: "addRoleDept",
            message: "Which department does the role belong to?"
        }
    ])

    .then((answer) => {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
        const newValues = [answer.addRole, answer.addRoleSalary, answer.addRoleDept]
        connection.promise().query(sql, newValues)
        .then(()=> {
            console.log(`${answer.addRole} role has been added`)
            viewRoles()
        })
        .catch((err) => {
            if (err) {
            throw err
            }
    })

})}
// add new employee
addEmployee = () => {
    inquirer.prompt([
        {
                type: "input",
                name: "addEmployeeFN",
                message: "What is the employee's first name?"
        },
        {
                type: "input",
                name: "addEmployeeLN",
                message: "What is the employees's last name?"
        },
        {
                type: "input",
                name: "addEmployeeRole",
                message: "What is the employees's role?"
        },
        {
                type: "input",
                name: "addEmployeeManager",
                message: "Who is the employees manager?"
        }
    ])
    .then((answer) => {
        const sql =  `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        const newValues = [answer.addEmployeeFN, answer.addEmployeeLN, answer.addEmployeeRole, answer.addEmployeeManager]
        connection.promise().query(sql, newValues)
    .then(()=> {
        console.log(`${answer.addEmployeeFN} ${answer.addEmployeeLN} has been added as an employee`)
        viewEmployees()
            })
            .catch((err) => {
                if (err) {
                throw err
                }
            })
    })
};

updateEmployeeRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "updateEmployeeRole",
            message: "Which role do you want to assign the selected employee:"
        },
        {
            type: "input",
            name: "updateEmployee",
            message: "Which employee's role do you want to update:"
        }
    ])
    .then((answer) => {
        const sql =  `UPDATE employee SET role_id = (?) WHERE id = (?)`
        const newValues = [answer.updateEmployeeRole, answer.updateEmployee,]
        connection.promise().query(sql, newValues)
    .then(()=> {
    console.log("Employee's role has been updated")
    viewEmployees()
        })
        .catch((err) => {
            if (err) {
            throw err
            }
        })
    })
}

exitConnection = () => {
    connection.end()
}

userPrompt()