const express = require('express');
const userRoutes = require('./routes/userRoutes')
const connectDB = require('./config/db')
const app = express();
const PORT = 5000 || process.env.PORT
const dotenv = require('dotenv')
const cors = require('cors');

app.use(express.json());
app.use(cors());
dotenv.config();
connectDB()
app.use('/user',userRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});