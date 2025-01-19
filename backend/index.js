const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: "*",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  headers: 'Content-Type, Authorization',
  exposedHeaders: 'Authorization',
};

const PORT = 443;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


require('./routes/productRoutes') (app);
require('./routes/userRoutes') (app);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});