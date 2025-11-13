require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
const mediaRoutes = require('./src/routes/mediaRoutes');
app.use('/api', mediaRoutes);

app.get('/', (req, res) => {
  res.send('Vellviez Backend API (live) is running.');
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
