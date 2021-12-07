const Task = require('../../db/models/task/index');

module.exports.getAllTasks = (req, res) => {
  Task.find().then(result => {
    res.send({ data: result });
  });
}

module.exports.createNewTask = (req, res) => {
  if (req.body.text !== undefined && typeof req.body.isCheck === "boolean") {
    const task = new Task(req.body);
    task.save().then(result => {
      res.send({ data: result });
    });
  } else {
    res.status(404).send("Error, all fields should be filled in correctly.");
  }
}

module.exports.changeTaskInfo = (req, res) => {
  if (req.query.id !== undefined && (req.body.text !== undefined || typeof req.body.isCheck === "boolean") ) {
    const params = req.query.id;
    const body = req.body;
    Task.findByIdAndUpdate(params, body).then(result => {
      Task.find().then(result => res.send({ data: result }));
    });
  } else {
    res.status(404).send("Error, all fields should be filled in correctly.");
  }
}

module.exports.deleteTask = (req, res) => {
  if (req.query.id === undefined) {
    res.status(404).send("Error, please enter the id.");
  } else {
    const identifier = req.query.id;
    Task.deleteOne({ _id: identifier }).then(result => {
      Task.find().then(result => res.send({ data: result }));
    });
  }
}