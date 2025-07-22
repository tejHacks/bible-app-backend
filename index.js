const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Error Handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});