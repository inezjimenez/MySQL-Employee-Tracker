const inquirer = require('inquirer')
const cTable = require('console.table')
const db = require('/db')
const connection = require('connection.js')

//Create an array of questions for user input
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
                'Update an Employee Role'
            ]
        },
        // add department
        {
            type: "input",
            name: "addDepartment",
            message: "What is the name of the department?"
        },
        // add role
        {
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
            name: "addRoleDepartment",
            message: "Which department does the role belong to?"
        },
        // add employee
        {
            type: "input",
            name: "addEmployeeNameFirstName",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "addEmployeeLastName",
            message: "What is the employees's last name?"
        },
        {
            type: "input",
            name: "addEmployeeRole",
            message: "What is the employees's role?"
        },
        {
            type: "list",
            name: "addEmployeeRole",
            message: "Who is the employees manager?",
            choices: [
                "Carl Silva",
                "Temple Kramer",
                "Caitlin Parsons",
                "Josie Sparling",
                "Inez Jimenez"
            ]
        },
        // Update current employee
        {
            type: "list",
            name: "updateEmployee",
            message: "Which employee's role do you want to update?",
            choices: [
                "Carl Silva",
                "Temple Kramer",
                "Caitlin Parsons",
                "Josie Sparling",
                "Inez Jimenez"
            ]
        },
        {
            type: "list",
            name: "updateEmployeeRole",
            message: "Which role do you want to assign the selected employee?",
            choices: [
               "Admin Assistant",
               "Enginner",
               "HR Rep",
               "Sales Manager",
               "Shipping Manager"
            ]
        }
    ])
    .then ((res) => {
        let order = res.selection;
        switch(order) {
            case 'View All Departments':
                viewDeps()
                break;
            case 'View All Roles':
                viewRoles()
                break;
            case 'View All Employees':
                viewEmployess()
                    break;
            case 'Add a Department':
                addDepartment()
                break;
            case 'Add a Role':
                addRole()
                 break;
            case 'Add an Employee':
                addEmployee()
                break;
            case 'Update an Employee Role':
                updateRole()
                break;

            default:
            process.exit();
        }
    })
}

function viewDeps () {
    db.
}

userPrompt()


const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended:false }));
app.use(express.json());


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
    }, ]).then(function(result) {
        // console.log(ans);
        console.log("you entered: " + result.option);

        switch (result.option) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'View All Roles':
                viewAllRoles();
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
            default:
                console.log("Ending")
                break;          
        }
    });
};

//function needs to be called, in order to start.
menu();
const viewAllEmployees = () => {
    db.query('SELECT id, first_name, last_name FROM employee', function (err, results) {
        console.log(results);
        inquirer.prompt([{
            type: 'list',
            name: 'menuReturn',
            message: 'Select return to go back to the main menu',
            choices: ['return']
        }]).then(function () {
            menu()
        })
    })
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
    ]).then (ans => {
        const employee_firstName = ans.employee_firstName;
        const employee_lastName = ans.employee_lastName;
        const employee_role = ans.employee_role;
        const employee_manager = ans.employee_manager;

        db.employee(employee_firstName, employee_lastName, employee_role, employee_manager)
        .then (() => console.log(`Employee ${employee_firstName} ${employee_lastName} added`))
        .then(() => menu())
    })
};

const updateEmployeeRole = () => {
    db.query('SELECT title, id FROM role', function (err, results) {
        const roles = results.map(function (role) {
            return {
                input: role.title,
                name: role.id
            }
        })
        db.query('SELECT first_name, last_name, id FROM employee', function (err, results2) {
            const employees = results2.map(function (employee) {
                return {
                    name: employee.first_name + " " + employee.last_name,
                    value: employee.id
                }
            })
            inquirer.prompt([{
                type: 'list',
                name: 'updateEmployee',
                message: 'Which Employee would you like to update?',
                choices: employees
            },
            {
                type: 'list',
                name: 'updateEmployeeRole',
                message: 'What is the new Role?',
                choices: roles
            },
            ]).then(res => {
                db.query('UPDATE employee SET rolde_id = ? WHERE employee.id = ?', [res.updateRole, res.updateEmployee], function (err, results2) {
                    menu()
                })
            })
        })
    })
};

function viewAllRoles() {
    //select from the db
    let query = 'SELECT * FROM role';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        startScreen();
    });
};

// Adding a new role
const addRole = () => {
  inquirer.promt([
    {
        type: "input",
        message: "What's the name of the role?",
        name: 'roleName'
    },
    {
        type: 'input',
        message: "What is the salary for this role?",
        name: 'salaryTotal'
    },
    {
        type: 'input',
        message: "what is the department id number?",
        name: 'deptID'
    }
  ])
  .then(function(answer) {
    connection.query
  })

const viewAllDepartments=() => {
    db.departments()
    .then(([departments]) => {
        console.table(departments);
    }).then(() => menu());
};

const addDepartment=() => {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'department_name',
            message: 'What is the name of your department?',
        }
    ]).then(ans => {
        console.log('ANSWER', ans);
        const departmentName = ans.department_name; 

        db.addDepartment(departmentName)
        .then(() => console.log(`Department ${departmentName} added`))
        .then(() => menu())
    })
};

const quit = () => {
    connection.end();
    process.exit();
}}