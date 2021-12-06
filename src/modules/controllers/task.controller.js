const Task = require('../../db/models/task/index');

module.exports.getAllTasks = (req, res) => {
  Task.find().then(result => {
    res.send({ data: result });
  });
}

module.exports.createNewTask = (req, res) => {
  if( req.body.text !== undefined && typeof req.body.isCheck === "boolean" ) {
    const task = new Task(req.body);
    task.save().then(result => {
      res.send({ data: result });
    })
  } else {
    res.status(404).send("Error, all fields should be filled in correctly.");
  }
}

module.exports.changeTaskInfo = (req, res) => {
  const params = req.query.id;
  const body = req.body;
  if( params !== undefined && (body.text !== undefined && typeof body.isCheck === "boolean")) {
    Task.findByIdAndUpdate(params, { text: body.text, isCheck: body.isCheck })
    .then(result => {
      Task.find().then(result => res.send({ data: result }))
    })
  } else {
    res.status(404).send("Error, all fields should be filled in correctly.");
  }
}

module.exports.deleteTask = (req, res) => {
  const identifier = req.query.id;
  if( identifier === undefined ) {
    res.status(404).send("Error, please enter the id.");
  } else {
    Task.deleteOne({ _id : identifier })
    .then(result => {
      Task.find().then(result => res.send({ data: result }));
    })
  }
}