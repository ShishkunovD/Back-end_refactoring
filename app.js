const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();

const apiRoutes = require("./src/modules/routes/routes");

app.use(cors());

const url = 'mongodb+srv://ShishkunovD:restart987!@cluster0.8tbt5.mongodb.net/Todo-list-JS?retryWrites=true&w=majority';
mongoose.connect(url);

app.use(express.json());
app.use('/', apiRoutes);

app.listen('8000', () => {
  console.log('Example app listening on port 8000!')
});