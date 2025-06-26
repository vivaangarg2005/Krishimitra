const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const courseRoutes = require("./routes/courseRoutes");
const cors = require('cors');
const equipmentRoutes = require('./routes/equipmentRoutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
app.use('/api/auth', authRoutes);
app.use("/api/courses", courseRoutes);
app.use('/api/equipment', equipmentRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});