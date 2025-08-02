const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URL= process.env.MONGODB_URI;

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected Successfully!!!!"))
.catch(err => {
    console.error("MongoDB Connection Failed:", err);
    process.exit(1);
});

app.post('/users', async (req, res) => {
  const { name, age } = req.body;
  const user = new User({ name, age });
  await user.save();
  res.json(user);
});

app.get('/users', async (req, res) => {
  const users = await User.find({}, { name: 1, age: 1, _id: 0 });
  res.json(users);
});

app.listen(5000, () => console.log('Server running on port 5000'));
