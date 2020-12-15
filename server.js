const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Default opening route
app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Define the PORT number for the backend server.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on PORT number ${PORT}`);
});

// {
//     "mongoURI" : "mongodb+srv://priyavmehta:priyavmehta@developers.gb45a.mongodb.net/developers?retryWrites=true&w=majority",
//     "jwtSecret": "mysecrettoken",
//     "githubClientId": "66d03133299a923b31bd",
//     "githubClientSecret": "6d6e937ec0d187beb6a617d5a6509b88583cc5c2"
// }
