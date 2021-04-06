const express = require("express");
const app = express();
const port = 3050;
const pool = require("./db");

app.use(express.json());

app.post("/todos", async (req, res) => {
    try{
        const {description} = req.body;
        // res.send(description);
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    }
    catch(err){
        console.log(err);
    }
})

app.get("/todos", async (req, res) => {
    try{
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows)
    }
    catch(err){
        console.log(err);
    }
})

app.get("/todos/:id", async (req, res) => {
    try{
        const todoId = req.params.id;
        // res.send(todoId);
        const newTodo = await pool.query(`SELECT * FROM todo WHERE todo_id = ${todoId}`);
        res.json(newTodo.rows[0]);
    }
    catch(err){
        console.error(err.message);
    }
})

app.patch("/todos/:id", async (req, res) => {
    try{
        const todoId = req.params.id;
        const { description } = req.body;
        // res.send(desc);
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, todoId]);
        res.send({
            "message" : "Data Updated"
        });
    }
    catch(err){
        console.error(err.message);
    }
})

app.listen(port, () => {
    console.log("App running on ", port);
})