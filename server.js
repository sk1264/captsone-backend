// Import Dependencies:
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); 
const mongoose = require('mongoose');

// Import Pixsly:
const { DATABASE_URL, PORT } = require('./config');
const pixslysRouter = require('./Routers/pixslysRouter');
const bodyParser = require('body-parser');

// Create App object:
const app = express();

// Set up middleware:
app.use(cors());
app.use(morgan("tiny"));
// app.use(express.json());
app.use(bodyParser.json({ limit: "200mb" })); 
app.use(express.urlencoded({ limit: "200mb", extended: false }));
// app.use(express.urlencoded({ extended: true }));

app.use('/pixslys', pixslysRouter)

// Home route for testing our app:
app.get('/', (req, res) => {
    res.send('Hit Default Route!')
});

// Listener
mongoose.connect(DATABASE_URL).then(() => {
    console.log('Connected to mongoDB')
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  });