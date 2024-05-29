import pool from "./index.js"
const getAllUser = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from UserDetail', (err, rows) => {
            connection.release()

            if (!err) {
                res.send(rows)
            } else {
                console.log(err);
            }
        })
    })
}
const getUserByEmail = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from UserDetail WHERE UserEmail = ?', [req.params.email], (err, rows) => {
            connection.release()

            if (!err) {
                res.send(rows)
            } else {
                console.log(err);
            }
        })
    })
}
const getUserByName = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)
        let Name = decodeURIComponent(req.params.UserName)

        connection.query('SELECT * from UserDetail WHERE UserName = ?', [Name], (err, rows) => {
            connection.release()

            if (!err) {
                res.send(rows)
            } else {
                console.log(err);
            }
        })
    })
}
const createUser = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error("Error getting connection from pool: ", err);
            res.status(500).send("Server error");
            return;
        }

        console.log(`connected as id ${connection.threadId}`);
        const params = req.body;

        connection.query('INSERT INTO UserDetail SET ?', params, (err, rows) => {
            connection.release();
            if (err) {
                console.error("Error executing query: ", err);
                res.status(500).send("Server error");
            } else {
                res.status(200).send(params.email);
            }
        });
    });
}
export { getAllUser, getUserByEmail, getUserByName, createUser}