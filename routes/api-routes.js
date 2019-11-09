// ***************************************************************
// api-routes.js - routes for displaying and saving data to the db
// ****************************************************************

// Dependencies
// =============================================================
const db = require('../models');


// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the todos
  app.get('/api/todos', async (req, res) => {
    const results = await db.Todo.findAll({});
    res.json(results);
  });

  // POST route for saving a new todo.
  // We can create a todo using the data on req.body
  app.post('/api/todos', async (req, res) => {
    const result = await db.Todo.create({
      text: req.body.text,
      complete: req.body.complete,
    });
    res.json({id: result.insertId});
  });

  // DELETE route for deleting todos.
  // We can access the ID of the todo to delete in
  // req.params.id
  app.delete('/api/todos/:id', async (req, res) => {
    const deleted = await db.Todo.destroy({
      where: {
        id: req.params.id,
      },
      function(result) {
        if (result.affectedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        }
        res.status(200).end();
      },
    });
    res.json(deleted);
  });

  // PUT route for updating todos.
  // We can access the updated todo in req.body
  app.put('/api/todos', async (req, res) => {
    const updated = await db.Todo.update({
      text: req.body.text,
      complete: req.body.complete,
    }, {
      where: {
        id: req.body.id,
      },
    });
    res.json(updated);
  });
};
