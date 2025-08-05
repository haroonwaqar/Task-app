require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3001'
}));

app.use('/api', require('./routes/taskRoutes'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
