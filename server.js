const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 8080;

app.use(morgan('tiny'));


// Set up body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// View engine setup
app.set("view engine", "ejs");

// Serve static files (if needed)
// app.use('/CSS', express.static(path.resolve(__dirname, "assets/css")))
// app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
// app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// Require and use your routes
app.use('/', require('./server/routes/router'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
