const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'project08',
});

app.post('/create', (req, res) => {
    const department = req.body.department;
    const role = req.body.role;
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    const experience = req.body.experience;
    const salary = req.body.salary;

    db.query('INSERT INTO employees (department, role, lastName, firstName, experience, salary) VALUES (?,?,?,?,?,?)',
    [department, role, lastName, firstName, experience, salary], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send('values inserted')
        }
    });
});

app.get('/profiles', (req, res) => {
    db.query('SELECT * FROM employees', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    });
});

app.put('/edit', (req, res) => {
    const id = req.body.id;
    const role = req.body.role;
    const salary = req.body.salary;

    db.query('UPDATE employees SET role = ?, salary = ? WHERE id = ?', [role, salary, id],
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    });
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    db.query('DELETE FROM employees WHERE id = ?', id,
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    });
});

app.listen(3003, () => {
    console.log('port works')
});