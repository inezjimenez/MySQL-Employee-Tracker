const express = require('express');
const { default: inquirer } = require('inquirer');
//Import and require mysql2
const mysql = require('mysql2');


const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

//Connecting to database
const db = mysql.createConnection(
    {
        host:'localhost',
        user: 'root',
        password: '',
        database: 'employeeDB'
    },
    console.log('Connected to employeeDB database.')
);
module.exports = db;

menu();

//prompt user for set options, using inquirer for prompts 
function menu() {
    inquirer.prompt([{
        type: 'list',
        name: 'addList',
        message: 'What would you like to do?',
        choices: [
            'View All Employees', 
            'View All Roles',
            'View All Departments', 
            'Add Employee', 
            'Add Role',
            'Add Department', 
            'Update Employee Role', 
            'Quit']
    }, ]).then(ans => {
        console.log(ans);
        switch (ans.addList) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add Employee':
                apdateEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'View All Roles':
                viewAllROles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Quit':
                quit();
                break;

            default:
                break;            
        }
    })
};

//function needs to be called, in order to start.
menu();
const viewAllEmployees = () => {
    db.employee()
    .then(([employee]) => {
        console.log.table(employee)
    }).then(() => menu());
};

const addEmployee = () => {
    inquirer.prompt ([ 
        {
            type: 'input',
            name: 'employee_firstName',
            message: 'What is the first name of the employee?',
        },
        {
            type: 'input',
            name: 'employee_lastName',
            message: 'What is the last name of this employee?',
        },
        {
            type: 'input',
            name: 'employee_role',
            message: 'What role does this employee have in the company?',
        },
        {
            type: 'input',
            name: 'employee_manager',
            message: 'Who is the manager of the employee?',
        },
    ])
};

const updateEmployeeRole = () => {
    db.query('SELECT title, id FROM role')
}


