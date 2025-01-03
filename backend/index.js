const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: "*",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  headers: 'Content-Type, Authorization',
  exposedHeaders: 'Authorization'
};

const PORT = 443;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/userRoutes')(app);
require('./routes/productRoutes')(app);

app.listen(PORT, () => {
  console.log(`My server is running on http://localhost:${PORT}`);
});
