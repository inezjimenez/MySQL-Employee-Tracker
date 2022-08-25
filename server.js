const express = require('express')
const mysql = require('mysql');

const PORT = process.env.PORT || 3001;
const app = express();

const db = mysql.createConnection(
    {
        host:'localhost',
        user: 'root',
        password: '',
        database: 'employeeDB'
    },
    console.log('Connected to employeeDB database.')
);

