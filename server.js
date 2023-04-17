const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
() => {
  console.log('connected to DB');
};

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
});

const User = new mongoose.model('User', userSchema);

//routes routes
app.post('/Login', (req, res) => {
  const { name, password } = req.query;

  User.findOne({ name: name }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: 'login success', user: user });
      } else {
        res.send({ message: 'wrong credentials' });
      }
    } else {
      res.send({ message: 'not register' });
    }
  });
});
app.post('/Register', (req, res) => {
  const { name, password } = req.query;

  User.findOne({ name: name }, (err, user) => {
    if (user) {
      res.send({ message: 'user already exists' });
    } else {
      const user = new User({ name, password });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: 'successful' });
        }
      });
    }
  });
});

app.listen(4000, () => {
  console.log('started');
});
