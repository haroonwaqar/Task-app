require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());

app.use('/api', require('./routes/taskRoutes'));

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
