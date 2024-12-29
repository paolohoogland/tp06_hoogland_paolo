const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes'); 

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

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes); 

app.listen(PORT, () => {
  console.log(`My server is running on http://localhost:${PORT}`);
});
